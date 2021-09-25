import { StyleSheet } from 'react-native'
import styles, { commonSize } from 'app/styles/index'

export default {
  ...styles,
  ...StyleSheet.create({
    wrap: {
      height: 49,
      borderTopWidth: commonSize.screen.pixel,
      borderTopColor: '#c9c9c9',
      paddingTop: 10,
      paddingBottom: 2,
    },
    tab: {
      height: '100%'
    },
    tabIcon: {
      width: 18,
      height: 18
    }
  })
}