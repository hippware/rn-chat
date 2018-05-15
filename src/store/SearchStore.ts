import {types, getEnv, flow, getParent, applySnapshot} from 'mobx-state-tree'
import {reaction, when, autorun} from 'mobx'
import validate from 'validate.js'
import SelectableProfileList from './SelectableProfileList'

// HACK
declare module 'validate.js' {
  // tslint:disable-next-line
  interface ValidateJS {
    Promise: any
  }
}

const SearchStore = types
  .model('SearchStore', {
    // we need deep observability for observers in afterAttach so we can't use volatile for these
    // https://github.com/mobxjs/mobx-state-tree#modelvolatile
    local: '',
    localResult: types.optional(SelectableProfileList, {}),
    global: '',
    globalResult: types.optional(SelectableProfileList, {})
  })
  .views(() => ({
    postProcessSnapshot: (snapshot: any) => {
      const res: any = {...snapshot}
      delete res.global
      delete res.globalResult
      delete res.local
      delete res.localResult
      return res
    }
  }))
  .actions(self => ({
    clear: () => {
      self.localResult.clear()
      self.globalResult.clear()
      self.local = ''
      self.global = ''
    }
  }))
  .actions(self => {
    const _searchGlobal = flow(function*(text) {
      const {wocky} = getParent(self)
      if (!text.length) {
        self.globalResult.clear()
      } else {
        try {
          const data = yield _search(text)
          const profileArr = data.hits.map(hit => wocky.createProfile(hit.objectID, hit))
          self.globalResult.replace(profileArr)
        } catch (err) {
          // console.log('data hit err', err);
        }
      }
    })

    function _search(text) {
      const {searchIndex} = getEnv(self)

      return new Promise((resolve, reject) => {
        searchIndex.search(text, (err, content) => {
          if (err) {
            reject(err)
          } else {
            resolve(content)
          }
        })
      })
    }

    function setGlobal(text: string) {
      self.global = text
    }

    return {
      setGlobal,
      _searchGlobal,
      _search
    }
  })
  .actions(self => ({
    queryUsername: flow(function*(text: string) {
      const res = yield self._search(text)
      return res && res.hits.length > 0 && res.hits[0].handle.toLowerCase() === text.toLowerCase()
    })
  }))
  .actions(self => ({
    addUsernameValidator: () => {
      validate.validators.usernameUniqueValidator = value => {
        if (!value) return new validate.Promise(res => res())
        return new validate.Promise(resolve => {
          self.queryUsername(value).then(res => {
            res ? resolve('not available') : resolve()
          })
        })
      }
    }
  }))
  .actions(self => {
    let wocky, handler1, handler2
    function afterAttach() {
      ;({wocky} = getParent(self))
      self.addUsernameValidator()
      handler1 = reaction(() => self.global, text => self._searchGlobal(text), {
        fireImmediately: false,
        delay: 500
      })

      // set initial list to all friends
      when(() => wocky.friends.length > 0, () => self.localResult.replace(wocky.friends))

      handler2 = autorun('SearchStore', () => {
        const {local} = self
        if (wocky.connected) {
          self.localResult.replace(
            wocky.friends.filter(el => {
              return (
                !el.isOwn &&
                (!local ||
                  (el.firstName &&
                    el.firstName.toLocaleLowerCase().startsWith(local.toLocaleLowerCase())) ||
                  (el.lastName &&
                    el.lastName.toLocaleLowerCase().startsWith(local.toLocaleLowerCase())) ||
                  (el.handle &&
                    el.handle.toLocaleLowerCase().startsWith(local.toLocaleLowerCase())))
              )
            })
          )
        } else {
          self.clear()
        }
      })
    }

    // TODO: cleanup on disconnect
    function beforeDestroy() {
      handler1()
      handler2()
      applySnapshot(self, {
        local: '',
        localResult: {},
        global: '',
        globalResult: ''
      })
    }

    return {afterAttach, beforeDestroy}
  })

export default SearchStore
