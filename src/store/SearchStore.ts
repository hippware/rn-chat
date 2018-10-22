import {types, flow, getParent, applySnapshot} from 'mobx-state-tree'
import {reaction} from 'mobx'
import validate from 'validate.js'
import SelectableProfileList from './SelectableProfileList'
import {IWocky} from 'wocky-client'

declare module 'validate.js' {
  // tslint:disable-next-line
  interface ValidateJS {
    Promise: any
  }
}

const SearchStore = types
  .model('SearchStore', {
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
    const {wocky} = getParent(self)
    const _searchGlobal = flow(function*(text) {
      if (!text.length) {
        self.globalResult.clear()
      } else {
        try {
          const profileArr = yield (wocky as IWocky).searchUsers(text)
          self.globalResult.replace(profileArr)
        } catch (err) {
          // console.log('global search error', err);
        }
      }
    })

    function setGlobal(text: string) {
      self.global = text
    }

    async function queryUsername(text: string) {
      const profileArr = await (wocky as IWocky).searchUsers(text)
      return (
        profileArr.length > 0 &&
        profileArr.findIndex(
          p => p.handle !== null && p.handle.toLowerCase() === text.toLowerCase()
        ) >= 0
      )
    }

    function addUsernameValidator() {
      validate.validators.usernameUniqueValidator = value => {
        if (!value) return new validate.Promise(res => res())
        return new validate.Promise(resolve => {
          queryUsername(value).then(res => {
            res ? resolve('not available') : resolve()
          })
        })
      }
    }

    return {
      setGlobal,
      setLocal: text => (self.local = text),
      _searchGlobal,
      queryUsername,
      addUsernameValidator,
    }
  })
  .actions(self => {
    let handler1
    function afterAttach() {
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
