// tslint:disable-next-line:no_unused-variable
import {types, IModelType} from 'mobx-state-tree'

export const Location = types.model('Location', {
  latitude: types.number,
  longitude: types.number
})
