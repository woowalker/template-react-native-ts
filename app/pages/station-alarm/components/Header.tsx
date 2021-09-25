import React, { useState, useEffect, useMemo } from 'react'
import { Text, View, StatusBar, Animated, TouchableOpacity } from 'react-native'
import { observer } from 'mobx-react'
import { FadeIn, Arrow, RadioBox } from 'app/components'
import { stationStore } from 'app/stores'
import { $consts } from 'app/plugins'
import styles from 'app/styles/pages/stationAlarm'

type Props = {
  title: string,
  onChange: Function
}

const Header = (props: Props) => {
  const [menuShow, setMenuShow] = useState(false)
  const [height] = useState(new Animated.Value(0))

  const [stations, setStations] = useState([])

  // 获取可用站点
  useEffect(() => {
    stationStore.getStations()
  }, [])

  // 初始化选中站点
  useEffect(() => {
    setStations(stationStore.stations.map((item: any) => item.id))
  }, [stationStore.stations])

  // onChange 事件
  useEffect(() => {
    stations.length && props.onChange(stations.join(','))
  }, [stations])

  useEffect(() => {
    if (menuShow) {
      Animated.timing(height, {
        toValue: 44,
        duration: $consts['COMMON/DURATION_COMMON'],
        useNativeDriver: false
      }).start()
    } else {
      Animated.timing(height, {
        toValue: 0,
        duration: $consts['COMMON/DURATION_COMMON'],
        useNativeDriver: false
      }).start()
    }
  }, [menuShow])

  const stationDataSource = useMemo(() => {
    return stationStore.stations.map(({ id: value, name: text }: any) => {
      return { text, value }
    })
  }, [stationStore.stations])

  return (
    <View style={[styles.header, menuShow ? styles.fullHeight : null]}>
      <StatusBar backgroundColor='#31C7A9' />
      <FadeIn show={menuShow} mask={true} onPressMask={() => { setMenuShow(false) }} />
      <View style={[styles.headerMain, styles.flexRowBetween]}>
        <Text style={[styles.headerTitle]}>{props.title}</Text>
        <View style={[styles.headerSwitch]}>
          <TouchableOpacity style={[styles.flexRow]} onPress={() => { setMenuShow(!menuShow) }}>
            <Text style={[styles.fz14, styles.crFFF, styles.fwBolder]}>站点筛选</Text>
            <Arrow direction={menuShow ? 'top' : 'bottom'} style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        </View>
      </View>
      <Animated.View style={[styles.headerMenu, { height }]}>
        <View style={[styles.pdh12]}>
          <RadioBox
            data={stationDataSource}
            value={stations}
            onChange={(arr: any) => { setStations(arr) }}
            type='checkbox'
            theme='dark'
            style={[styles.mgt10]}
          />
        </View>
      </Animated.View>
    </View>
  )
}

export default observer(Header)