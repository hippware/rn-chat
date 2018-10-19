import {observable, reaction} from 'mobx'

export class ValidateItem {
  @observable errorMessage: string = ''
  @observable value: string
  @observable isValid: boolean | undefined = undefined
  key: string

  constructor(key: string, value: string, validator: any) {
    this.key = key
    this.value = value
    reaction(
      () => this.value,
      val =>
        validator({[this.key]: val})
          .then(r => {
            this.isValid = true
            this.errorMessage = ''
          })
          .catch(e => {
            this.isValid = false
            this.errorMessage = e[key][0]
          })
    )
  }
}
