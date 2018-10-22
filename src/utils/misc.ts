import {format} from 'libphonenumber-js'

export function phoneFormat(phone: string): string {
  // @ts-ignore: TODO find proper API?
  return format({phone, country: null}, 'International')
}
