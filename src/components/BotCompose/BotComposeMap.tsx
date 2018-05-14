import React from 'react'
import {View} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {width} from '../Global'
import {showImagePicker} from '../ImagePicker'
import Map from '../map/Map'
import {isAlive} from 'mobx-state-tree'
import {Actions} from 'react-native-router-flux'
import BotMarker from '../map/BotMarker'
import {IBot} from 'wocky-client'

type Props = {
  afterPhotoPost: () => void
  bot?: IBot
  notificationStore?: any // TODO proper type
}

@inject('bot', 'notificationStore')
@observer
class BotComposeMap extends React.Component<Props> {
  onCoverPhoto = (): void => {
    showImagePicker(null, async (source, response) => {
      await this.props.bot!.upload({file: source, ...response})
      if (this.props.bot!.image.uploadError) {
        this.props.notificationStore.flash(`Upload error: ${this.props.bot!.image.uploadError}`)
      } else {
        this.props.afterPhotoPost()
      }
    })
  }

  render() {
    const {bot} = this.props
    if (!bot || !isAlive(bot)) return null
    const image =
      bot.image && bot.image.loaded
        ? bot.image.thumbnail
        : require('../../../images/addBotPhoto.png')
    const showLoader = bot.image && (!bot.image.loaded || bot.image.uploading)
    return (
      <View style={{height: width, backgroundColor: 'white', overflow: 'hidden'}}>
        <Map
          geofence={bot.geofence}
          location={{...bot.location}}
          showOnlyBot
          showUser={false}
          fullMap={false}
          scrollEnabled={false}
          rotateEnabled={false}
          pitchEnabled={false}
          zoomEnabled={false}
          onMapPress={() => Actions.botAddress({botId: bot.id})}
          scale={0.5}
          marker={
            <BotMarker
              key={`coverimage${bot.image && bot.image.loaded}${bot.address}`}
              onImagePress={this.onCoverPhoto}
              image={image}
              showLoader={showLoader}
              scale={0.5}
              bot={bot}
            />
          }
        />
      </View>
    )
  }
}

export default BotComposeMap
