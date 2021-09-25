import React from 'react'
import { View, Text } from 'react-native'
import { observer } from 'mobx-react'
import FadeIn from './FadeIn'
import toastStore from 'app/stores/components/toast'
import styles from 'app/styles/components/toast'

const Toast = () => {
  return (
    <FadeIn
      show={toastStore.visible}
      pointerEvents='box-none'
      pureView={true}
    >
      <View style={styles.container}>
        <Text numberOfLines={2} style={styles.font}>{toastStore.msg}</Text>
      </View>
    </FadeIn>
  )
}

export default observer(Toast)