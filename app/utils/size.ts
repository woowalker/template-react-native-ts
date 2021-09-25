import { PixelRatio, StatusBar, Dimensions, Platform } from 'react-native'

const { width, height } = Dimensions.get('screen') // 屏幕宽度
const { width: winWidth, height: winHeight } = Dimensions.get('window') // 可视宽度
const minPixel = PixelRatio.get()

const fontScale = PixelRatio.getFontScale()
const statusBarHeight_android = StatusBar.currentHeight || 24

const size = (function countScreenSize () {
  let _width = width * minPixel
  let _height = height * minPixel
  if (_width <= 640 && _height <= 960) {
    return 1 // 3.5英寸
  }
  else if (_width <= 640 && _height <= 1136) {
    return 2 // 4.0英寸 i5 i5s i5c SE
  }
  else if (_width <= 750 && _height <= 1334) {
    return 3 // 4.7英寸 i6 i6s i7 i8
  }
  else {
    return 4 // 5.5英寸 i6p i6sp i7p i8p
  }
})()

const commonSize = {
  screen: {
    pixel: 1 / minPixel, // 最小线宽
    pixelRatio: minPixel,
    width: width, // 屏幕宽度
    height: height, // 屏幕高度
    fontScale: fontScale,
    size: size
  },
  window: {
    width: winWidth, // 可视区域宽度
    height: winHeight // 可视区域高度
  },
  statusBar: {
    height: Platform.OS === 'android' ? statusBarHeight_android : 20 // 状态栏高度，iOS=20，安卓通过StatusBar获取
  }
}

export default commonSize