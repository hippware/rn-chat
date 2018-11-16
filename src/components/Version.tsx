import React from 'react'
import {observer, inject} from 'mobx-react/native'
import {settings} from '../globals'
import {RText} from './common'
import {colors} from '../constants'
const {version} = require('../../package.json')

const Version = inject('codePushStore')(
  observer(({codePushStore}) => {
    let versionString = settings.version // version from XCode
    const packageJsonVersion = version // version from package.json

    if (codePushStore!.metadata) {
      const {deploymentKey, label} = codePushStore!.metadata

      // Prod: rXt3kcwtaG9O8dzljOTZIDYvM8VUSJz03CBgQ
      if (deploymentKey !== 'rXt3kcwtaG9O8dzljOTZIDYvM8VUSJz03CBgQ') {
        const deploymentInfo = codePushStore.channels.filter(
          deployment => deployment.key === deploymentKey
        )
        const deploymentName = deploymentInfo.length > 0 ? deploymentInfo[0].name : deploymentKey

        versionString = `${versionString}-${deploymentName}`
      }
      versionString = `${versionString}-${label} (${packageJsonVersion})`
    }

    return (
      <RText size={15} color={colors.DARK_GREY} style={{marginBottom: 15}}>
        {`Version ${versionString}`}
      </RText>
    )
  })
)

export default Version
