import { StyleSheet } from 'react-native'
import styles from '../index'

export default {
  ...styles,
  ...StyleSheet.create({
    login: {
      paddingTop: 80,
      paddingHorizontal: 61
    },
    logo: {
      width: 150,
      height: 150,
      marginBottom: 98,
      alignSelf: 'center'
    }
  })
}