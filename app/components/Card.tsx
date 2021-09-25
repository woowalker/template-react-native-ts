import React from 'react'
import { View, ViewProps, ViewStyle } from 'react-native'
import styles from 'app/styles/components/card'

type Props = ViewProps & {
  children: React.ReactChild | React.ReactChild[]
}

const Card = (props: Props) => {
  return (
    <View {...props} style={[
      styles.pdh8,
      styles.pdv10,
      styles.mgb10,
      styles.bgWhite,
      styles.boxRadius4,
      styles.boxShadow,
      props.style
    ]}>
      {props.children}
    </View>
  )
}

export default Card