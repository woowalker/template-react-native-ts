import React, { useState } from 'react'
import { View, ViewStyle, Text, TextStyle, TextComponent, TouchableOpacity } from 'react-native'
import { Arrow } from 'app/components'
import styles from 'app/styles/components/collapseText'

type Props = {
  style?: ViewStyle | ViewStyle[],
  textStyle?: TextStyle | TextStyle[],
  numberOfLines?: number,
  children: TextComponent | string
}

const CollapseText = (props: Props) => {
  const [numOfLine, setNumOfLine] = useState(props.numberOfLines)

  const toggleNum = () => {
    setNumOfLine(numOfLine !== undefined ? undefined : props.numberOfLines)
  }

  if (!props.numberOfLines) {
    return <Text style={[styles.flex1, props.textStyle]}>{props.children}</Text>
  }

  return (
    <TouchableOpacity activeOpacity={1} onPress={toggleNum} style={[styles.flex1, styles.posRelative, props.style]}>
      <Text numberOfLines={numOfLine} style={[styles.flex1, styles.pdr16, props.textStyle]}>{props.children}</Text>
      <Arrow theme='dark' direction={!numOfLine ? 'top' : 'bottom'} style={styles.collapseIcon} />
    </TouchableOpacity>
  )
}

export default CollapseText