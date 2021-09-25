import React from 'react'
import { View, ViewStyle, Text, Image, ImageSourcePropType } from 'react-native'
import styles from 'app/styles/components/title'

type Props = {
  title: string,
  icon?: ImageSourcePropType,
  color?: string,
  style?: ViewStyle | ViewStyle[]
}

const Title = (props: Props) => {
  return (
    <View style={[styles.fullWidth, styles.flexRow, props.style]}>
      {
        props.icon
          ? <Image source={props.icon} style={[styles.icon, styles.mgr8]} />
          : <View style={[styles.preffix, styles.mgr8, props.color ? { backgroundColor: props.color } : null]} />
      }
      <Text style={[styles.fz14, styles.cr333]}>{props.title}</Text>
    </View>
  )
}

export default Title