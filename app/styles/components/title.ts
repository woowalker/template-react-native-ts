import { StyleSheet } from 'react-native'
import styles from 'app/styles/index'

export default {
  ...styles,
  ...StyleSheet.create({
    preffix: {
      width: 4,
      height: 14,
      borderRadius: 1,
      backgroundColor: '#31C7A9'
    },
    icon: {
      width: 10,
      height: 14
    }
  })
}