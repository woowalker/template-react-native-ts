import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import TabBar from 'app/layout/TabBar'
import Header from 'app/layout/Header'
import LoginPage from 'app/pages/login'
import HomePage from 'app/pages/home'
import StationMonitorPage from 'app/pages/station-monitor'
import HistoryDataPage from 'app/pages/history-data'
import StationAlarmPage from 'app/pages/station-alarm'
import ComplainPage from 'app/pages/complain'
import ActionLogPage from 'app/pages/action-log'
import { $consts } from './plugins'

const MainStack = createStackNavigator()
const TabStack = createBottomTabNavigator()

const TabRouter = () => {
  return (
    <TabStack.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <TabBar {...props} />} // 自定义 TabBar
      backBehavior='history' // 在 tab 页按返回键返回时，返回到上一个浏览过的 tab 页
    >
      <TabStack.Screen options={{ tabBarLabel: '首页' }} name={$consts['ROUTE/HOME']} component={HomePage} />
      <TabStack.Screen options={{ tabBarLabel: '站点监测' }} name={$consts['ROUTE/STATION_MONITOR']} component={StationMonitorPage} />
      <TabStack.Screen options={{ tabBarLabel: '历史数据' }} name={$consts['ROUTE/HISTORY_DATA']} component={HistoryDataPage} />
      <TabStack.Screen options={{ tabBarLabel: '站点报警' }} name={$consts['ROUTE/STATION_ALARM']} component={StationAlarmPage} />
      <TabStack.Screen options={{ tabBarLabel: '投诉管理' }} name={$consts['ROUTE/COMPLAIN']} component={ComplainPage} />
    </TabStack.Navigator>
  )
}

const Router = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        // 自定义导航栏重要事项一：设置 headerMode 为 screen
        headerMode: 'screen',
        // 自定义导航栏重要事项二：设置 headerStyle
        headerStyle: { height: 44 },
        header: props => <Header {...props} />
      }}
    >
      <MainStack.Screen
        name={$consts['ROUTE/MAIN']}
        // tabbar 不需要显示 header，Screen 的 options 选项就是 Navigator 的 screenOptions 选项
        options={{ headerShown: false }}
        component={TabRouter}
      />
      <MainStack.Screen
        name={$consts['ROUTE/ACTION_LOG']}
        options={{ title: '活动日志' }}
        component={ActionLogPage}
      />
      <MainStack.Screen
        name={$consts['ROUTE/LOGIN']}
        // 登录页不需要显示 header，Screen 的 options 选项就是 Navigator 的 screenOptions 选项
        options={{ headerShown: false }}
        component={LoginPage}
      />
    </MainStack.Navigator>
  )
}

export default Router
