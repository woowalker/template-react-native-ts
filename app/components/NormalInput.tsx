import React from 'react'
import { View, ViewStyle, TextInput, TextInputProps, Image, ImageSourcePropType } from 'react-native'
import { IFComponent } from 'app/components'
import { omit } from 'lodash'
import styles from 'app/styles/components/normalInput'

interface Props extends TextInputProps {
  wrapStyle?: ViewStyle | ViewStyle[],
  preffix?: ImageSourcePropType | any,
  suffix?: React.ReactChild
}

const NormalInput = (props: Props) => {
  const { placeholder = '请输入' } = props
  const inputProps = omit(props, ['wrapStyle', 'preffix'])

  return (
    <View style={[styles.wrap, styles.fullWidth, styles.flexRow, styles.border, styles.boxRadius4, styles.bgWhite, props.wrapStyle]}>
      <IFComponent IF={!!props.preffix}>
        <View style={styles.prefixWrap}>
          <Image source={props.preffix} style={styles.icon} />
        </View>
      </IFComponent>
      <TextInput placeholder={placeholder} style={[styles.textInput, styles.flex1, styles.fullHeight]} {...inputProps} />
      {props.suffix}
    </View>
  )
}

export default NormalInput