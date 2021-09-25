import { StyleSheet } from 'react-native'
import styles from 'app/styles/index'

export default {
  ...styles,
  ...StyleSheet.create({
    wrap: {
      backgroundColor: '#31C7A9',
    },
    title: {
      fontSize: 17,
      fontWeight: 'bold',
      color: '#ffffff'
    },
    prefix: {
      width: '20%'
    },
    suffix: {
      width: '20%'
    }
  })
}