import React, { Component } from 'react'
import { View, Image } from 'react-native'
import frames from 'app/assets/frames'
import styles from 'app/styles/components/framesAnimation'

type MyProps = {
  duration?: number
}

type MyState = {
  curr: number,
  timer: any,
  refs: any
}

class FramesAnimation extends Component<MyProps, MyState> {
  state: MyState = {
    curr: 0,
    timer: -1,
    refs: {}
  }

  componentDidMount () {
    this.ani()
  }

  componentWillUnmount () {
    clearTimeout(this.state.timer)
  }

  ani = () => {
    const { duration = 2000 } = this.props
    this.state.timer = setInterval(() => {
      const { curr, refs } = this.state
      let newCurr = curr + 1
      newCurr > frames.length - 1 && (newCurr = 0)
      refs[`refOfFrameImg_${curr}`].setNativeProps({ opacity: 0 })
      refs[`refOfFrameImg_${newCurr}`].setNativeProps({ opacity: 1 })
      this.state.curr = newCurr
    }, duration / frames.length)
  }

  render () {
    return (
      <View style={styles.framesWrap}>
        {
          frames.map((frame, index) => {
            return (
              <Image
                key={`framesAnimation_${index}`}
                ref={ref => this.state.refs[`refOfFrameImg_${index}`] = ref}
                source={frame}
                style={[styles.frame, { opacity: this.state.curr === index ? 1 : 0 }]}
              />
            )
          })
        }
      </View>
    )
  }
}

export default FramesAnimation