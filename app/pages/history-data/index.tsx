import React, { useState, useMemo, useEffect } from 'react'
import { Text, View, ScrollView, processColor } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { observer } from 'mobx-react'
import {
  Title,
  RadioBox,
  LineCharter,
  IFComponent,
  AntdProvider,
  AntdRangeDateTimePicker,
  AntdRangeDatePicker,
  AntdRangeMonthPicker
} from 'app/components'
import { StationHeader, GasSelector } from 'app/pages/station-monitor/components'
import { stationStore, gasStore } from 'app/stores'
import { $consts, $api } from 'app/plugins'
import dayjs from 'dayjs'
import styles from 'app/styles/pages/historyData'

const HistoryDataPage = () => {
  const nowTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
  // 小时查询
  const beforeTime = dayjs(nowTime).subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss')
  const [timeRange, setTimeRange] = useState([beforeTime, nowTime])
  // 日期查询
  const beforeDate = dayjs(nowTime).subtract(1, 'month').format('YYYY-MM-DD HH:mm:ss')
  const [dateRange, setDateRange] = useState([beforeDate, nowTime])
  // 月份查询
  const beforeMonth = dayjs(nowTime).subtract(1, 'year').format('YYYY-MM-DD HH:mm:ss')
  const [monthRange, setMonthRange] = useState([beforeMonth, nowTime])
  // 查询方式
  const [timeType, setTimeType] = useState($consts['STATION/QUERY_TYPE_HOUR'])
  const [dateType, setDataType] = useState($consts['STATION/DATA_TYPE_AVERAGE'])
  // 图表数据
  const initChartData = {
    dataSets: [],
    valueFormatter: [],
    chartDescription: {},
    yAxisLeft: {}
  }
  const [chartAttach, setChartAttach] = useState({ maxValue: 0, minValue: 0, avgValue: 0 })
  const [chartData, setChartData] = useState(initChartData)

  const targetRange = useMemo(() => {
    let range = timeRange
    let formatType = 'HH:mm'
    switch (timeType) {
      case $consts['STATION/QUERY_TYPE_DATE']:
        range = dateRange
        formatType = 'MM-DD'
        break
      case $consts['STATION/QUERY_TYPE_MONTH']:
        range = monthRange
        formatType = 'YY-MM'
        break
    }
    return { range, formatType }
  }, [timeType, timeRange, dateRange, monthRange])

  const requestParams = useMemo(() => {
    if (stationStore.value !== undefined && gasStore.value !== undefined) {
      const gas = gasStore.gases.find((item: any) => item.id === gasStore.value)
      return {
        siteId: stationStore.value,
        stenchTypeId: gas.id,
        stenchTypeName: gas.name,
        stenchUnit: gas.unit,
        startTime: targetRange.range[0],
        endTime: targetRange.range[1],
        timeRangeType: timeType,
        queryType: dateType,
        formatType: targetRange.formatType
      }
    }
    return null
  }, [stationStore.value, gasStore.value, timeType, targetRange, dateType])

  useEffect(() => {
    if (requestParams) {
      $api['history/getHistoryData'](requestParams).then((res: any) => {
        const { maxValue, minValue, avgValue, preWarnValue, warnValue, points } = res
        setChartAttach({ maxValue, minValue, avgValue })
        if (points.length) {
          const targetData: any = {
            dataSets: [
              {
                values: points.map((item: any) => item.numValue),
                label: requestParams.stenchTypeName,
                config: {
                  drawFilled: true, // 是否显示填充
                  fillColor: processColor('#A6CEE3'), // 填充颜色
                }
              }
            ],
            valueFormatter: points.map((item: any) => dayjs(item.time).format(requestParams.formatType)),
            chartDescription: {
              text: requestParams.stenchUnit
            },
            yAxisLeft: {}
          }
          if (preWarnValue) {
            !targetData.yAxisLeft.limitLines && (targetData.yAxisLeft.limitLines = [])
            targetData.yAxisLeft.limitLines.push({
              limit: preWarnValue,
              label: `预警值：${preWarnValue}`,
              labelPosition: 'RIGHT_BOTTOM',
              lineColor: processColor('#F58E08'),
              lineWidth: 2,
              valueTextColor: processColor('#F58E08'),
              valueFont: 10,
              lineDashPhase: 15,
              lineDashLengths: [30, 30]
            })
          }
          if (warnValue) {
            !targetData.yAxisLeft.limitLines && (targetData.yAxisLeft.limitLines = [])
            targetData.yAxisLeft.limitLines.push({
              limit: warnValue,
              label: `报警值：${warnValue}`,
              labelPosition: 'RIGHT_TOP',
              lineColor: processColor('#B90303'),
              lineWidth: 2,
              valueTextColor: processColor('#B90303'),
              valueFont: 10
            })
          }
          setChartData(targetData)
        } else {
          setChartData(initChartData)
        }
      })
    }
  }, [requestParams])

  const searchTitle = useMemo(() => {
    const find = $consts['STATION/QUERY_TYPE'].find((item: any) => item.value === timeType)
    return `${find.text}查询`
  }, [timeType])

  return (
    <SafeAreaView style={styles.flex1}>
      <AntdProvider>
        <StationHeader title='历史数据' />
        <View style={[styles.container, styles.bgMain, styles.fullParent]}>
          <GasSelector />
          <View style={[styles.mgt12]}>
            <Text style={[styles.fz14, styles.cr000]}>查询方式选择：</Text>
            <View style={[styles.flexRow, styles.mgt8]}>
              <Text>时间类型：</Text>
              <RadioBox
                data={$consts['STATION/QUERY_TYPE']}
                value={[timeType]}
                onChange={(arr: [any]) => { setTimeType(arr[0]) }}
                style={[styles.flex1]}
              />
            </View>
            <View style={[styles.flexRow, styles.mgt8]}>
              <Text>数据类型：</Text>
              <RadioBox
                data={$consts['STATION/DATA_TYPE']}
                value={[dateType]}
                onChange={(arr: [any]) => { setDataType(arr[0]) }}
              />
            </View>
          </View>
          <ScrollView style={[styles.flex1]}>
            <Title title={searchTitle} style={[styles.mgt12, styles.mgb8]} />
            <IFComponent IF={timeType === $consts['STATION/QUERY_TYPE_HOUR']}>
              <AntdRangeDateTimePicker
                value={timeRange}
                onChange={setTimeRange}
                style={styles.timePicker}
              />
            </IFComponent>
            <IFComponent IF={timeType === $consts['STATION/QUERY_TYPE_DATE']}>
              <AntdRangeDatePicker
                value={dateRange}
                onChange={setDateRange}
                style={styles.timePicker}
              />
            </IFComponent>
            <IFComponent IF={timeType === $consts['STATION/QUERY_TYPE_MONTH']}>
              <AntdRangeMonthPicker
                value={monthRange}
                onChange={setMonthRange}
                style={styles.timePicker}
              />
            </IFComponent>
            <View style={[styles.chartZone, styles.posRelative]}>
              <LineCharter
                chartDescription={chartData.chartDescription}
                dataSets={chartData.dataSets}
                xAxisValueFormatter={chartData.valueFormatter}
                yAxisLeft={chartData.yAxisLeft}
              />
              <View style={[styles.chartAttach]}>
                <Text style={[styles.fz10, styles.cr333]}>{`最大值：${chartAttach.maxValue} 最小值：${chartAttach.minValue} 平均值：${chartAttach.avgValue}`}</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </AntdProvider>
    </SafeAreaView>
  )
}

export default observer(HistoryDataPage)
