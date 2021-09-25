import { StyleSheet } from 'react-native'
import styles, { commonSize } from 'app/styles/index'

export default {
  ...styles,
  ...StyleSheet.create({
    box: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 4,
      marginRight: 4
    },
    boxLight: {
      backgroundColor: '#ffffff',
      borderWidth: commonSize.screen.pixel,
      borderColor: '#f0f0f0'
    },
    boxLightActive: {
      backgroundColor: '#31C7A9',
      borderWidth: commonSize.screen.pixel,
      borderColor: '#31C7A9'
    },
    boxDark: {
      backgroundColor: '#f5f5f5'
    },
    boxDarkActive: {
      backgroundColor: '#F58E08'
    },
    fontLight: {
      color: '#999999'
    },
    fontLightActive: {
      color: '#ffffff'
    },
    fontDark: {
      color: '#999999'
    },
    fontDarkActive: {
      color: '#ffffff'
    }
  })
}