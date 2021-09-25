import React, { useState, useEffect } from 'react'
import { TouchableOpacity, Animated, ViewProps } from 'react-native'
import { observer } from 'mobx-react'
import { $consts } from 'app/plugins'
import { omit } from 'lodash'
import styles from 'app/styles/components/fadeIn'

interface Props extends ViewProps {
  show: boolean,
  pureView?: boolean,
  mask?: boolean,
  onPressMask?: Function,
  onShow?: Function,
  onHide?: Function,
  children?: React.ReactChild
}

const omitProps = ['pureView', 'mask', 'onPressMask', 'onShow', 'onHide', 'children', 'style']
const FadeIn = (props: Props) => {
  const [opacity] = useState(new Animated.Value(0))
  const [visible, setVisible] = useState(false)
  const [process, setProcess] = useState({
    showing: false,
    hiding: false
  })

  useEffect(() => {
    if (props.show) {
      if (!visible && !process.showing && !process.hiding) {
        setVisible(true)
        setProcess({ showing: true, hiding: false })
        Animated.timing(opacity, {
          toValue: 1,
          duration: $consts['COMMON/DURATION_FADE_IN'],
          useNativeDriver: true
        }).start(({ finished }) => {
          if (finished) {
            setProcess({ showing: false, hiding: false })
            props.onShow instanceof Function && props.onShow()
          }
        })
      }
    } else {
      if (visible && !process.showing && !process.hiding) {
        setProcess({ showing: false, hiding: true })
        Animated.timing(opacity, {
          toValue: 0,
          duration: $consts['COMMON/DURATION_FADE_IN'],
          useNativeDriver: true
        }).start(({ finished }) => {
          if (finished) {
            setVisible(false)
            setProcess({ showing: false, hiding: false })
            props.onHide instanceof Function && props.onHide()
          }
        })
      }
    }
  }, [props.show, visible, process])

  const handleMaskPress = () => {
    props.onPressMask instanceof Function && props.onPressMask()
  }

  if (!visible) return null

  if (props.pureView) {
    return (
      <Animated.View
        style={[styles.wrap, styles.flexCenter, props.mask ? styles.mask : null, { opacity }, props.style]}
        {...omit(props, omitProps)}
      >
        {props.children}
      </Animated.View>
    )
  }

  return (
    <Animated.View
      style={[styles.wrap, props.mask ? styles.mask : null, { opacity }, props.style]}
      {...omit(props, omitProps)}
    >
      {/** 为什么不用 TouchableWithoutFeedback，因为对 TouchableWithoutFeedback 设置样式貌似无效？ 21.07.20 */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleMaskPress}
        style={[styles.fullParent, styles.flexCenter]}
      >
        {props.children}
      </TouchableOpacity>
    </Animated.View>
  )
}

export default observer(FadeIn)