import React, { useEffect } from 'react'
import { View, Text, BackHandler } from 'react-native'
import { observer } from 'mobx-react'
import FadeIn from './FadeIn'
import FramesAnimation from 'app/components/FramesAnimation'
import { loadingStore } from 'app/stores'
import styles from 'app/styles/components/loading'

const Loading = () => {
  useEffect(() => {
    const onBackPress = () => {
      if (!loadingStore.visible) return false
      loadingStore.hide(true)
      return true
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress)

    return () => backHandler.remove()
  }, [])

  return (
    <FadeIn
      needsOffscreenAlphaCompositing={true} // 这两个属性保证 container 的 box-shadow 能正常跟随 FadeIn 的透明度变化而变化
      renderToHardwareTextureAndroid={true} // 这两个属性保证 container 的 box-shadow 能正常跟随 FadeIn 的透明度变化而变化
      show={loadingStore.visible}
    >
      <View style={[styles.pd8, styles.bgWhite, styles.boxRadius4, styles.boxShadow]}>
        <FramesAnimation />
        <Text style={[styles.fz16, styles.cr666, styles.textCenter, styles.bgTransparent]}>{loadingStore.msg}</Text>
      </View>
    </FadeIn>
  )
}

export default observer(Loading)