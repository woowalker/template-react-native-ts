import React, { useState, useMemo } from 'react'
import { View, ViewStyle, Text, TextStyle, Image, TouchableOpacity } from 'react-native'
import { DatePicker } from '@ant-design/react-native'
import { Arrow } from 'app/components'
import { toastStore } from 'app/stores'
import { isEqual } from 'lodash'
import dayjs, { OpUnitType } from 'dayjs'
import styles from 'app/styles/components/dateTimePicker'

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

interface PickerChildrenProps {
  SYMD: string,
  format: string,
  onPress?: Function,
  fontStyle?: TextStyle | TextStyle[],
  style?: ViewStyle | ViewStyle[]
}

interface RangeChildrenProps extends BaseProps {
  SYMD: string,
  EYMD: string,
  format: string,
  onPress?: Function
}

const minDate = new Date('1970-01-01')
const maxDate = new Date(dayjs(dayjs().format('YYYY')).add(101, 'year').format('YYYY-MM-DD'))
const timeMinDate = dayjs(`${dayjs().format('YYYY-MM-DD')} 00:00:00`).toDate()
const timeMaxDate = dayjs(`${dayjs().format('YYYY-MM-DD')} 23:59:59`).toDate()

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
const AntdPickerChildren = (props: PickerChildrenProps) => {
  const { SYMD, format, style, fontStyle } = props

  const handleSYMDPress = () => {
    const { onPress } = props
    onPress instanceof Function && onPress()
  }

  return (
    <View style={[styles.flexRow, style]}>
      <Image source={require('app/assets/common/calendar.png')} style={[styles.calendar, styles.mgr6]} />
      <TouchableOpacity onPress={handleSYMDPress} style={[styles.flexRow]}>
        <Text style={[styles.fz10, styles.cr333, styles.pdr4, fontStyle]}>{dayjs(SYMD).format(format)}</Text>
        <Arrow theme='dark' />
      </TouchableOpacity>
    </View>
  )
}

const AntdYearPicker = (props: PickerProps) => {
  const initSYMD = (date: string) => {
    return dayjs(dayjs(date).format('YYYY')).format('YYYY-MM-DD HH:mm:ss')
  }

  const handlePickerChange = (date: any) => {
    date = initSYMD(date)
    const { value, onChange } = props
    if (!isEqual(date, value)) {
      onChange(date)
    }
  }

  const value = useMemo(() => {
    return dayjs(initSYMD(props.value)).toDate()
  }, [props.value])

  return (
    <DatePicker
      value={value}
      mode='year'
      minDate={minDate}
      maxDate={maxDate}
      onChange={handlePickerChange}
    >
      <AntdPickerChildren
        SYMD={initSYMD(props.value)}
        format='YYYY'
        style={props.style}
        fontStyle={props.fontStyle}
      />
    </DatePicker>
  )
}

const AntdMonthPicker = (props: PickerProps) => {
  const initSYMD = (date: string) => {
    return dayjs(dayjs(date).format('YYYY-MM')).format('YYYY-MM-DD HH:mm:ss')
  }

  const handlePickerChange = (date: any) => {
    date = initSYMD(date)
    const { value, onChange } = props
    if (!isEqual(date, value)) {
      onChange(date)
    }
  }

  const value = useMemo(() => {
    return dayjs(initSYMD(props.value)).toDate()
  }, [props.value])

  return (
    <DatePicker
      value={value}
      mode='month'
      minDate={minDate}
      maxDate={maxDate}
      onChange={handlePickerChange}
    >
      <AntdPickerChildren
        SYMD={initSYMD(props.value)}
        format='YYYY-MM'
        style={props.style}
        fontStyle={props.fontStyle}
      />
    </DatePicker>
  )
}

const AntdDatePicker = (props: PickerProps) => {
  const initSYMD = (date: string) => {
    return dayjs(dayjs(date).format('YYYY-MM-DD')).format('YYYY-MM-DD HH:mm:ss')
  }

  const handlePickerChange = (date: any) => {
    date = initSYMD(date)
    const { value, onChange } = props
    if (!isEqual(date, value)) {
      onChange(date)
    }
  }

  const value = useMemo(() => {
    return dayjs(initSYMD(props.value)).toDate()
  }, [props.value])

  return (
    <DatePicker
      value={value}
      mode='date'
      minDate={minDate}
      maxDate={maxDate}
      onChange={handlePickerChange}
    >
      <AntdPickerChildren
        SYMD={initSYMD(props.value)}
        format='YYYY-MM-DD'
        style={props.style}
        fontStyle={props.fontStyle}
      />
    </DatePicker>
  )
}

const AntdTimePicker = (props: PickerProps) => {
  const initSYMD = (date: string) => {
    return dayjs(dayjs(date).format('YYYY-MM-DD HH:mm')).format('YYYY-MM-DD HH:mm:ss')
  }

  const handlePickerChange = (date: any) => {
    date = initSYMD(date)
    const { value, onChange } = props
    if (!isEqual(date, value)) {
      onChange(date)
    }
  }

  const value = useMemo(() => {
    return dayjs(initSYMD(props.value)).toDate()
  }, [props.value])

  return (
    <DatePicker
      value={value}
      mode='time'
      minDate={timeMinDate}
      maxDate={timeMaxDate}
      onChange={handlePickerChange}
    >
      <AntdPickerChildren
        SYMD={initSYMD(props.value)}
        format='HH:mm'
        style={props.style}
        fontStyle={props.fontStyle}
      />
    </DatePicker>
  )
}

const AntdDateTimePicker = (props: PickerProps) => {
  const initSYMD = (date: string) => {
    return dayjs(dayjs(date).format('YYYY-MM-DD HH:mm')).format('YYYY-MM-DD HH:mm:ss')
  }

  const handlePickerChange = (date: any) => {
    date = initSYMD(date)
    const { value, onChange } = props
    if (!isEqual(date, value)) {
      onChange(date)
    }
  }

  const value = useMemo(() => {
    return dayjs(initSYMD(props.value)).toDate()
  }, [props.value])

  return (
    <DatePicker
      value={value}
      mode='datetime'
      minDate={minDate}
      maxDate={maxDate}
      onChange={handlePickerChange}
    >
      <AntdPickerChildren
        SYMD={initSYMD(props.value)}
        format='YYYY-MM-DD HH:mm'
        style={props.style}
        fontStyle={props.fontStyle}
      />
    </DatePicker>
  )
}

// Range Picker
const AntdRangeChildren = (props: RangeChildrenProps) => {
  const { SYMD, EYMD, format, style, fontStyle } = props

  const handleSYMDPress = () => {
    const { onPress, onChange } = props
    onChange('SYMD')
    onPress instanceof Function && onPress()
  }

  const handleEYMDPress = () => {
    const { onPress, onChange } = props
    onChange('EYMD')
    onPress instanceof Function && onPress()
  }

  return (
    <View style={[styles.flexRow, style]}>
      <Image source={require('app/assets/common/calendar.png')} style={[styles.calendar, styles.mgr6]} />
      <TouchableOpacity onPress={handleSYMDPress} style={[styles.flexRow]}>
        <Text style={[styles.fz10, styles.cr333, styles.pdr4, fontStyle]}>{dayjs(SYMD).format(format)}</Text>
        <Arrow theme='dark' />
      </TouchableOpacity>
      <Text style={[styles.fz10, styles.cr000, styles.pdh8, fontStyle]}>~</Text>
      <TouchableOpacity onPress={handleEYMDPress} style={[styles.flexRow]}>
        <Text style={[styles.fz10, styles.cr333, styles.pdr4, fontStyle]}>{dayjs(EYMD).format(format)}</Text>
        <Arrow theme='dark' />
      </TouchableOpacity>
    </View>
  )
}

const AntdRangeYearPicker = (props: RangeProps) => {
  const [pickerType, setPickerType] = useState<string>('SYMD')

  const initSYMD = (date: string) => {
    return dayjs(dayjs(date).format('YYYY')).format('YYYY-MM-DD HH:mm:ss')
  }

  const initEYMD = (date: string) => {
    return dayjs(dayjs(date).format('YYYY')).add(1, 'year').subtract(1, 'second').format('YYYY-MM-DD HH:mm:ss')
  }

  const handlePickerChange = (date: any) => {
    const { value, overloadTime, overloadType, autoFixTime, autoFixType, onChange } = props
    const SYMD = pickerType === 'SYMD' ? initSYMD(date) : value[0]
    const EYMD = pickerType === 'SYMD' ? value[1] : initEYMD(date)

    const sameOrBefore = dayjs(EYMD).isSameOrBefore(SYMD)
    const rangeOverload = overloadTime && overloadType && dayjs(EYMD).diff(SYMD, overloadType) >= overloadTime
    const getError = sameOrBefore || rangeOverload
    if (getError) {
      if (sameOrBefore) {
        toastStore.show('结束时间必须大于开始时间')
      } else if (rangeOverload) {
        toastStore.show(`区间不能超过${overloadTime}${checkTimeType(overloadType)}`)
      }
      const newRange = [SYMD, dayjs(SYMD).add(autoFixTime || 1, autoFixType || 'year').subtract(1, 'second').format('YYYY-MM-DD HH:mm:ss')]
      onChange(newRange)
    } else {
      const newRange = [SYMD, EYMD]
      if (!isEqual(dateRange, newRange)) {
        onChange(newRange)
      }
    }
  }

  const dateRange = useMemo(() => {
    return [initSYMD(props.value[0]), initEYMD(props.value[1])]
  }, [props.value])

  const value = useMemo(() => {
    return pickerType === 'SYMD' ? dayjs(dateRange[0]).toDate() : dayjs(dateRange[1]).toDate()
  }, [pickerType, dateRange])

  return (
    <DatePicker
      value={value}
      mode='year'
      minDate={minDate}
      maxDate={maxDate}
      onChange={handlePickerChange}
    >
      <AntdRangeChildren
        SYMD={dateRange[0]}
        EYMD={dateRange[1]}
        format='YYYY'
        onChange={setPickerType}
        style={props.style}
        fontStyle={props.fontStyle}
      />
    </DatePicker>
  )
}

const AntdRangeMonthPicker = (props: RangeProps) => {
  const [pickerType, setPickerType] = useState<string>('SYMD')

  const initSYMD = (date: string) => {
    return dayjs(dayjs(date).format('YYYY-MM')).format('YYYY-MM-DD HH:mm:ss')
  }

  const initEYMD = (date: string) => {
    return dayjs(dayjs(date).format('YYYY-MM')).add(1, 'month').subtract(1, 'second').format('YYYY-MM-DD HH:mm:ss')
  }

  const handlePickerChange = (date: any) => {
    const { value, overloadTime, overloadType, autoFixTime, autoFixType, onChange } = props
    const SYMD = pickerType === 'SYMD' ? initSYMD(date) : value[0]
    const EYMD = pickerType === 'SYMD' ? value[1] : initEYMD(date)

    const sameOrBefore = dayjs(EYMD).isSameOrBefore(SYMD)
    const rangeOverload = overloadTime && overloadType && dayjs(EYMD).diff(SYMD, overloadType) >= overloadTime
    const getError = sameOrBefore || rangeOverload
    if (getError) {
      if (sameOrBefore) {
        toastStore.show('结束时间必须大于开始时间')
      } else if (rangeOverload) {
        toastStore.show(`区间不能超过${overloadTime}${checkTimeType(overloadType)}`)
      }
      const newRange = [SYMD, dayjs(SYMD).add(autoFixTime || 1, autoFixType || 'month').subtract(1, 'second').format('YYYY-MM-DD HH:mm:ss')]
      onChange(newRange)
    } else {
      const newRange = [SYMD, EYMD]
      if (!isEqual(dateRange, newRange)) {
        onChange(newRange)
      }
    }
  }

  const dateRange = useMemo(() => {
    return [initSYMD(props.value[0]), initEYMD(props.value[1])]
  }, [props.value])

  const value = useMemo(() => {
    return pickerType === 'SYMD' ? dayjs(dateRange[0]).toDate() : dayjs(dateRange[1]).toDate()
  }, [pickerType, dateRange])

  return (
    <DatePicker
      value={value}
      mode='month'
      minDate={minDate}
      maxDate={maxDate}
      onChange={handlePickerChange}
    >
      <AntdRangeChildren
        SYMD={dateRange[0]}
        EYMD={dateRange[1]}
        format='YYYY-MM'
        onChange={setPickerType}
        style={props.style}
        fontStyle={props.fontStyle}
      />
    </DatePicker>
  )
}

const AntdRangeDatePicker = (props: RangeProps) => {
  const [pickerType, setPickerType] = useState<string>('SYMD')

  const initSYMD = (date: string) => {
    return dayjs(dayjs(date).format('YYYY-MM-DD')).format('YYYY-MM-DD HH:mm:ss')
  }

  const initEYMD = (date: string) => {
    return dayjs(dayjs(date).format('YYYY-MM-DD')).add(1, 'day').subtract(1, 'second').format('YYYY-MM-DD HH:mm:ss')
  }

  const handlePickerChange = (date: any) => {
    const { value, overloadTime, overloadType, autoFixTime, autoFixType, onChange } = props
    const SYMD = pickerType === 'SYMD' ? initSYMD(date) : value[0]
    const EYMD = pickerType === 'SYMD' ? value[1] : initEYMD(date)

    const sameOrBefore = dayjs(EYMD).isSameOrBefore(SYMD)
    const rangeOverload = overloadTime && overloadType && dayjs(EYMD).diff(SYMD, overloadType) >= overloadTime
    const getError = sameOrBefore || rangeOverload
    if (getError) {
      if (sameOrBefore) {
        toastStore.show('结束时间必须大于开始时间')
      } else if (rangeOverload) {
        toastStore.show(`区间不能超过${overloadTime}${checkTimeType(overloadType)}`)
      }
      const newRange = [SYMD, dayjs(SYMD).add(autoFixTime || 1, autoFixType || 'day').subtract(1, 'second').format('YYYY-MM-DD HH:mm:ss')]
      onChange(newRange)
    } else {
      const newRange = [SYMD, EYMD]
      if (!isEqual(dateRange, newRange)) {
        onChange(newRange)
      }
    }
  }

  const dateRange = useMemo(() => {
    return [initSYMD(props.value[0]), initEYMD(props.value[1])]
  }, [props.value])

  const value = useMemo(() => {
    return pickerType === 'SYMD' ? dayjs(dateRange[0]).toDate() : dayjs(dateRange[1]).toDate()
  }, [pickerType, dateRange])

  return (
    <DatePicker
      value={value}
      mode='date'
      minDate={minDate}
      maxDate={maxDate}
      onChange={handlePickerChange}
    >
      <AntdRangeChildren
        SYMD={dateRange[0]}
        EYMD={dateRange[1]}
        format='YYYY-MM-DD'
        onChange={setPickerType}
        style={props.style}
        fontStyle={props.fontStyle}
      />
    </DatePicker>
  )
}

const AntdRangeDateTimePicker = (props: RangeProps) => {
  const [pickerType, setPickerType] = useState<string>('SYMD')

  const initSEYMD = (date: string) => {
    return dayjs(dayjs(date).format('YYYY-MM-DD HH:mm')).format('YYYY-MM-DD HH:mm:ss')
  }

  const handlePickerChange = (date: any) => {
    date = initSEYMD(date)

    const { value, overloadTime, overloadType, autoFixTime, autoFixType, onChange } = props
    const SYMD = pickerType === 'SYMD' ? date : value[0]
    const EYMD = pickerType === 'SYMD' ? value[1] : date

    const sameOrBefore = dayjs(EYMD).isSameOrBefore(SYMD)
    const rangeOverload = overloadTime && overloadType && dayjs(EYMD).diff(SYMD, overloadType) >= overloadTime
    const getError = sameOrBefore || rangeOverload
    if (getError) {
      if (sameOrBefore) {
        toastStore.show('结束时间必须大于开始时间')
      } else if (rangeOverload) {
        toastStore.show(`区间不能超过${overloadTime}${checkTimeType(overloadType)}`)
      }
      const newRange = [SYMD, dayjs(SYMD).add(autoFixTime || 1, autoFixType || 'day').format('YYYY-MM-DD HH:mm:ss')]
      onChange(newRange)
    } else {
      const newRange = [SYMD, EYMD]
      if (!isEqual(dateRange, newRange)) {
        onChange(newRange)
      }
    }
  }

  const dateRange = useMemo(() => {
    return [initSEYMD(props.value[0]), initSEYMD(props.value[1])]
  }, [props.value])

  const value = useMemo(() => {
    return pickerType === 'SYMD' ? dayjs(dateRange[0]).toDate() : dayjs(dateRange[1]).toDate()
  }, [pickerType, dateRange])

  return (
    <DatePicker
      value={value}
      mode='datetime'
      minDate={minDate}
      maxDate={maxDate}
      onChange={handlePickerChange}
    >
      <AntdRangeChildren
        SYMD={dateRange[0]}
        EYMD={dateRange[1]}
        format='YYYY-MM-DD HH:mm'
        onChange={setPickerType}
        style={props.style}
        fontStyle={props.fontStyle}
      />
    </DatePicker>
  )
}

export {
  AntdRangeDatePicker,
  AntdRangeMonthPicker,
  AntdRangeYearPicker,
  AntdDateTimePicker,
  AntdTimePicker,
  AntdDatePicker,
  AntdMonthPicker,
  AntdYearPicker
}
export default AntdRangeDateTimePicker