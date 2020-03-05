import AsyncStorage from '@react-native-community/async-storage'
import {useEffect} from 'react'
import {observable} from 'mobx'

const key = 'TinyRobotOnboarded'

export const onboarded = observable.box<boolean | null>(null)

export const useDeviceOnboarded = () => {
  useEffect(() => {
    checkOnboarded()
  }, [])

  const checkOnboarded = async () => {
    if (onboarded.get() === null) {
      const res = await AsyncStorage.getItem(key)
      onboarded.set(res === 'true')
    }
  }

  const setOnboarded = async (val: boolean) => {
    AsyncStorage.setItem(key, val.toString())
    onboarded.set(val)
  }

  return {onboarded, setOnboarded}
}
