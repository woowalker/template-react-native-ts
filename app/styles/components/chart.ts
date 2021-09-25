import { StyleSheet } from 'react-native'
import styles from 'app/styles/index'

export default {
  ...styles,
  ...StyleSheet.create({
    empty: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    }
  })
}