import {types, getEnv, flow, getParent, applySnapshot} from 'mobx-state-tree'
import {reaction} from 'mobx'
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
    global: '',
    globalResult: types.optional(SelectableProfileList, {}),
  })
  .views(self => ({
    postProcessSnapshot: (snapshot: any) => {
      const res: any = {...snapshot}
      delete res.global
      delete res.globalResult
      delete res.local
      delete res.localResult
      return res
    },
    get localResult() {
      const {wocky} = getParent(self)
      const localLower = self.local.toLocaleLowerCase()
      return wocky.friends.filter(el => {
        return (
          !el.isOwn &&
          (!self.local ||
            (el.firstName && el.firstName.toLocaleLowerCase().startsWith(localLower)) ||
            (el.lastName && el.lastName.toLocaleLowerCase().startsWith(localLower)) ||
            (el.handle && el.handle.toLocaleLowerCase().startsWith(localLower)))
        )
      })
    },
  }))
  .actions(self => ({
    clear: () => {
      self.globalResult.clear()
      self.local = ''
      self.global = ''
    },
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
      setLocal: text => (self.local = text),
      _searchGlobal,
      _search,
    }
  })
  .actions(self => ({
    queryUsername: flow(function*(text: string) {
      const res = yield self._search(text)
      return res && res.hits.length > 0 && res.hits[0].handle.toLowerCase() === text.toLowerCase()
    }),
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
    },
  }))
  .actions(self => {
    let wocky, handler1
    function afterAttach() {
      ;({wocky} = getParent(self))
      self.addUsernameValidator()
      handler1 = reaction(() => self.global, text => self._searchGlobal(text), {
        fireImmediately: false,
        delay: 500,
      })
    }

    // TODO: cleanup on disconnect
    function beforeDestroy() {
      handler1()
      applySnapshot(self, {
        local: '',
        localResult: {},
        global: '',
        globalResult: '',
      })
    }

    return {afterAttach, beforeDestroy}
  })

export default SearchStore
export type ISearchStore = typeof SearchStore.Type
