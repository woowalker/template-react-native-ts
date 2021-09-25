import React, { useEffect, useRef } from 'react'
import { Text, TextStyle, View, ViewStyle, ScrollView, TouchableOpacity } from 'react-native'
import { IFComponent } from 'app/components'
import styles from 'app/styles/components/scrollTab'

type Props = {
  data: any[],
  value: string | number,
  onChange: Function,
  scrollStyle?: ViewStyle | ViewStyle[],
  itemStyle?: ViewStyle | ViewStyle[],
  fontStyle?: TextStyle | TextStyle[],
  indicatorStyle?: ViewStyle | ViewStyle[],
  style?: ViewStyle | ViewStyle[]
}

const itemLayout: any = {}
const ScrollTab = (props: Props) => {
  const refOfScroll: any = useRef(null)

  const handleLayout = (evt: any, value: any) => {
    itemLayout[value] = evt.nativeEvent.layout
  }

  const handleSelectChange = (value: string | number) => {
    props.onChange(value)
  }

  useEffect(() => {
    if (refOfScroll.current && itemLayout[props.value]) {
      refOfScroll.current.scrollTo({ x: itemLayout[props.value].x, y: 0, animated: true })
    }
  }, [props.value])

  return (
    <View style={[props.style]}>
      <ScrollView
        ref={refOfScroll}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={props.scrollStyle}
      >
        {
          props.data.map((item: any, index: number) => {
            const active = item.value === props.value
            return (
              <TouchableOpacity
                key={`${item.text}_${index}`}
                onPress={() => { handleSelectChange(item.value) }}
                onLayout={evt => { handleLayout(evt, item.value) }}
                style={[styles.posRelative, styles.pdb8]}
              >
                <View style={[styles.pdh8, props.itemStyle]}>
                  <Text style={[styles.fz12, active ? styles.cr333 : styles.cr999, props.fontStyle]}>{item.text}</Text>
                </View>
                <IFComponent IF={active}>
                  <View style={[styles.indicator, props.indicatorStyle]} />
                </IFComponent>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    </View>
  )
}

export default ScrollTab