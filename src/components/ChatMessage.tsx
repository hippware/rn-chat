import React from 'react'
import {View, Text, StyleSheet, TouchableHighlight, Image} from 'react-native'
import {observer} from 'mobx-react/native'
import Bubble from './ChatBubble'
import ErrorButton from './ChatErrorButton'

type Props = {
  rowData: any
  diffMessage: any
  position: any
  displayNamesInsideBubble?: any
  onErrorButtonPress?: any
  displayNames?: any
  forceRenderImage?: any
  onImagePress?: any
  onMessageLongPress?: any
  renderCustomText?: any
  parseText?: any
  handlePhonePress?: any
  handleUrlPress?: any
  handleEmailPress?: any
}

function renderName(name, displayNames, diffMessage, displayNamesInsideBubble) {
  if (displayNames === true) {
    if (diffMessage === null || name !== diffMessage.name) {
      return (
        <Text style={[styles.name, displayNamesInsideBubble ? styles.nameInsideBubble : null]}>
          {name}
        </Text>
      )
    }
  }
  return null
}

function renderImage(rowData, diffMessage, forceRenderImage, onImagePress) {
  const ImageView = rowData.imageView || Image
  if (rowData.image) {
    if (forceRenderImage) {
      diffMessage = null // force rendering
    }

    if (
      diffMessage === null ||
      (diffMessage !== null &&
        (rowData.name !== diffMessage.name || rowData.uniqueId !== diffMessage.uniqueId))
    ) {
      if (typeof onImagePress === 'function') {
        return (
          <TouchableHighlight underlayColor="transparent" onPress={() => onImagePress(rowData)}>
            <ImageView
              {...rowData}
              source={rowData.image}
              style={[
                styles.imagePosition,
                styles.image,
                rowData.position === 'left' ? styles.imageLeft : styles.imageRight,
              ]}
            />
          </TouchableHighlight>
        )
      }
      return (
        <ImageView
          {...rowData}
          source={rowData.image}
          style={[
            styles.imagePosition,
            styles.image,
            rowData.position === 'left' ? styles.imageLeft : styles.imageRight,
          ]}
        />
      )
    }
    return <View style={styles.imagePosition} />
  }
  return <View style={styles.spacer} />
}

function renderErrorButton(rowData, onErrorButtonPress) {
  if (rowData.status === 'ErrorButton') {
    return <ErrorButton onErrorButtonPress={onErrorButtonPress} rowData={rowData} styles={styles} />
  }
  return null
}

function renderStatus(status) {
  if (status !== 'ErrorButton' && typeof status === 'string') {
    if (status.length > 0) {
      return (
        <View>
          <Text style={styles.status}>{status}</Text>
        </View>
      )
    }
  }
  return null
}

const ChatMessage = ({
  rowData,
  onErrorButtonPress,
  position,
  displayNames,
  diffMessage,
  forceRenderImage,
  onImagePress,
  onMessageLongPress,
  displayNamesInsideBubble,
  renderCustomText,
  parseText,
  handlePhonePress,
  handleUrlPress,
  handleEmailPress,
}: Props) => {
  const flexStyle: any = {}
  let RowView = Bubble
  if (rowData.text) {
    if (rowData.text.length > 40) {
      flexStyle.flex = 1
    }
  }

  if (rowData.view) {
    RowView = rowData.view
  }
  const messageView = (
    <View>
      {position === 'left' && !displayNamesInsideBubble
        ? renderName(rowData.name, displayNames, diffMessage, displayNamesInsideBubble)
        : null}
      <View
        style={[
          styles.rowContainer,
          {
            justifyContent:
              position === 'left' ? 'flex-start' : position === 'right' ? 'flex-end' : 'center',
          },
        ]}
      >
        {position === 'left'
          ? renderImage(rowData, diffMessage, forceRenderImage, onImagePress)
          : null}
        {position === 'right' ? renderErrorButton(rowData, onErrorButtonPress) : null}
        <RowView
          {...rowData}
          renderCustomText={renderCustomText}
          styles={styles}
          name={
            position === 'left' && displayNamesInsideBubble
              ? renderName(rowData.name, displayNames, diffMessage, displayNamesInsideBubble)
              : null
          }
          parseText={parseText}
          handlePhonePress={handlePhonePress}
          handleUrlPress={handleUrlPress}
          handleEmailPress={handleEmailPress}
        />
        {rowData.position === 'right'
          ? renderImage(rowData, diffMessage, forceRenderImage, onImagePress)
          : null}
      </View>
      {rowData.position === 'right' ? renderStatus(rowData.status) : null}
    </View>
  )

  if (typeof onMessageLongPress === 'function') {
    return (
      <TouchableHighlight
        underlayColor="transparent"
        onLongPress={() => onMessageLongPress(rowData)}
      >
        {messageView}
      </TouchableHighlight>
    )
  }
  return messageView
}
export default observer(ChatMessage)

const styles = StyleSheet.create({
  errorButtonContainer: {
    marginLeft: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#e6e6eb',
    borderRadius: 15,
    width: 30,
    height: 30,
  },
  errorButton: {
    fontSize: 22,
    textAlign: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  name: {
    color: '#aaaaaa',
    fontSize: 12,
    marginLeft: 55,
    marginBottom: 5,
  },
  nameInsideBubble: {
    color: '#666666',
    marginLeft: 0,
  },
  imagePosition: {
    height: 30,
    width: 30,
    alignSelf: 'flex-end',
    marginLeft: 8,
    marginRight: 8,
  },
  image: {
    alignSelf: 'center',
    borderRadius: 15,
  },
  imageLeft: {},
  imageRight: {},
  spacer: {
    width: 10,
  },
  status: {
    color: '#aaaaaa',
    fontSize: 12,
    textAlign: 'right',
    marginRight: 15,
    marginBottom: 10,
    marginTop: -5,
  },
})
