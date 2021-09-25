import React, { useState, useEffect } from 'react'
import { Text, View, processColor } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HomeHeader } from 'app/pages/home/components'
import { Title, Card, LineCharter, Scroller, CollapseText } from 'app/components'
import { $api } from 'app/plugins'
import dayjs from 'dayjs'
import styles from 'app/styles/pages/home'

const colors = ['#ff4d4f', '#ffa940', '#9254de', '#73d13d', '#40a9ff']
const HomePage = ({ navigation }: any) => {
  const [state, setState] = useState({ dataSets: [], valueFormatter: [], chartDescription: {} })

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      $api['home/getGasTrend']().then((res: any) => {
        if (res.length) {
          const dataSets = [] as any
          const valueFormatter = [] as any
          let chartDescription = {}
          res.forEach(({ siteName, time, value, unit }: any) => {
            const presetDataSet = {
              values: [],
              label: siteName,
              config: {
                drawValues: false
              }
            }
            const findIndex = dataSets.findIndex((item: any) => item.label === siteName)
            const find = findIndex === -1 ? presetDataSet : dataSets[findIndex]
            findIndex === -1 && dataSets.push(find)
            // values
            find.values.push(value)
            // config
            const nowIndex = findIndex === -1 ? dataSets.length - 1 : findIndex
            const presetColor = processColor(colors[nowIndex % colors.length])
            find.config = {
              ...find.config,
              colors: [presetColor], // 线条颜色
              drawFilled: true, // 是否显示填充
              fillColor: presetColor, // 填充颜色
              circleColor: presetColor,
              circleHoleColor: presetColor
            }
            // valueFormatter
            const day = dayjs(time).format('MM-DD')
            valueFormatter.indexOf(day) === -1 && valueFormatter.push(day)
            // 图例描述
            chartDescription = {
              text: unit
            }
          })
          setState({ dataSets, valueFormatter, chartDescription })
        } else {
          setState({ dataSets: [], valueFormatter: [], chartDescription: {} })
        }
      })
    })

    return unsubscribe
  }, [navigation])

  const RenderItem = (props: any) => {
    const { data } = props
    const titleStyles = [styles.fz12, styles.cr333, { width: 54, lineHeight: 17 }]
    const detailStyles = [styles.fz12, styles.cr333, { lineHeight: 17 }, styles.pdl8]
    return (
      <Card style={[styles.mgh12]}>
        <View style={[styles.flexRowFSFS, styles.mgb8]}>
          <Text style={[...titleStyles]}>事件单号</Text>
          <Text style={[...detailStyles]}>{data.orderNo}</Text>
        </View>
        <View style={[styles.flexRowFSFS, styles.mgb8]}>
          <Text style={[...titleStyles]}>发起时间</Text>
          <Text style={[...detailStyles]}>{data.orderTime}</Text>
        </View>
        <View style={[styles.flexRowFSFS, styles.mgb8]}>
          <Text style={[...titleStyles]}>站点名称</Text>
          <Text style={[...detailStyles, styles.crMain]}>{data.siteName}</Text>
        </View>
        <View style={[styles.flexRowFSFS, styles.mgb8]}>
          <Text style={[...titleStyles]}>事件原因</Text>
          <CollapseText numberOfLines={2} textStyle={detailStyles}>{data.message}</CollapseText>
        </View>
        <View style={[styles.flexRowFSFS, styles.mgb8]}>
          <Text style={[...titleStyles]}>响应措施</Text>
          <Text style={[...detailStyles]}>{data.typeName}</Text>
        </View>
      </Card>
    )
  }

  const getData = (pagination: any) => {
    return $api['home/getAlarmEvts'](pagination)
  }

  return (
    <SafeAreaView style={styles.flex1}>
      <HomeHeader />
      <View style={[styles.container, styles.bgMain, styles.fullParent]}>
        <View style={[styles.pdh12]}>
          <Title title='海沧区恶臭浓度趋势' />
          <View style={[styles.chartZone]}>
            <LineCharter
              chartDescription={state.chartDescription}
              marker={{
                enabled: true,
                markerColor: processColor('#31c7a999'),
                textColor: processColor('black'),
                textSize: 14
              }}
              dataSets={state.dataSets}
              xAxisValueFormatter={state.valueFormatter}
            />
          </View>
          <Title title='报警事件单' color='#6CC3F4' />
        </View>
        <Scroller
          getData={getData}
          renderItem={({ item }) => <RenderItem data={item} />}
          style={[styles.flex1, styles.mgt10]}
        />
      </View>
    </SafeAreaView>
  )
}

export default HomePage
