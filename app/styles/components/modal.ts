import { StyleSheet } from 'react-native'
import styles, { commonSize } from 'app/styles/index'

export default {
  ...styles,
  ...StyleSheet.create({
    container: {
      width: '80%',
      alignSelf: 'center'
    },
    title: {
      paddingTop: 20
    },
    content: {
      paddingTop: 16,
      paddingBottom: 20
    },
    buttons: {
      width: '100%',
      height: 40,
      borderTopWidth: commonSize.screen.pixel,
      borderTopColor: '#c9c9c9'
    },
    borderRight: {
      borderRightWidth: commonSize.screen.pixel,
      borderRightColor: '#c9c9c9'
    }
  })
}