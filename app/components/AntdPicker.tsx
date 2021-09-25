import React, { useMemo } from 'react'
import { TouchableOpacity, ViewStyle, Text, TextStyle } from 'react-native'
import { Picker } from '@ant-design/react-native'
import { PickerProps } from '@ant-design/react-native/lib/picker'
import { Arrow } from 'app/components'
import styles from 'app/styles/components/picker'

interface AntdPickerProps extends PickerProps {
  fontStyle?: TextStyle | TextStyle[]
}

interface PickerChildrenProps {
  onPress?: Function,
  style?: ViewStyle | ViewStyle[],
  fontStyle?: TextStyle | TextStyle[],
  extra?: React.ReactChild
}

const PickerChildren = (props: PickerChildrenProps) => {
  const handlePress = () => {
    const { onPress } = props
    onPress instanceof Function && onPress()
  }

  const { style, fontStyle } = props
  return (
    <TouchableOpacity onPress={handlePress} style={[styles.flexRowSBC, style]}>
      <Text style={[styles.fz10, styles.cr333, styles.pdr4, fontStyle]}>{props.extra}</Text>
      <Arrow theme='dark' />
    </TouchableOpacity>
  )
}

const AntdPicker = (props: AntdPickerProps) => {
  const cols = useMemo(() => {
    let count = 0
    const counter = (data: any[]) => {
      if (Array.isArray(data) && data.length) {
        count++
        counter(data[0].children)
      }
    }
    return count || 1
  }, [props.data])

  return (
    <Picker
      {...props}
      cols={cols}
    >
      <PickerChildren
        style={props.style}
        fontStyle={props.fontStyle}
      />
    </Picker>
  )
}

export default AntdPicker