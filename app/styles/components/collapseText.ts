import { StyleSheet } from 'react-native'
import styles from 'app/styles/index'

export default {
  ...styles,
  ...StyleSheet.create({
    collapseIcon: {
      position: 'absolute',
      top: 4,
      right: 0
    }
  })
}