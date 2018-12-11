import React from 'react'
import {observer, inject} from 'mobx-react/native'
import {settings} from '../globals'
import {RText} from './common'
import {colors} from '../constants'
const {version} = require('../../package.json')

const Version = inject('codePushStore')(
  observer(({codePushStore}) => {
    let versionString = version // version of 'JS' part, from package.json

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
      versionString = `${versionString} (${codepushInfo}-${label})`
    }

    return (
      <RText size={16} color={colors.DARK_GREY} style={{marginBottom: 15}}>
        {`Version ${versionString}`}
      </RText>
    )
  })
)

export default Version
