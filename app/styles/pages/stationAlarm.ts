import { StyleSheet } from 'react-native'
import styles from '../index'

export default {
  ...styles,
  ...StyleSheet.create({
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 10
    },
    headerMain: {
      height: 44,
      backgroundColor: '#31C7A9',
      paddingHorizontal: 12
    },
    headerTitle: {
      fontSize: 17,
      color: '#ffffff',
      fontWeight: 'bold'
    },
    headerSwitch: {
      paddingLeft: 6
    },
    headerMenu: {
      overflow: 'hidden',
      backgroundColor: '#31C7A9'
    },
    container: {
      paddingTop: 56,
      paddingBottom: 12
    },
    timePicker: {
      backgroundColor: '#ffffff',
      paddingHorizontal: 4,
      paddingVertical: 5,
      borderRadius: 4
    },
    chartZone: {
      height: 200,
      marginTop: 10,
      marginBottom: 12
    }
  })
}