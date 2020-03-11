import React, {useState, useEffect} from 'react'
import moment from 'moment'
import RText, {IRTextProps} from './RText'

interface IProps extends IRTextProps {
  time: Date
  hideAgo?: boolean
}

const TimeAgo = ({time, hideAgo, ...rest}: IProps) => {
  const [text, setText] = useState<string>(moment(time).fromNow(hideAgo))
  const [timer, setTimer] = useState<number | null>(null)

  useEffect(() => {
    createTimer()
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [])

  const createTimer = () => {
    const num: any = setTimeout(update, 7000 + Math.random() * 7000)
    setTimer(num)
  }

  const update = () => {
    const newText = moment(time).fromNow(hideAgo)
    // update state only if text is changed (to avoid frequent re-render)
    if (newText !== text) {
      setText(newText)
    }
    createTimer()
  }

  return <RText {...rest}>{text}</RText>
}

export default TimeAgo
