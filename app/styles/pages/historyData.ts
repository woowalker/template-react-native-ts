import { StyleSheet } from 'react-native'
import styles, { commonSize } from '../index'

export default {
  ...styles,
  ...StyleSheet.create({
    container: {
      paddingTop: 56,
      paddingBottom: 12,
      paddingHorizontal: 12
    },
    timePicker: {
      backgroundColor: '#ffffff',
      paddingHorizontal: 4,
      paddingVertical: 5,
      borderRadius: 4
    },
    chartZone: {
      height: 250,
      marginTop: 16
    },
    chartAttach: {
      position: 'absolute',
      top: -12,
      right: 0
    }
  })
}