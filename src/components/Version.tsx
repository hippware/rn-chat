import React from 'react'
import {observer, inject} from 'mobx-react'
import {RText} from './common'
import {colors} from '../constants'

const Version = inject('appInfo')(
  observer(({appInfo}) => {
    return (
      <RText size={16} color={colors.DARK_GREY} style={{marginBottom: 15}}>
        {`Version ${appInfo.longVersion}`}
      </RText>
    )
  })
)

export default Version
