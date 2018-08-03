import {observable, computed, action} from 'mobx'

const icons = {
  drinks: 'a',
  trees: 'b',
  heart: 'c',
  silverware: 'd',
  store: 'e',
  plane: 'g',
}
const {silverware, drinks, trees, plane, store, heart} = icons

const defaultEmoji = '\ud83d\ude1c'

export default class IconStore {
  @observable
  iconList: string[] = [undefined, silverware, drinks, trees, plane, store, heart, defaultEmoji]
  @observable index: number = 0
  @computed
  get icon() {
    return this.iconList[this.index]
  }
  @computed
  get isEmoji() {
    return this.index == this.iconList.length - 1
  }

  @action
  setIndex = (index: number) => {
    this.index = index
  }

  @action
  changeEmoji = (icon: string) => {
    this.iconList[this.iconList.length - 1] = icon
  }
}
