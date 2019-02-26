declare module 'react-native-linear-gradient'
declare module 'react-native-cube-transition'
declare module 'react-native-permissions'
declare module 'react-native-router-flux'
declare module 'react-native-background-geolocation'
declare const process

// tslint:disable:interface-name

// use module augmentation to fix reactotron types: https://www.typescriptlang.org/docs/handbook/declaration-merging.html
declare module 'reactotron-react-native' {
  interface Reactotron {
    trackMstNode: (
      node: IStateTreeNode,
      nodeName?: string
    ) =>
      | {
          kind: string
          message?: undefined
        }
      | {
          kind: string
          message: any
        }
  }
}
