import { StyleSheet } from 'react-native'
import styles, { commonSize } from '../index'

export default {
  ...styles,
  ...StyleSheet.create({
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 10
    },
    headerMain: {
      height: 44,
      backgroundColor: '#31C7A9',
      paddingHorizontal: 12
    },
    headerTitle: {
      fontSize: 17,
      color: '#ffffff',
      fontWeight: 'bold'
    },
    headerSwitch: {
      paddingLeft: 6
    },
    headerMenu: {
      overflow: 'hidden',
      backgroundColor: '#31C7A9'
    },
    headerActiveMenu: {
      color: '#31C7A9'
    },
    container: {
      paddingTop: 56,
      paddingBottom: 12,
      paddingHorizontal: 12
    },
    timePicker: {
      backgroundColor: '#ffffff',
      paddingHorizontal: 4,
      paddingVertical: 5,
      borderRadius: 4
    },
    chartZone: {
      height: 250,
      marginTop: 16,
      marginBottom: 12
    },
    table: {
      backgroundColor: '#ffffff',
      borderRadius: 4
    },
    tableBolder: {
      borderWidth: commonSize.screen.pixel,
      borderColor: '#F0F0F0'
    },
    tableRow: {
      flexDirection: 'row'
    },
    tableCellText: {
      fontSize: 14,
      color: '#333333',
      paddingHorizontal: 10,
      paddingVertical: 16
    },
    tableAlarmText: {
      fontSize: 14,
      color: '#B90303',
      paddingHorizontal: 10,
      paddingVertical: 16
    },
    tableWarnText: {
      fontSize: 14,
      color: '#F58E08',
      paddingHorizontal: 10,
      paddingVertical: 16
    }
  })
}