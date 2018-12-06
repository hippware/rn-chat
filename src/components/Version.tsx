import React from 'react'
import {RText} from './common'
import {DARK_GREY} from '../constants/colors'
const {version} = require('../../package.json')

const Version = () => (
  <RText size={15} color={DARK_GREY} style={{marginBottom: 15}}>
    {`Version ${version}`}
  </RText>
)

export default Version
