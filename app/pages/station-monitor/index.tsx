import React, { useState, useEffect, useMemo } from 'react'
import { Text, View, ScrollView, processColor } from 'react-native'
import { observer } from 'mobx-react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntdProvider, AntdRangeDateTimePicker, LineCharter } from 'app/components'
import { StationHeader, GasSelector } from 'app/pages/station-monitor/components'
import { Table, TableWrapper, Cell } from 'react-native-table-component'
import { stationStore, gasStore } from 'app/stores'
import { $api } from 'app/plugins'
import dayjs from 'dayjs'
import styles from 'app/styles/pages/stationMonitor'

const StationMonitorPage = () => {
  const nowDate = dayjs().format('YYYY-MM-DD HH:mm:ss')
  const beforeDate = dayjs(nowDate).subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss')
  const [dateRange, setDateRange] = useState([beforeDate, nowDate])

  const initGasData = {
    dataSets: [],
    valueFormatter: [],
    chartDescription: {},
    yAxisLeft: {}
  }
  const [gasData, setGasData] = useState(initGasData)

  const initTableData = [
    [{ text: '最大值' }, { text: '-' }, { text: '最小值' }, { text: '-' }],
    [{ text: '平均值' }, { text: '-' }, { text: '预警值' }, { text: '-' }],
    [{ text: '报警值' }, { text: '-' }, { text: '-' }, { text: '-' }]
  ]
  const [tableData, setTableData]: any = useState(initTableData)

  const requestParams = useMemo(() => {
    if (stationStore.value !== undefined && gasStore.value !== undefined) {
      return {
        siteId: stationStore.value,
        stenchTypeId: gasStore.value,
        startTime: dateRange[0],
        endTime: dateRange[1]
      }
    }
    return null
  }, [stationStore.value, gasStore.value, dateRange])

  useEffect(() => {
    if (requestParams) {
      Promise.all([
        $api['station/getGasDetail'](requestParams),
        $api['station/getGasData'](requestParams)
      ]).then((datas: any) => {
        // 表格数据
        const gasDetail = datas[0][0]
        if (gasDetail) {
          const { maxValue, minValue, avgValue, preAlarmValue, alarmValue } = gasDetail
          const maxValStyle = alarmValue && (maxValue > alarmValue) ? styles.tableAlarmText : (preAlarmValue && (maxValue > preAlarmValue) ? styles.tableWarnText : styles.tableCellText)
          const minValStyle = alarmValue && (minValue > alarmValue) ? styles.tableAlarmText : (preAlarmValue && (minValue > preAlarmValue) ? styles.tableWarnText : styles.tableCellText)
          setTableData([
            [{ text: '最大值' }, { text: maxValue, textStyle: maxValStyle }, { text: '最小值' }, { text: minValue, textStyle: minValStyle }],
            [{ text: '平均值' }, { text: avgValue }, { text: '预警值' }, { text: preAlarmValue }],
            [{ text: '报警值' }, { text: alarmValue }, { text: '-' }, { text: '-' }]
          ])
        } else {
          setTableData(initTableData)
        }
        // 图表数据
        const gasData = datas[1]
        if (gasData.length) {
          const targetData: any = {
            dataSets: [
              {
                values: gasData.map((item: any) => item.value),
                label: `${gasDetail?.stenchTypeName || '监测气体'}`,
                config: {
                  drawFilled: true, // 是否显示填充
                  fillColor: processColor('#A6CEE3'), // 填充颜色
                }
              }
            ],
            valueFormatter: gasData.map((item: any) => dayjs(item.time).format('HH:mm')),
            chartDescription: {
              text: gasDetail?.unit
            },
            yAxisLeft: {}
          }
          if (gasDetail?.preAlarmValue) {
            !targetData.yAxisLeft.limitLines && (targetData.yAxisLeft.limitLines = [])
            targetData.yAxisLeft.limitLines.push({
              limit: gasDetail.preAlarmValue,
              label: `预警值：${gasDetail.preAlarmValue}`,
              labelPosition: 'RIGHT_BOTTOM',
              lineColor: processColor('#F58E08'),
              lineWidth: 2,
              valueTextColor: processColor('#F58E08'),
              valueFont: 10,
              lineDashPhase: 15,
              lineDashLengths: [30, 30]
            })
          }
          if (gasDetail?.alarmValue) {
            !targetData.yAxisLeft.limitLines && (targetData.yAxisLeft.limitLines = [])
            targetData.yAxisLeft.limitLines.push({
              limit: gasDetail.alarmValue,
              label: `报警值：${gasDetail.alarmValue}`,
              labelPosition: 'RIGHT_TOP',
              lineColor: processColor('#B90303'),
              lineWidth: 2,
              valueTextColor: processColor('#B90303'),
              valueFont: 10
            })
          }
          setGasData(targetData)
        } else {
          setGasData(initGasData)
        }
      })
    }
  }, [requestParams])

  return (
    <SafeAreaView style={styles.flex1}>
      <AntdProvider>
        <StationHeader title='站点监测' />
        <View style={[styles.container, styles.bgMain, styles.fullParent]}>
          <GasSelector />
          <ScrollView style={[styles.flex1]}>
            <View style={[styles.flexRow, styles.mgt12]}>
              <Text style={[styles.fz12, styles.cr000, styles.mgr8]}>选择时间：</Text>
              <AntdRangeDateTimePicker
                value={dateRange}
                onChange={setDateRange}
                autoFixType='hour'
                overloadTime={1}
                overloadType='day'
                style={styles.timePicker}
              />
            </View>
            <View style={[styles.chartZone, styles.mgt16]}>
              <LineCharter
                chartDescription={gasData.chartDescription}
                dataSets={gasData.dataSets}
                xAxisValueFormatter={gasData.valueFormatter}
                yAxisLeft={gasData.yAxisLeft}
              />
            </View>
            <Table style={styles.table} borderStyle={styles.tableBolder}>
              {
                tableData.map((rowData: any, index: number) => (
                  <TableWrapper key={`row_${index}`} style={styles.tableRow}>
                    {
                      rowData.map((cellData: any, cellIndex: number) => (
                        <Cell
                          key={cellIndex}
                          data={cellData.text}
                          textStyle={cellData.textStyle || styles.tableCellText}
                        />
                      ))
                    }
                  </TableWrapper>
                ))
              }
            </Table>
          </ScrollView>
        </View>
      </AntdProvider>
    </SafeAreaView>
  )
}

export default observer(StationMonitorPage)
