declare module 'react-native-linear-gradient'
declare module 'react-native-cube-transition'
declare module 'react-native-permissions'
declare module 'react-native-background-geolocation'
declare const process

// prevent ts errors in storybook
declare var module: any

// prevent ts errors in testuser.ts
declare var __dirname: any

// prevent ts errors in testuser.ts
declare var global: any

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
