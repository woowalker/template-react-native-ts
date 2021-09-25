import * as React from 'react'
import { StackActions } from '@react-navigation/native'

export const navigationRef: any = React.createRef()

export function navigate (name: string, params?: any) {
  navigationRef.current?.navigate(name, params)
}

export function replace (name: string, params?: any) {
  navigationRef.current?.dispatch(
    StackActions.replace(name, params)
  )
}

export function reset (index: number, routes: [any]) {
  navigationRef.current?.reset({ index, routes })
}

export function getCurrRoute () {
  return navigationRef.current?.getCurrentRoute()
}