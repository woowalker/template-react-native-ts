import { StyleSheet } from 'react-native'
import styles from 'app/styles/index'

export default {
  ...styles,
  ...StyleSheet.create({
    container: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      backgroundColor: 'rgba(0,0,0,0.7)',
      borderRadius: 5
    },
    font: {
      fontSize: 16,
      color: '#fff',
      textAlign: 'center',
      backgroundColor: 'transparent'
    }
  })
}