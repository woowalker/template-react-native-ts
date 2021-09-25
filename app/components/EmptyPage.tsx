import React from 'react'
import { View, Text, Image } from 'react-native'
import styles from 'app/styles/components/emptyPage'

type Props = {
  text?: string
}

const EmptyPage = (props: Props) => {
  return (
    <View style={[styles.fullParent, styles.flexColumn]}>
      <Image source={require('app/assets/common/empty.png')} style={{ marginTop: 110 }} />
      <Text style={[styles.fz14, styles.cr666, styles.mgt8]}>{props.text || '暂无数据'}</Text>
    </View>
  )
}

export default EmptyPage