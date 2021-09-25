import { StyleSheet } from 'react-native'
import styles from 'app/styles/index'

export default {
  ...styles,
  ...StyleSheet.create({
    indicator: {
      width: '100%',
      height: 4,
      borderRadius: 2,
      backgroundColor: '#31C7A9',
      position: 'absolute',
      left: 0,
      bottom: 0
    }
  })
}