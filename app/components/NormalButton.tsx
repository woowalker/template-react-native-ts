import React from 'react'
import { Text, TextStyle, TouchableOpacity, ViewProps, TouchableOpacityProps } from 'react-native'
import styles from 'app/styles/components/normalButtion'

type UProps = ViewProps & TouchableOpacityProps

interface Props extends UProps {
  text: string,
  textStyle?: TextStyle | TextStyle[]
}

const NormalButton = (props: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onPress}
      style={[styles.wrap, styles.fullWidth, styles.boxRadius4, styles.flexCenter, props.style]}
    >
      <Text style={[styles.fz18, styles.fwBolder, styles.crFFF, props.textStyle]}>{props.text}</Text>
    </TouchableOpacity>
  )
}

export default NormalButton