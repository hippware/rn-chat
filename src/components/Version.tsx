import React from 'react'
import {observer, inject} from 'mobx-react/native'
import {settings} from '../globals'
import {RText} from './common'
import {colors} from '../constants'
import DeviceInfo from 'react-native-device-info'
import {generateWockyToken} from 'wocky-client'

const {version} = require('../../package.json')

function getVersion(codePushStore: any) {
  let versionString = version // version of 'JS' part, from package.json
  const codePushInfo = ''
  if (codePushStore!.metadata) {
    const {deploymentKey, label} = codePushStore!.metadata
    let codepushInfo = settings.version // version of 'native' part, from XCode

    // Prod: rXt3kcwtaG9O8dzljOTZIDYvM8VUSJz03CBgQ
    if (deploymentKey !== 'rXt3kcwtaG9O8dzljOTZIDYvM8VUSJz03CBgQ') {
      const deploymentInfo = codePushStore.channels.filter(
        deployment => deployment.key === deploymentKey
      )
      const deploymentName = deploymentInfo.length > 0 ? deploymentInfo[0].name : deploymentKey

      codepushInfo = `${codepushInfo}-${deploymentName}`
    }
    versionString = `${versionString} (${DeviceInfo.getSystemName()} ${DeviceInfo.getSystemVersion()}; ${DeviceInfo.getDeviceName()}`
    if (codePushInfo) {
      versionString += `;${codepushInfo}-${label})`
    }
  }
}
export function getJWT(accessToken?: string, phoneNumber?: string) {
  generateWockyToken({
    accessToken,
    phoneNumber,
    deviceId: DeviceInfo.getDeviceId(),
    version: getVersion,
  })
}
const Version = inject('codePushStore')(
  observer(({codePushStore}) => {
    const versionString = getVersion(codePushStore)
    return (
      <RText size={15} color={colors.DARK_GREY} style={{marginBottom: 15}}>
        {`Version ${versionString}`}
      </RText>
    )
  })
)

export default Version
