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
      for (let i = 1; i < this.iconList.length - 1; i += 1) {
        if (icon === this.iconList[i]) {
          this.setIndex(i)
          return
        }
      }
      // means that we have emoji
      this.changeEmoji(icon)
    }
  }

  @action
  changeEmoji = (icon: string) => {
    this.iconList[this.iconList.length - 1] = icon
    this.isEmojiKeyboardShown = false
  }
}
