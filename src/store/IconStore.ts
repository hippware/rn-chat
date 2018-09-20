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
const defaultList = [undefined, silverware, drinks, trees, plane, store, heart, defaultEmoji]

export default class IconStore {
  readonly iconList = observable.array<string>(defaultList)
  @observable index: number = 0
  @observable isEmojiKeyboardShown: boolean = false

  @computed
  get icon() {
    return this.iconList[this.index]
  }
  @computed
  get isEmoji() {
    return this.index === this.iconList.length - 1
  }

  @action
  setIndex = (index: number) => {
    this.index = index
    this.isEmojiKeyboardShown = this.isEmoji
  }

  @action
  setIcon = (icon: string) => {
    if (!icon) {
      this.setIndex(0)
    } else {
      if (
        this.iconList.indexOf(icon) >= 0 &&
        this.iconList.indexOf(icon) < this.iconList.length - 1
      ) {
        this.setIndex(this.iconList.indexOf(icon))
        return
      }
      // means that we have emoji
      this.setIndex(this.iconList.length - 1)
      this.changeEmoji(icon)
    }
  }

  @action
  changeEmoji = (icon: string) => {
    this.iconList[this.iconList.length - 1] = icon
    this.isEmojiKeyboardShown = false
  }

  @action
  reset = () => {
    this.iconList.replace(defaultList)
    this.index = 0
    this.isEmojiKeyboardShown = false
  }
}
