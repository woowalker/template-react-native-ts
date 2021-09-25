import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { $consts } from 'app/plugins'
import styles from 'app/styles/layout/tabbar'

const TabbarIcon = ({ name, focused }: { name: string, focused: boolean }) => {
  let source
  switch (name) {
    case $consts['ROUTE/HOME']:
      source = focused ? require('app/assets/layout/home-on.png') : require('app/assets/layout/home.png')
      break
    case $consts['ROUTE/STATION_MONITOR']:
      source = focused ? require('app/assets/layout/station-monitor-on.png') : require('app/assets/layout/station-monitor.png')
      break
    case $consts['ROUTE/HISTORY_DATA']:
      source = focused ? require('app/assets/layout/history-data-on.png') : require('app/assets/layout/history-data.png')
      break
    case $consts['ROUTE/STATION_ALARM']:
      source = focused ? require('app/assets/layout/station-alarm-on.png') : require('app/assets/layout/station-alarm.png')
      break
    case $consts['ROUTE/COMPLAIN']:
      source = focused ? require('app/assets/layout/complain-on.png') : require('app/assets/layout/complain.png')
      break
    default:
      break
  }

  return <Image source={source} style={styles.tabIcon} />
}

/**
 * 自定义的 TabBar
 * @param param0 
 * @returns 
 */
const Tabbar = ({ state, descriptors, navigation }: any) => {
  const onPress = (route: any, focused: boolean) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true
    })

    if (!focused && !event.defaultPrevented) {
      navigation.navigate(route.name)
    }
  }

  return (
    <View style={[styles.wrap, styles.flexRow]}>
      {
        state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key]

          const label = options.tabBarLabel
          const focused = state.index === index

          return (
            <TouchableOpacity
              key={`${label}_${index}`}
              onPress={() => onPress(route, focused)}
              style={[styles.tab, styles.flexColumnBetween, styles.flex1]}
            >
              <TabbarIcon name={route.name} focused={focused} />
              <Text style={{ color: focused ? '#31C7A9' : '#8E8E93', fontSize: 10 }}>{label}</Text>
            </TouchableOpacity>
          )
        })
      }
    </View>
  )
}

export default Tabbar
