import React, { Component } from 'react'
import { View, ViewStyle, Text, TextStyle, TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Arrow, IFComponent } from 'app/components'
import { toastStore } from 'app/stores'
import dayjs, { OpUnitType } from 'dayjs'
import { isEqual } from 'lodash'
import styles from 'app/styles/components/dateTimePicker'

/**
 * 为什么要用 class 组件？
 * 因为函数式组件，会需要用到 hooks 的多个 setState，
 * 比如 setVisible() setEYMD()
 * 而 DateTimePicker 是原生组件，它的回调 handlePickerChange 是异步的，
 * 这就导致 hooks setState 依次调用的话，useEffect 钩子也会多次调用，
 * 而如果此时 useEffect 有多个依赖变量的话，比如 useEffect(() => {}, [visible, SYMD])
 * visible 会先让 useEffect run 一次，但此时 SYMD 还不是最新值，这就会导致存在一些问题
 */

interface BaseProps {
  onChange: Function,
  fontStyle?: TextStyle | TextStyle[],
  style?: ViewStyle | ViewStyle[]
}

interface PickerProps extends BaseProps {
  value: string
}

interface RangeProps extends BaseProps {
  value: string[],
  autoFixTime?: number,
  autoFixType?: OpUnitType,
  overloadTime?: number,
  overloadType?: OpUnitType
}

const checkTimeType = (overloadType: string | undefined) => {
  let typeText
  switch (overloadType) {
    case 'hour':
      typeText = '小时'
      break
    case 'day':
      typeText = '天'
      break
    case 'month':
      typeText = '月'
      break
    case 'year':
      typeText = '年'
      break
    default:
      typeText = overloadType
      break
  }
  return typeText
}

// Picker
class TimePicker extends Component<PickerProps> {
  state: any

  constructor (props: PickerProps) {
    super(props)
    this.state = {
      visible: false,
      SYMD: this._initSYMD(props.value)
    }
  }

  componentDidUpdate () {
    const { visible, SYMD } = this.state
    const propsDate = this._initSYMD(this.props.value)
    if (!visible && !isEqual(propsDate, SYMD)) {
      this.props.onChange(SYMD)
    }
  }

  _initSYMD = (date: string) => {
    return dayjs(dayjs(date).format('YYYY-MM-DD HH:mm')).format('YYYY-MM-DD HH:mm:ss')
  }

  showTimer = () => {
    this.setState({ visible: true })
  }

  handlePickerChange = (event: any, time: any) => {
    if (event.type === 'set') {
      this.setState({
        visible: false,
        SYMD: this._initSYMD(time)
      })
    } else {
      this.setState({ visible: false })
    }
  }

  getSelectedDate = () => {
    const { SYMD } = this.state
    return new Date(dayjs(SYMD).valueOf())
  }

  render () {
    const { visible, SYMD } = this.state
    return (
      <View style={[styles.flexRow, this.props.style]}>
        <TouchableOpacity onPress={this.showTimer} style={[styles.flexRow]}>
          <Text style={[styles.fz10, styles.cr333, styles.pdr4, this.props.fontStyle]}>{dayjs(SYMD).format('HH:mm')}</Text>
          <Arrow theme='dark' />
        </TouchableOpacity>
        <IFComponent IF={visible}>
          <DateTimePicker
            value={this.getSelectedDate()}
            mode='time'
            is24Hour={true}
            onChange={this.handlePickerChange}
          />
        </IFComponent>
      </View>
    )
  }
}

class DatePicker extends Component<PickerProps> {
  state: any

  constructor (props: PickerProps) {
    super(props)
    this.state = {
      visible: false,
      SYMD: this._initSYMD(props.value)
    }
  }

  componentDidUpdate () {
    const { visible, SYMD } = this.state
    const propsDate = this._initSYMD(this.props.value)
    if (!visible && !isEqual(propsDate, SYMD)) {
      this.props.onChange(SYMD)
    }
  }

  _initSYMD = (date: string) => {
    return dayjs(dayjs(date).format('YYYY-MM-DD')).format('YYYY-MM-DD HH:mm:ss')
  }

  showTimer = () => {
    this.setState({ visible: true })
  }

  handlePickerChange = (event: any, time: any) => {
    if (event.type === 'set') {
      this.setState({
        visible: false,
        SYMD: this._initSYMD(time)
      })
    } else {
      this.setState({ visible: false })
    }
  }

  getSelectedDate = () => {
    const { SYMD } = this.state
    return new Date(dayjs(SYMD).valueOf())
  }

  render () {
    const { visible, SYMD } = this.state
    return (
      <View style={[styles.flexRow, this.props.style]}>
        <TouchableOpacity onPress={this.showTimer} style={[styles.flexRow]}>
          <Text style={[styles.fz10, styles.cr333, styles.pdr4, this.props.fontStyle]}>{dayjs(SYMD).format('YYYY-MM-DD')}</Text>
          <Arrow theme='dark' />
        </TouchableOpacity>
        <IFComponent IF={visible}>
          <DateTimePicker
            value={this.getSelectedDate()}
            mode='date'
            is24Hour={true}
            onChange={this.handlePickerChange}
          />
        </IFComponent>
      </View>
    )
  }
}

class DateAndTimePicker extends Component<PickerProps> {
  state: any

  constructor (props: PickerProps) {
    super(props)
    this.state = {
      visible: false,
      queueIndex: 0,
      SYMD: this._initSEYMD(props.value)
    }
  }

  componentDidUpdate () {
    if (!this.state.visible) {
      const { SYMD } = this.state
      const { value, onChange } = this.props
      if (!isEqual(SYMD, value)) {
        onChange(SYMD)
      }
    }
  }

  _initSEYMD = (date: string) => {
    return dayjs(dayjs(date).format('YYYY-MM-DD HH:mm')).format('YYYY-MM-DD HH:mm:ss')
  }

  showTimer = () => {
    this.setState({
      visible: true,
      queueIndex: 0
    })
  }

  handlePickerChange = (event: any, time: any) => {
    if (event.type === 'set') {
      switch (this.state.queueIndex) {
        case 0:
          this.setState({
            queueIndex: 1,
            SYMD: this._initSEYMD(time)
          })
          break
        case 1:
          this.setState({
            visible: false,
            SYMD: this._initSEYMD(time)
          })
          break
      }
    } else {
      this.setState({ visible: false })
    }
  }

  getSelectedDate = () => {
    const { SYMD } = this.state
    return new Date(dayjs(SYMD).valueOf())
  }

  render () {
    const { visible, queueIndex, SYMD } = this.state
    return (
      <View style={[styles.flexRow, this.props.style]}>
        <TouchableOpacity onPress={this.showTimer} style={[styles.flexRow]}>
          <Text style={[styles.fz10, styles.cr333, styles.pdr4, this.props.fontStyle]}>{dayjs(SYMD).format('YYYY-MM-DD HH:mm')}</Text>
          <Arrow theme='dark' />
        </TouchableOpacity>
        <IFComponent IF={visible}>
          <DateTimePicker
            value={this.getSelectedDate()}
            mode={queueIndex === 0 ? 'date' : 'time'}
            is24Hour={true}
            onChange={this.handlePickerChange}
          />
        </IFComponent>
      </View>
    )
  }
}

// Range Picker
class RangeDatePicker extends Component<RangeProps> {
  state: any

  constructor (props: RangeProps) {
    super(props)
    this.state = {
      visible: false,
      queueIndex: 0,
      SYMD: this._initSYMD(props.value[0]),
      EYMD: this._initEYMD(props.value[1])
    }
  }

  componentDidUpdate () {
    if (!this.state.visible) {
      const { overloadTime, overloadType, autoFixTime, autoFixType } = this.props
      const { SYMD, EYMD } = this.state

      const sameOrBefore = dayjs(EYMD).isSameOrBefore(SYMD)
      const rangeOverload = overloadTime && overloadType && dayjs(EYMD).diff(SYMD, overloadType) >= overloadTime
      const getError = sameOrBefore || rangeOverload
      if (getError) {
        if (sameOrBefore) {
          toastStore.show('结束时间必须大于开始时间')
        } else if (rangeOverload) {
          toastStore.show(`区间不能超过${overloadTime}${checkTimeType(overloadType)}`)
        }
        this.setState({
          EYMD: dayjs(SYMD).add(autoFixTime || 1, autoFixType || 'day').subtract(1, 'second').format('YYYY-MM-DD HH:mm:ss')
        })
      } else {
        const propsDate = [this._initSYMD(this.props.value[0]), this._initEYMD(this.props.value[1])]
        const newDate = [SYMD, EYMD]
        if (!isEqual(propsDate, newDate)) {
          this.props.onChange(newDate)
        }
      }
    }
  }

  _initSYMD = (date: string) => {
    return dayjs(dayjs(date).format('YYYY-MM-DD')).format('YYYY-MM-DD HH:mm:ss')
  }

  _initEYMD = (date: string) => {
    return dayjs(dayjs(date).format('YYYY-MM-DD')).add(1, 'day').subtract(1, 'second').format('YYYY-MM-DD HH:mm:ss')
  }

  showTimer = (type: 'start' | 'end') => {
    this.setState({
      visible: true,
      queueIndex: type === 'start' ? 0 : 1
    })
  }

  handlePickerChange = (event: any, time: any) => {
    if (event.type === 'set') {
      switch (this.state.queueIndex) {
        case 0:
          this.setState({
            visible: false,
            SYMD: this._initSYMD(time)
          })
          break
        case 1:
          this.setState({
            visible: false,
            EYMD: this._initEYMD(time)
          })
          break
      }
    } else {
      this.setState({ visible: false })
    }
  }

  getSelectedDate = () => {
    const { queueIndex, SYMD, EYMD } = this.state
    return new Date(dayjs(queueIndex === 0 ? SYMD : EYMD).valueOf())
  }

  render () {
    const { visible, SYMD, EYMD } = this.state
    return (
      <View style={[styles.flexRow, this.props.style]}>
        <TouchableOpacity onPress={() => { this.showTimer('start') }} style={[styles.flexRow]}>
          <Text style={[styles.fz10, styles.cr333, styles.pdr4, this.props.fontStyle]}>{dayjs(SYMD).format('YYYY-MM-DD')}</Text>
          <Arrow theme='dark' />
        </TouchableOpacity>
        <Text style={[styles.fz10, styles.cr000, styles.pdh8, this.props.fontStyle]}>~</Text>
        <TouchableOpacity onPress={() => { this.showTimer('end') }} style={[styles.flexRow]}>
          <Text style={[styles.fz10, styles.cr333, styles.pdr4, this.props.fontStyle]}>{dayjs(EYMD).format('YYYY-MM-DD')}</Text>
          <Arrow theme='dark' />
        </TouchableOpacity>
        <IFComponent IF={visible}>
          <DateTimePicker
            value={this.getSelectedDate()}
            mode='date'
            is24Hour={true}
            onChange={this.handlePickerChange}
          />
        </IFComponent>
      </View>
    )
  }
}

class RangeDateTimePicker extends Component<RangeProps> {
  state: any

  constructor (props: RangeProps) {
    super(props)
    this.state = {
      visible: false,
      queueIndex: 0,
      SYMD: this._initSEYMD(props.value[0]),
      EYMD: this._initSEYMD(props.value[1])
    }
  }

  componentDidUpdate () {
    if (!this.state.visible) {
      const { overloadTime, overloadType, autoFixTime, autoFixType } = this.props
      const { SYMD, EYMD } = this.state

      const sameOrBefore = dayjs(EYMD).isSameOrBefore(SYMD)
      const rangeOverload = overloadTime && overloadType && dayjs(EYMD).diff(SYMD, overloadType) >= overloadTime
      const getError = sameOrBefore || rangeOverload
      if (getError) {
        if (sameOrBefore) {
          toastStore.show('结束时间必须大于开始时间')
        } else if (rangeOverload) {
          toastStore.show(`区间不能超过${overloadTime}${checkTimeType(overloadType)}`)
        }
        this.setState({
          EYMD: dayjs(SYMD).add(autoFixTime || 1, autoFixType || 'day').format('YYYY-MM-DD HH:mm:ss')
        })
      } else {
        const propsDate = [this._initSEYMD(this.props.value[0]), this._initSEYMD(this.props.value[1])]
        const newDate = [SYMD, EYMD]
        if (!isEqual(propsDate, newDate)) {
          this.props.onChange(newDate)
        }
      }
    }
  }

  _initSEYMD = (date: string) => {
    return dayjs(dayjs(date).format('YYYY-MM-DD HH:mm')).format('YYYY-MM-DD HH:mm:ss')
  }

  showTimer = (type: 'start' | 'end') => {
    this.setState({
      visible: true,
      queueIndex: type === 'start' ? 0 : 2
    })
  }

  handlePickerChange = (event: any, time: any) => {
    if (event.type === 'set') {
      switch (this.state.queueIndex) {
        case 0:
          this.setState({
            queueIndex: 1,
            SYMD: this._initSEYMD(time)
          })
          break
        case 1:
          this.setState({
            visible: false,
            SYMD: this._initSEYMD(time)
          })
          break
        case 2:
          this.setState({
            queueIndex: 3,
            EYMD: this._initSEYMD(time)
          })
          break
        case 3:
          this.setState({
            visible: false,
            EYMD: this._initSEYMD(time)
          })
          break
      }
    } else {
      this.setState({ visible: false })
    }
  }

  getSelectedDate = () => {
    const { queueIndex, SYMD, EYMD } = this.state
    let date
    switch (queueIndex) {
      case 0:
      case 1:
        date = SYMD
        break
      case 2:
      case 3:
        date = EYMD
        break
    }
    return new Date(dayjs(date).valueOf())
  }

  render () {
    const { visible, queueIndex, SYMD, EYMD } = this.state
    return (
      <View style={[styles.flexRow, this.props.style]}>
        <TouchableOpacity onPress={() => { this.showTimer('start') }} style={[styles.flexRow]}>
          <Text style={[styles.fz10, styles.cr333, styles.pdr4, this.props.fontStyle]}>{dayjs(SYMD).format('YYYY-MM-DD HH:mm')}</Text>
          <Arrow theme='dark' />
        </TouchableOpacity>
        <Text style={[styles.fz10, styles.cr000, styles.pdh8, this.props.fontStyle]}>~</Text>
        <TouchableOpacity onPress={() => { this.showTimer('end') }} style={[styles.flexRow]}>
          <Text style={[styles.fz10, styles.cr333, styles.pdr4, this.props.fontStyle]}>{dayjs(EYMD).format('YYYY-MM-DD HH:mm')}</Text>
          <Arrow theme='dark' />
        </TouchableOpacity>
        <IFComponent IF={visible}>
          <DateTimePicker
            value={this.getSelectedDate()}
            mode={queueIndex === 0 || queueIndex === 2 ? 'date' : 'time'}
            is24Hour={true}
            onChange={this.handlePickerChange}
          />
        </IFComponent>
      </View>
    )
  }
}

export { RangeDatePicker, DateAndTimePicker, DatePicker, TimePicker }
export default RangeDateTimePicker