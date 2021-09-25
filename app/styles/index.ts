import { StyleSheet } from 'react-native'
import commonSize from 'app/utils/size'

export { commonSize }
export default StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  flexRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  flexRowAround: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  flexRowFSFS: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  flexRowFEC: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  flexRowSBC: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  flexColumn: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  flexColumnAround: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  flexColumnBetween: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  flexColumnFSFS: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  flexColumnSBFS: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  flexCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  flexColumnCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  flex1: {
    flex: 1
  },
  flexWrap: {
    flexWrap: 'wrap'
  },
  posRelative: {
    position: 'relative'
  },
  overflowHidden: {
    overflow: 'hidden'
  },
  opacity0: {
    opacity: 0
  },
  bgWhite: {
    backgroundColor: 'white'
  },
  bgMain: {
    backgroundColor: '#fbfbfb'
  },
  bgTransparent: {
    backgroundColor: 'transparent'
  },
  fullParent: {
    width: '100%',
    height: '100%'
  },
  fullWidth: {
    width: '100%'
  },
  fullHeight: {
    height: '100%'
  },
  textCenter: {
    textAlign: 'center'
  },
  textLeft: {
    textAlign: 'left'
  },
  textRight: {
    textAlign: 'right'
  },
  pd0: {
    padding: 0
  },
  pd8: {
    padding: 8
  },
  pd12: {
    padding: 12
  },
  pdh2: {
    paddingHorizontal: 2
  },
  pdh4: {
    paddingHorizontal: 4
  },
  pdh8: {
    paddingHorizontal: 8
  },
  pdh12: {
    paddingHorizontal: 12
  },
  pdv6: {
    paddingVertical: 6
  },
  pdv10: {
    paddingVertical: 10
  },
  pdv12: {
    paddingVertical: 12
  },
  pdt10: {
    paddingTop: 10
  },
  pdt20: {
    paddingTop: 20
  },
  pdr4: {
    paddingRight: 4
  },
  pdr10: {
    paddingRight: 10
  },
  pdr16: {
    paddingRight: 16
  },
  pdb8: {
    paddingBottom: 8
  },
  pdl4: {
    paddingLeft: 4
  },
  pdl8: {
    paddingLeft: 8
  },
  pdl10: {
    paddingLeft: 10
  },
  mg0: {
    margin: 0
  },
  mgh12: {
    marginHorizontal: 12
  },
  mgt8: {
    marginTop: 8
  },
  mgt10: {
    marginTop: 10
  },
  mgt12: {
    marginTop: 12
  },
  mgt14: {
    marginTop: 14
  },
  mgt16: {
    marginTop: 16
  },
  mgt20: {
    marginTop: 20
  },
  mgr6: {
    marginRight: 6
  },
  mgr8: {
    marginRight: 8
  },
  mgr10: {
    marginRight: 10
  },
  mgr20: {
    marginRight: 20
  },
  mgb4: {
    marginBottom: 4
  },
  mgb8: {
    marginBottom: 8
  },
  mgb10: {
    marginBottom: 10
  },
  mgb12: {
    marginBottom: 12
  },
  mgb14: {
    marginBottom: 14
  },
  mgb16: {
    marginBottom: 16
  },
  mgl6: {
    marginLeft: 6
  },
  mgl8: {
    marginLeft: 8
  },
  pvh2: {
    paddingVertical: 2,
    paddingHorizontal: 2,
  },
  pvh12: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  ph2: {
    paddingHorizontal: 2
  },
  ph4: {
    paddingHorizontal: 4
  },
  pv4: {
    paddingVertical: 4
  },
  pv8: {
    paddingVertical: 8
  },
  lh12: {
    lineHeight: 12
  },
  lh24: {
    lineHeight: 24
  },
  fz10: {
    fontSize: 10
  },
  fzlh10: {
    fontSize: 10,
    lineHeight: 10
  },
  fz12: {
    fontSize: 12
  },
  fzlh12: {
    fontSize: 12,
    lineHeight: 12
  },
  fz14: {
    fontSize: 14
  },
  fz16: {
    fontSize: 16
  },
  fz18: {
    fontSize: 18
  },
  fz20: {
    fontSize: 20
  },
  fz28: {
    fontSize: 28
  },
  fz32: {
    fontSize: 32
  },
  fwBolder: {
    fontWeight: 'bold'
  },
  fw900: {
    fontWeight: '900'
  },
  crFFF: {
    color: 'white'
  },
  cr000: {
    color: 'black'
  },
  cr333: {
    color: '#333333'
  },
  cr666: {
    color: '#666666'
  },
  cr999: {
    color: '#999999'
  },
  crMain: {
    color: '#31C7A9'
  },
  crError: {
    color: '#f5222d'
  },
  borderNone: {
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  border: {
    borderWidth: commonSize.screen.pixel,
    borderColor: '#f0f0f0'
  },
  borderTop: {
    borderTopWidth: commonSize.screen.pixel,
    borderTopColor: '#f0f0f0'
  },
  borderBottom: {
    borderBottomWidth: commonSize.screen.pixel,
    borderBottomColor: '#f0f0f0'
  },
  boxRadius4: {
    borderRadius: 4
  },
  boxShadow: {
    shadowColor: '#d0d0d0',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  }
})
