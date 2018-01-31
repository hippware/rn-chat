// tslint:disable-next-line:no_unused-variable
import {types, IModelType} from 'mobx-state-tree'

export const Address = types.model('Address', {
  city: '',
  country: '',
  county: '',
  address: ''
})
