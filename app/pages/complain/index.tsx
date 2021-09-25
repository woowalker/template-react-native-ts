import React, { useState, useEffect } from 'react'
import { Text, View, Animated } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { observer } from 'mobx-react'
import { Card, ScrollTab, Scroller, IFComponent, CollapseText } from 'app/components'
import { StationHeader } from 'app/pages/station-monitor/components'
import { stationStore } from 'app/stores'
import { $api, $consts } from 'app/plugins'
import styles from 'app/styles/pages/complain'

const ComplainPage = () => {
  const [handleType, setHandleType] = useState($consts['COMPLAIN/HANDLE_TYPE_UNSOLVE'])

  const getData = (status: number, pagination: any) => {
    return $api['complain/getComplains']({
      siteId: stationStore.value,
      status,
      ...pagination
    })
  }

  const RenderItem = (props: any) => {
    const { data } = props
    const titleStyles = [styles.fz12, styles.cr333, { width: 54, lineHeight: 17 }]
    const detailStyles = [styles.fz12, styles.cr333, { lineHeight: 17 }, styles.pdl8]
    return (
      <Card style={[styles.mgh12]}>
        <View style={[styles.flexRowFSFS, styles.mgb8]}>
          <Text style={[...titleStyles]}>站点名称</Text>
          <Text style={[...detailStyles]}>{data.siteName}</Text>
        </View>
        <View style={[styles.flexRowFSFS, styles.mgb8]}>
          <Text style={[...titleStyles]}>投诉人</Text>
          <Text style={[...detailStyles]}>{data.displayName}</Text>
        </View>
        <View style={[styles.flexRowFSFS, styles.mgb8]}>
          <Text style={[...titleStyles]}>投诉时间</Text>
          <Text style={[...detailStyles]}>{data.time}</Text>
        </View>
        <View style={[styles.flexRowFSFS, styles.mgb8]}>
          <Text style={[...titleStyles]}>投诉电话</Text>
          <Text style={[...detailStyles]}>{data.phone}</Text>
        </View>
        <View style={[styles.flexRowFSFS, styles.mgb8]}>
          <Text style={[...titleStyles]}>投诉内容</Text>
          <CollapseText numberOfLines={2} textStyle={[...detailStyles]}>{data.content}</CollapseText>
        </View>
        <View style={[styles.flexRowFSFS, styles.mgb8]}>
          <Text style={[...titleStyles]}>投诉结果</Text>
          <CollapseText numberOfLines={2} textStyle={[...detailStyles]}>{data.result}</CollapseText>
        </View>
        <View style={[styles.flexRowFSFS, styles.mgb8]}>
          <Text style={[...titleStyles]}>处理时间</Text>
          <Text style={[...detailStyles]}>{data.updateTime}</Text>
        </View>
        <View style={[styles.flexRowFSFS, styles.mgb8]}>
          <Text style={[...titleStyles]}>投诉状态</Text>
          <Text style={[...detailStyles, { color: handleType === $consts['COMPLAIN/HANDLE_TYPE_UNSOLVE'] ? '#F6D50F' : '#00BC1E' }]}>{data.statusName}</Text>
        </View>
      </Card>
    )
  }

  const [viewWidth, setViewWidth] = useState(0)
  const handleAnimatedViewLayout = (evt: any) => {
    setViewWidth(evt.nativeEvent.layout.width)
  }

  const [transXValue] = useState(new Animated.Value(0))
  useEffect(() => {
    Animated.timing(transXValue, {
      toValue: handleType === $consts['COMPLAIN/HANDLE_TYPE_UNSOLVE'] ? 0 : -viewWidth / 2,
      duration: $consts['COMMON/DURATION_ARROW_ROTATE'],
      useNativeDriver: true
    }).start()
  }, [handleType])

  return (
    <SafeAreaView style={styles.flex1}>
      <StationHeader title='投诉管理' />
      <View style={[styles.container, styles.bgMain, styles.fullParent]}>
        <ScrollTab
          data={$consts['COMPLAIN/HANDLE_TYPE']}
          value={handleType}
          onChange={setHandleType}
          scrollStyle={[styles.flexRowAround, styles.flex1]}
          fontStyle={[styles.fz14]}
        />
        <IFComponent IF={stationStore.value !== undefined}>
          <Animated.View
            onLayout={handleAnimatedViewLayout}
            style={[
              styles.animatedScroller,
              styles.flex1,
              styles.flexRow,
              styles.mgt10,
              { transform: [{ translateX: transXValue }] }
            ]}
          >
            <View style={[styles.scrollerWrap]}>
              <Scroller
                getData={(pagination: any) => getData($consts['COMPLAIN/HANDLE_TYPE_UNSOLVE'], pagination)}
                extraData={stationStore.value}
                renderItem={({ item }) => <RenderItem data={item} />}
                style={[styles.flex1]}
              />
            </View>
            <View style={[styles.scrollerWrap]}>
              <Scroller
                getData={(pagination: any) => getData($consts['COMPLAIN/HANDLE_TYPE_SOLVE'], pagination)}
                extraData={stationStore.value}
                renderItem={({ item }) => <RenderItem data={item} />}
                style={[styles.flex1]}
              />
            </View>
          </Animated.View>
        </IFComponent>
      </View>
    </SafeAreaView>
  )
}

export default observer(ComplainPage)
