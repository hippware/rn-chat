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
    global: '',
    globalResult: types.optional(SelectableProfileList, {}),
    localResult: types.optional(SelectableProfileList, {}),
  })
  .postProcessSnapshot((snapshot: any) => {
    const res: any = {...snapshot}
    delete res.global
    delete res.globalResult
    delete res.localResult
    return res
  })
  .actions(self => ({
    clear: () => {
      self.globalResult.clear()
      self.localResult.clear()
      self.global = ''
    },
  }))
  .actions(self => {
    const wocky: IWocky = (getParent(self) as any).wocky
    const _searchGlobal = flow(function*(text) {
      if (!text.length) {
        self.globalResult.clear()
      } else {
        try {
          const profileArr = yield wocky.searchUsers(text)
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
        global: '',
        globalResult: '',
      })
    }

    return {afterAttach, beforeDestroy}
  })

export default SearchStore
export type ISearchStore = typeof SearchStore.Type
