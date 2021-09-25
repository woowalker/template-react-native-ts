import React from 'react'
import { View, ViewStyle, Text, TextStyle, TouchableOpacity } from 'react-native'
import { StackHeaderProps } from '@react-navigation/stack'
import { Arrow, IFComponent } from 'app/components'
import styles from 'app/styles/layout/header'

type Props = StackHeaderProps & {
  style?: ViewStyle | ViewStyle[],
  styleLeft?: ViewStyle | ViewStyle[],
  styleTitle?: ViewStyle | ViewStyle[],
  styleTitleText?: TextStyle | TextStyle[],
  styleRight?: ViewStyle | ViewStyle[],
  customLeft?: React.ReactChild | React.ReactChild[],
  customTitle?: React.ReactChild | React.ReactChild[],
  customRight?: React.ReactChild | React.ReactChild[]
}

const Header = (props: Props) => {
  const handleNavBack = () => {
    props.navigation.goBack()
  }

  const { options } = props
  return (
    <View style={[styles.wrap, styles.flexRowBetween, options.headerStyle, props.style]}>
      <View style={[styles.suffix, styles.flexRow, styles.flex1, styles.fullHeight, props.styleLeft]}>
        <IFComponent IF={!props.customLeft} ELSE={props.customLeft}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleNavBack}
            style={[styles.fullHeight, styles.flexCenter, styles.pdh12]}
          >
            <Arrow direction='left' style={{ width: 12, height: 6 }} />
          </TouchableOpacity>
        </IFComponent>
      </View>
      <View style={[styles.flexCenter, props.styleTitle]}>
        <IFComponent IF={!props.customTitle} ELSE={props.customTitle}>
          <Text style={[styles.title, props.styleTitleText]}>{options.title}</Text>
        </IFComponent>
      </View>
      <View style={[styles.suffix, styles.flexRowFEC, styles.flex1, styles.fullHeight, props.styleRight]}>
        {props.customRight}
      </View>
    </View>
  )
}

export default Header
