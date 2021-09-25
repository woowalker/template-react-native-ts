import React, { useState, useEffect } from 'react'
import { Text, View, StatusBar, Animated, ScrollView, TouchableOpacity } from 'react-native'
import { observer } from 'mobx-react'
import { FadeIn, Arrow } from 'app/components'
import { stationStore } from 'app/stores'
import { $consts } from 'app/plugins'
import styles from 'app/styles/pages/stationMonitor'

type Props = {
  title: string,
  onChange?: Function
}

const Header = (props: Props) => {
  const [menuShow, setMenuShow] = useState(false)
  const [height] = useState(new Animated.Value(0))

  // 获取可用站点
  useEffect(() => {
    stationStore.getStations()
  }, [])

  useEffect(() => {
    if (menuShow) {
      Animated.timing(height, {
        toValue: 64,
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

  const handleStationSelect = (value: string | number) => {
    stationStore.setValue(value)
    setMenuShow(false)
    props.onChange instanceof Function && props.onChange(value)
  }

  const currAction = stationStore.stations.find((item: any) => item.id === stationStore.value)
  return (
    <View style={[styles.header, menuShow ? styles.fullHeight : null]}>
      <StatusBar backgroundColor='#31C7A9' />
      <FadeIn show={menuShow} mask={true} onPressMask={() => { setMenuShow(false) }} />
      <View style={[styles.headerMain, styles.flexRowBetween]}>
        <Text style={[styles.headerTitle]}>{props.title}</Text>
        <View style={[styles.headerSwitch]}>
          <TouchableOpacity style={[styles.flexRow]} onPress={() => { setMenuShow(!menuShow) }}>
            <Text style={[styles.fz14, styles.crFFF, styles.fwBolder]}>{currAction?.name}</Text>
            <Arrow direction={menuShow ? 'top' : 'bottom'} style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        </View>
      </View>
      <Animated.View style={[styles.headerMenu, { height }]}>
        <View style={[styles.mgt20]}>
          <ScrollView horizontal={true} contentContainerStyle={[styles.pdh12]}>
            {
              stationStore.stations.map((item: any, index: number) => {
                return (
                  <TouchableOpacity
                    key={`${item.id}_${index}`}
                    onPress={() => handleStationSelect(item.id)}
                    style={[index !== stationStore.stations.length - 1 ? styles.mgr20 : null]}
                  >
                    <View style={[styles.pdh8, styles.pdv6, styles.boxRadius4, styles.bgWhite]}>
                      <Text style={[styles.fz12, styles.cr999, item.id === stationStore.value ? styles.headerActiveMenu : null]}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                )
              })
            }
          </ScrollView>
        </View>
      </Animated.View>
    </View>
  )
}

export default observer(Header)