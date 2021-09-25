import React, { useState } from 'react'
import { ScrollView, Image, StatusBar } from 'react-native'
import { NormalInput, NormalButton } from 'app/components'
import { commonStore, toastStore } from 'app/stores'
import styles from 'app/styles/pages/login'

const LoginPage = () => {
  const [username, setUsername] = useState<any>()
  const [password, setPassword] = useState<any>()

  const handleLogin = () => {
    if (!username) {
      toastStore.show('请输入用户名')
      return
    }
    if (!password) {
      toastStore.show('请输入密码')
      return
    }
    commonStore.toLogin(username, password)
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps='handled'
      style={[styles.flex1, styles.bgMain]}
      contentContainerStyle={[styles.login]}
    >
      <StatusBar backgroundColor='transparent' />
      <Image source={require('app/assets/login/logo.png')} style={[styles.logo]} />
      <NormalInput
        value={username}
        onChangeText={text => { setUsername(text) }}
        textContentType='username'
        clearButtonMode='always'
        placeholder='请输入用户名'
        preffix={require('app/assets/login/username.png')}
        wrapStyle={[styles.mgb16]}
      />
      <NormalInput
        secureTextEntry
        value={password}
        onChangeText={text => { setPassword(text) }}
        textContentType='password'
        clearButtonMode='always'
        placeholder='请输入密码'
        preffix={require('app/assets/login/password.png')}
        wrapStyle={[styles.mgb16]}
      />
      <NormalButton text='登录' onPress={handleLogin} />
    </ScrollView>
  )
}

export default LoginPage