import { StyleSheet } from 'react-native'
import styles from '../index'

export default {
  ...styles,
  ...StyleSheet.create({
    container: {
      paddingTop: 56,
      paddingBottom: 12
    },
    animatedScroller: {
      width: '200%'
    },
    scrollerWrap: {
      width: '50%',
      height: '100%'
    }
  })
}