import React, { useState, useEffect } from 'react'
import { Text, View, Image, StatusBar, Animated, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { observer } from 'mobx-react'
import { FadeIn, IFComponent } from 'app/components'
import { commonStore } from 'app/stores'
import { $consts } from 'app/plugins'
import styles from 'app/styles/pages/home'

const Header = () => {
  const [menuShow, setMenuShow] = useState(false)
  const [height] = useState(new Animated.Value(0))

  const navigation = useNavigation()

  const handleLogin = () => {
    navigation.navigate($consts['ROUTE/LOGIN'])
  }

  const handleNav = () => {
    navigation.navigate($consts['ROUTE/ACTION_LOG'])
    // 定时提高页面表现
    setTimeout(() => {
      setMenuShow(false)
    }, 300)
  }

  const handleLogout = () => {
    commonStore.toLogout()
  }

  useEffect(() => {
    if (menuShow) {
      Animated.timing(height, {
        toValue: 80,
        duration: $consts['COMMON/DURATION_COMMON'],
        useNativeDriver: false
      }).start()
    } else {
      Animated.timing(height, {
        toValue: 0,
        duration: $consts['COMMON/DURATION_COMMON'],
        useNativeDriver: false
      }).start()
    }
  }, [menuShow])

  return (
    <View style={[styles.header, menuShow ? styles.fullHeight : null]}>
      <StatusBar backgroundColor='#31C7A9' />
      <FadeIn show={menuShow} mask={true} onPressMask={() => { setMenuShow(false) }} />
      <View style={[styles.headerMain, styles.flexRowBetween]}>
        <Image source={require('app/assets/login/logo.png')} style={styles.headerLogo} />
        <IFComponent
          IF={!!commonStore.token}
          ELSE={
            <TouchableOpacity onPress={handleLogin}>
              <Text style={[styles.fz12, styles.crFFF]}>欢迎登录管理后台</Text>
            </TouchableOpacity>
          }>
          <View style={[styles.headerUser, styles.flex1]}>
            <TouchableOpacity style={[styles.fullHeight, styles.flexColumnSBFS]} onPress={() => { setMenuShow(true) }}>
              <Text style={[styles.fz16, styles.crFFF]}>Admin</Text>
              <Text style={[styles.fz12, styles.crFFF]}>上次登录时间：{commonStore.lastLoginTime}</Text>
            </TouchableOpacity>
          </View>
        </IFComponent>
      </View>
      <Animated.View style={[styles.headerMenu, styles.flexRowAround, { height }]}>
        <TouchableOpacity onPress={handleNav} style={[styles.flexCenter, styles.flex1]}>
          <Image source={require('app/assets/main/log.png')} />
          <Text style={[styles.fz16, styles.crFFF, styles.pdl10]}>日志</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={[styles.flexCenter, styles.flex1]}>
          <Image source={require('app/assets/main/logout.png')} />
          <Text style={[styles.fz16, styles.crFFF, styles.pdl10]}>退出</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

export default observer(Header)