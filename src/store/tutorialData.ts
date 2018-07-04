import {types} from 'mobx-state-tree'

export const TutorialCardData = types.model('TutorialCardData', {
  title: types.string,
  text: types.string,
  icon: types.string,
})

export default [
  TutorialCardData.create({
    title: 'Map Your Favorite Spots',
    text: 'Show friends the places you love!',
    // icon: require('../../images/create.png'),
    icon: 'create',
  }),
]
