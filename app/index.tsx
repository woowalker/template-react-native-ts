import 'react-native-gesture-handler'

import React from 'react'
import { StatusBar, useColorScheme } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
// 通用 store 数据
import 'app/stores/common'
// 全局导航
import { navigationRef } from './utils/rootNavigator'
// 路由组件
import Router from './router'
// 全局组件
import { Loading, Toast, Modal } from './components'
// 拓展工具
import './utils/predayjs'

const App = () => {
  const isDarkMode = useColorScheme() === 'dark'

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer ref={navigationRef}><Router /></NavigationContainer>
      <Modal />
      <Loading />
      <Toast />
    </SafeAreaProvider>
  )
}

export default App
