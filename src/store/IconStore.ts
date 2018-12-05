import {observable, action} from 'mobx'

// HACK: this is necessary so we don't have to coordinate the switch from old icons to emoji-only with the backend
export const oldIcons = ['a', 'b', 'c', 'd', 'e', 'g']

export default class IconStore {
  @observable isEmojiKeyboardShown: boolean = false
  @observable emoji?: string

  @action
  toggleEmojiKeyboard = () => {
    this.isEmojiKeyboardShown = !this.isEmojiKeyboardShown
  }

  @action
  setEmoji = (emoji: string) => {
    this.emoji = emoji
  }

  @action
  reset = () => {
    this.isEmojiKeyboardShown = false
    this.emoji = undefined
  }
}
