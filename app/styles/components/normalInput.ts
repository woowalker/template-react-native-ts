import { StyleSheet } from 'react-native'
import styles, { commonSize } from 'app/styles/index'

export default {
  ...styles,
  ...StyleSheet.create({
    wrap: {
      height: 48 + commonSize.screen.pixel * 2
    },
    prefixWrap: {
      width: 20,
      height: 48,
      marginHorizontal: 12,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    icon: {
      width: 20,
      height: 24
    },
    textInput: {
      height: 48
    }
  })
}