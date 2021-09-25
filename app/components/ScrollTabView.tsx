import React, { useState, useMemo, useRef } from 'react'
import { Text, TextStyle, View, ViewStyle, ScrollView, TouchableOpacity } from 'react-native'
import PagerView from 'react-native-pager-view'
import { IFComponent } from 'app/components'
import { uniq } from 'lodash'
import styles from 'app/styles/components/scrollTab'

type PropsData = {
  text: string,
  value: string | number,
  component: React.ReactElement
}

type Props = {
  data: PropsData[],
  lazyTab?: boolean,
  onChange?: Function,
  defaultValue?: string | number,
  style?: ViewStyle | ViewStyle[],
  scrollStyle?: ViewStyle | ViewStyle[],
  itemStyle?: ViewStyle | ViewStyle[],
  fontStyle?: TextStyle | TextStyle[],
  indicatorStyle?: ViewStyle | ViewStyle[]
}

const itemLayout: any = {}
const ScrollTabView = (props: Props) => {
  const defaultValue = props.defaultValue || props.data[0].value

  const refOfScroll: any = useRef(null)
  const refOfPagerView: any = useRef(null)
  const [value, setValue] = useState(defaultValue)
  const [activatedPage, setActivatedPage] = useState([defaultValue])

  const handleLayout = (evt: any, val: any) => {
    itemLayout[val] = evt.nativeEvent.layout
  }

  const handleSelectChange = (val: string | number) => {
    setValue(val)
    setActivatedPage(uniq(activatedPage.concat([val])))
    if (refOfScroll.current && itemLayout[value]) {
      refOfScroll.current.scrollTo({ x: itemLayout[val].x, y: 0, animated: true })
    }
    if (refOfPagerView.current) {
      const currPage = props.data.findIndex(item => item.value === val)
      refOfPagerView.current.setPage(currPage)
    }
    props.onChange instanceof Function && props.onChange(val)
  }

  const handlePageSelected = (evt: any) => {
    const { position } = evt.nativeEvent
    const findIndex = props.data.findIndex(item => item.value === value)
    findIndex !== position && setValue(props.data[position].value)
  }

  const showTabs = useMemo(() => {
    if (props.lazyTab) {
      return props.data.map((item, index) => {
        if (activatedPage.indexOf(item.value) === -1) {
          return <View key={`fake_${item.value}_${index}`} />
        }
        return <View key={`${item.value}_${index}`} style={[styles.flex1]}>{item.component}</View>
      })
    }
    return props.data.map((item, index) => {
      return <View key={`${item.value}_${index}`} style={[styles.flex1]}>{item.component}</View>
    })
  }, [props.data, activatedPage])

  const initialPage = props.data.findIndex(item => item.value === defaultValue)
  return (
    <View style={[styles.flex1, props.style]}>
      <View style={[styles.mgb12]}>
        <ScrollView
          ref={refOfScroll}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={props.scrollStyle}
        >
          {
            props.data.map((item: any, index: number) => {
              const active = item.value === value
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
      <PagerView
        ref={refOfPagerView}
        initialPage={initialPage}
        onPageSelected={handlePageSelected}
        style={[styles.flex1]}
      >
        {showTabs}
      </PagerView>
    </View>
  )
}

export default ScrollTabView