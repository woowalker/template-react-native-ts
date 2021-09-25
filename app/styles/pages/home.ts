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
      height: 60,
      backgroundColor: '#31C7A9',
      paddingVertical: 10,
      paddingLeft: 8,
      paddingRight: 12
    },
    headerLogo: {
      width: 40,
      height: 40
    },
    headerUser: {
      paddingLeft: 6
    },
    headerMenu: {
      overflow: 'hidden',
      backgroundColor: '#31C7A9'
    },
    container: {
      paddingTop: 72,
      paddingBottom: 12
    },
    chartZone: {
      height: 200,
      marginVertical: 12
    }
  })
}