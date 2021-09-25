import React, { useState, useEffect } from 'react'
import { Animated, ImageStyle } from 'react-native'
import { $consts } from 'app/plugins'
import styles from 'app/styles/components/arrow'

type Props = {
  direction?: 'top' | 'right' | 'bottom' | 'left',
  theme?: 'light' | 'dark',
  style?: ImageStyle | ImageStyle[]
}

const Arrow = ({
  direction = 'bottom',
  theme = 'light',
  style
}: Props) => {
  const initDeg = direction === 'left' ? 90 : direction === 'top' ? 180 : direction === 'right' ? 270 : 0
  const [rotateZ] = useState(new Animated.Value(initDeg))

  useEffect(() => {
    switch (direction) {
      case 'left':
        Animated.timing(rotateZ, {
          toValue: 90,
          duration: $consts['COMMON/DURATION_ARROW_ROTATE'],
          useNativeDriver: true
        }).start()
        break
      case 'top':
        Animated.timing(rotateZ, {
          toValue: 180,
          duration: $consts['COMMON/DURATION_ARROW_ROTATE'],
          useNativeDriver: true
        }).start()
        break
      case 'right':
        Animated.timing(rotateZ, {
          toValue: 270,
          duration: $consts['COMMON/DURATION_ARROW_ROTATE'],
          useNativeDriver: true
        }).start()
        break
      default:
        Animated.timing(rotateZ, {
          toValue: 0,
          duration: $consts['COMMON/DURATION_ARROW_ROTATE'],
          useNativeDriver: true
        }).start()
        break
    }
  }, [direction])

  return (
    <Animated.Image
      source={theme === 'light' ? require('app/assets/common/arrow.png') : require('app/assets/common/arrow-black.png')}
      style={[
        styles.arrow,
        {
          transform: [{
            rotateZ: rotateZ.interpolate({
              inputRange: [0, 360],
              outputRange: ['0deg', '360deg']
            })
          }]
        },
        style
      ]}
    />
  )
}

export default Arrow