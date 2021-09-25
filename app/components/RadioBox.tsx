import React from 'react'
import { View, ViewStyle, Text, TextStyle, ScrollView, TouchableOpacity } from 'react-native'
import { uniq, cloneDeep } from 'lodash'
import styles from 'app/styles/components/radioBox'

type Props = {
  type?: 'radio' | 'checkbox',
  data: Object[],
  value: any[],
  onChange: Function,
  theme?: 'light' | 'dark',
  itemStyle?: ViewStyle | ViewStyle[],
  fontStyle?: TextStyle | TextStyle[],
  style?: ViewStyle | ViewStyle[]
}

const RadioBox = (props: Props) => {
  const handleSelectChange = (value: number | string) => {
    if (props.type === 'checkbox') {
      const copyValue = cloneDeep(props.value)
      const checkedIndex = copyValue.indexOf(value)
      if (checkedIndex !== -1) {
        copyValue.splice(checkedIndex, 1)
        props.onChange(copyValue)
      } else {
        props.onChange(uniq([...props.value, value]))
      }
    } else {
      props.onChange([value])
    }
  }

  return (
    <View style={[props.style]}>
      <ScrollView horizontal={true}>
        {
          props.data.map((item: any, index: number) => {
            const active = props.value.indexOf(item.value) !== -1
            const boxTheme = props.theme === 'dark' ? styles.boxDark : styles.boxLight
            const boxActiveTheme = active ? (props.theme === 'dark' ? styles.boxDarkActive : styles.boxLightActive) : null
            const fontTheme = props.theme === 'dark' ? styles.fontDark : styles.fontLight
            const fontActiveTheme = active ? (props.theme === 'dark' ? styles.fontDarkActive : styles.fontLightActive) : null

            return (
              <TouchableOpacity
                key={`${item.text}_${index}`}
                onPress={() => { handleSelectChange(item.value) }}
                style={[styles.box, boxTheme, boxActiveTheme, props.itemStyle]}
              >
                <Text style={[styles.fz12, fontTheme, fontActiveTheme, props.fontStyle]}>{item.text}</Text>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    </View>
  )
}

export default RadioBox