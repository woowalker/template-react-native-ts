import React, { useState, useMemo, useEffect } from 'react'
import { Text, View, processColor } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AlarmHeader } from 'app/pages/station-alarm/components'
import { Title, Card, Scroller, IFComponent, AntdProvider, AntdRangeDateTimePicker, GroupBarCharter } from 'app/components'
import { $api, $consts } from 'app/plugins'
import dayjs from 'dayjs'
import styles from 'app/styles/pages/stationAlarm'

const StationAlarmPage = () => {
  const nowDate = dayjs().format('YYYY-MM-DD HH:mm:ss')
  const beforeDate = dayjs(nowDate).subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss')
  const [dateRange, setDateRange] = useState([beforeDate, nowDate])
  const [siteIds, setSiteIds] = useState()

  const [state, setState] = useState({ dataSets: [], valueFormatter: [] })

  const requestParams = useMemo(() => {
    if (siteIds) {
      return {
        siteIds,
        startTime: dateRange[0],
        endTime: dateRange[1]
      }
    }
    return null
  }, [dateRange, siteIds])

  useEffect(() => {
    if (requestParams) {
      $api['station/getAlarmData'](requestParams).then((res: any) => {
        if (res.length) {
          const dataSets = [
            { values: [], label: '超标报警', config: { colors: [processColor('#B90303')] } },
            { values: [], label: '超标预警', config: { colors: [processColor('#F58E08')] } }
          ] as any
          const valueFormatter = [] as any
          res.forEach(({ siteName, alarmCountDetailList = [] }: any) => {
            alarmCountDetailList.forEach((item: any) => {
              if (item.alarmType === $consts['STATION/ALARM_TYPE_ALARM']) {
                // 超标报警
                dataSets[0].values.push(item.alarmCount)
              } else {
                // 超标预警
                dataSets[1].values.push(item.alarmCount)
              }
            })
            valueFormatter.push(siteName)
          })
          setState({ dataSets, valueFormatter })
        } else {
          setState({ dataSets: [], valueFormatter: [] })
        }
      })
    }
  }, [requestParams])

  const getData = (pagination: any) => {
    return $api['station/getAlarmInfos']({
      ...pagination,
      ...requestParams
    })
  }

  const RenderItem = (props: any) => {
    const { data } = props
    const titleStyles = [styles.fz12, styles.cr333, { width: 54, lineHeight: 17 }]
    const detailStyles = [styles.fz12, styles.cr333, { lineHeight: 17 }, styles.pdl8]
    const alarmType = $consts['STATION/ALARM_TYPE'].find((item: any) => item.value === data.alarmType)
    const alarmStatus = $consts['STATION/ALARM_STATUS'].find((item: any) => item.value === data.status)
    let alarmStatusColor
    switch (alarmStatus?.value) {
      case $consts['STATION/ALARM_STATUS_SEND']:
        alarmStatusColor = '#F46B69'
        break
      case $consts['STATION/ALARM_STATUS_SUBMIT']:
        alarmStatusColor = '#F6D50F'
        break
      case $consts['STATION/ALARM_STATUS_CONFIRM']:
        alarmStatusColor = '#0376B6'
        break
      case $consts['STATION/ALARM_STATUS_DISMISS']:
        alarmStatusColor = '#00BC1E'
        break
      default:
        alarmStatusColor = '#B90303'
        break
    }
    return (
      <Card style={[styles.mgh12]}>
        <View style={[styles.flexRowFSFS, styles.mgb8]}>
          <Text style={[...titleStyles]}>站点名称</Text>
          <Text style={[...detailStyles]}>{data.siteName}</Text>
        </View>
        <View style={[styles.flexRowFSFS, styles.mgb8]}>
          <Text style={[...titleStyles]}>报警时间</Text>
          <Text style={[...detailStyles]}>{data.createTime}</Text>
        </View>
        <View style={[styles.flexRowFSFS, styles.mgb8]}>
          <Text style={[...titleStyles]}>报警类型</Text>
          <Text style={[...detailStyles, { color: alarmType?.value === $consts['STATION/ALARM_TYPE_ALARM'] ? '#B90303' : '#F58E08' }]}>{alarmType?.text}</Text>
        </View>
        <View style={[styles.flexRowFSFS, styles.mgb8]}>
          <Text style={[...titleStyles]}>报警指标</Text>
          <Text style={[...detailStyles]}>{`${data.stenchesTypeName || '无'}${data.measureUnit ? '(' + data.measureUnit + ')' : ''}`}</Text>
        </View>
        <View style={[styles.flexRowFSFS, styles.mgb8]}>
          <Text style={[...titleStyles]}>报警值</Text>
          <Text style={[...detailStyles]}>{data.value}</Text>
        </View>
        <View style={[styles.flexRowFSFS, styles.mgb8]}>
          <Text style={[...titleStyles]}>临界值</Text>
          <Text style={[...detailStyles]}>{data.criticalValue}</Text>
        </View>
        <View style={[styles.flexRowFSFS, styles.mgb8]}>
          <Text style={[...titleStyles]}>处理状态</Text>
          <Text style={[...detailStyles, { color: alarmStatusColor }]}>{alarmStatus?.text}</Text>
        </View>
      </Card>
    )
  }

  return (
    <SafeAreaView style={styles.flex1}>
      <AntdProvider>
        <AlarmHeader title='站点报警' onChange={setSiteIds} />
        <View style={[styles.container, styles.bgMain, styles.fullParent]}>
          <View style={[styles.pdh12]}>
            <View style={[styles.flexRow, styles.mgb12]}>
              <Text style={[styles.fz12, styles.cr000, styles.mgr8]}>选择时间：</Text>
              <AntdRangeDateTimePicker
                value={dateRange}
                onChange={setDateRange}
                style={styles.timePicker}
              />
            </View>
            <Title title='各站点报警预警' color='#B90303' />
            <View style={[styles.chartZone]}>
              <GroupBarCharter
                dataSets={state.dataSets}
                xAxisValueFormatter={state.valueFormatter}
                yAxisLeft={{ granularity: 1, granularityEnabled: true }}
                chartDescription={{ text: '次数' }}
              />
            </View>
            <Title title='报警信息' color='#6CC3F4' style={[styles.mgt12, styles.mgb10]} />
          </View>
          <IFComponent IF={!!requestParams}>
            <Scroller
              getData={getData}
              extraData={requestParams}
              renderItem={({ item }) => <RenderItem data={item} />}
              style={[styles.flex1]}
            />
          </IFComponent>
        </View>
      </AntdProvider>
    </SafeAreaView>
  )
}

export default StationAlarmPage
