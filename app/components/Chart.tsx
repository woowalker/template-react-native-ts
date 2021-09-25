import React, { useMemo } from 'react'
import { View, Text, processColor } from 'react-native'
import {
  LineChart,
  LineData,
  BarChart,
  BarData,
  PieChart,
  PieData,
  ChartDescription,
  ChartLegend,
  Color,
  xAxis,
  yAxis
} from 'react-native-charts-wrapper'
import { IFComponent } from 'app/components'
import styles from 'app/styles/components/chart'

type DateSets = {
  label?: string,
  values: string[] | number[] | { label?: string, value: string | number }[],
  config?: any
}

type Props = {
  dataSets: DateSets[],
  chartDescription?: ChartDescription,
  legend?: ChartLegend,
  marker?: {
    enabled?: boolean | undefined
    digits?: number | undefined
    markerColor?: Color | undefined
    textColor?: Color | undefined
    textSize?: number | undefined
  } | undefined
}

type PieChartProps = Props & {
  pieColors?: string[],
  highlights?: { x: number }[]
}
const presetPieColors = ['#F9517D', '#FFC45E', '#25C4AC', '#389E0D']
const PieCharter = (props: PieChartProps) => {
  const options = useMemo(() => {
    const pieOptions = {
      chartDescription: {
        text: ' ',
        textSize: 10,
        textColor: processColor('#333333'),
        positionX: 100,
        positionY: 10,
        ...props.chartDescription
      },
      legend: {
        enabled: true,
        textSize: 10,
        horizontalAlignment: 'RIGHT',
        verticalAlignment: 'TOP',
        orientation: 'HORIZONTAL',
        form: 'CIRCLE',
        formSize: 10,
        wordWrapEnabled: true
      },
      marker: {
        enabled: false
      }
    }

    // 空数据
    if (!props.dataSets.length) {
      return {
        ...pieOptions,
        data: {
          dataSets: []
        }
      }
    }

    // 存在数据
    const colors = props.pieColors || presetPieColors
    return {
      ...pieOptions,
      data: {
        // dateSets: [
        //   {
        //     values: [{ label: '用电', value: 100 }, { label: '用气', value: 185 }],
        //     config: { drawValues: false, colors: [processColor('red')] }
        //   }
        // ],
        dataSets: props.dataSets.map(item => {
          const { values } = item
          return {
            ...item,
            config: {
              colors: values.map((v, i) => processColor(colors[i % colors.length])),
              drawValues: true,
              valueTextSize: 10,
              valueTextColor: processColor('#333333'),
              valueFormatter: "#.#'%'", // 按百分比显示，比如：15.3%
              sliceSpace: 2, // 饼块之间的距离
              selectionShift: 6, // 饼图选中时，偏离饼图中心的距离
              // xValuePosition: 'OUTSIDE_SLICE', // INSIDE_SLICE: 值显示在饼块上, OUTSIDE_SLICE: 值显示在饼块外
              // yValuePosition: 'OUTSIDE_SLICE', // INSIDE_SLICE: 值显示在饼块上, OUTSIDE_SLICE: 值显示在饼块外
              // valueLineColor: processColor('green'), // OUTSIDE_SLICE 时候，连接线的颜色
              // valueLinePart1Length: 0.5, // OUTSIDE_SLICE 时候，连接线的长度
              ...item.config
            }
          }
        })
      }
    }
  }, [props.dataSets, props.chartDescription, props.pieColors])

  return (
    <View style={[styles.fullParent, styles.posRelative]}>
      <PieChart
        key={JSON.stringify(options.data)} // 确保图表能正确渲染
        data={options.data as PieData}
        legend={options.legend as ChartLegend}
        marker={options.marker}
        chartDescription={options.chartDescription}
        drawEntryLabels={false} // 显示饼块的 label
        usePercentValues={true}
        holeRadius={30} // 饼图中空区域
        holeColor={processColor('#f0f0f0')}
        transparentCircleRadius={34} // 饼图中空区域透明包边
        transparentCircleColor={processColor('#f0f0f088')}
        highlights={props.highlights} // 高亮哪块饼块
        style={[styles.fullParent]}
      />
      <IFComponent IF={!options.data.dataSets.length}>
        <View style={[styles.empty, styles.flexCenter]}>
          <Text style={[styles.fz14, styles.cr999]}>暂无数据</Text>
        </View>
      </IFComponent>
    </View>
  )
}

type LineBarProps = Props & {
  xAxisValueFormatter: string[] | number[],
  yAxisLeft?: yAxis,
  yAxisRight?: yAxis
}

type BarChartProps = LineBarProps & {
  barColors?: string[]
}
const presetBarColors = ['#8383EE', '#6FFD4A', '#757E72', '#5D9352', '#6AAE11', '#A6CEE3', '#31C7A9']
const GroupBarCharter = (props: BarChartProps) => {
  const options = useMemo(() => {
    const barOptions = {
      chartDescription: {
        text: ' ',
        textSize: 10,
        textColor: processColor('#333333'),
        positionX: 100,
        positionY: 10,
        ...props.chartDescription
      },
      legend: {
        enabled: true,
        textSize: 10,
        horizontalAlignment: 'RIGHT',
        verticalAlignment: 'TOP',
        orientation: 'HORIZONTAL',
        form: 'CIRCLE',
        formSize: 10,
        wordWrapEnabled: true
      },
      xAxis: {
        position: 'BOTTOM',
        drawGridLines: false,
        centerAxisLabels: true,
        granularity: 1,
        granularityEnabled: true
      },
      yAxis: {
        left: {
          drawGridLines: false,
          axisMinimum: 0,
          spaceTop: 14,
          ...props.yAxisLeft
        },
        right: {
          enabled: false
        }
      },
      visibleRange: {
        x: { min: 0, max: 5 }
      },
      marker: {
        enabled: true,
        markerColor: processColor('#31c7a999'),
        textColor: processColor('black'),
        textSize: 14,
        ...props.marker
      }
    }

    // 空数据
    if (!props.dataSets.length) {
      return {
        ...barOptions,
        data: {
          dataSets: []
        }
      }
    }

    // 存在数据
    const gapBase = 1 / (3 * props.dataSets.length + 2)
    const colors = props.barColors || presetBarColors
    return {
      ...barOptions,
      data: {
        // dateSets: [
        //   {
        //     values: [100, 105, 102, 115, 114, 109, 105],
        //     label: '新阳',
        //     config: { drawValues: false, colors: [processColor('red')] }
        //   },
        //   {
        //     values: [80, 82, 94, 60, 99, 75, 77],
        //     label: '蛇口',
        //     config: { drawValues: false, colors: [processColor('red')] }
        //   }
        // ],
        dataSets: props.dataSets.map((item, index) => {
          return {
            ...item,
            config: {
              drawValues: false,
              colors: [processColor(colors[index % colors.length])],
              ...item.config
            }
          }
        }),
        config: {
          /**
           * 需要满足 (barWidth + barSpace) * n + groupSpace = 1，label 才会居中对齐
           * 假设 barWidth = groupSpace = barSpace
           * 那么就有 (2x + x) * n + 2x = 1
           * 可得 (3n + 2)x = 1
           * 其中，n 为柱子的数量，x 为需要设置的值
           */
          barWidth: gapBase * 2,
          group: {
            fromX: 0,
            groupSpace: gapBase * 2,
            barSpace: gapBase
          }
        }
      },
      xAxis: {
        ...barOptions.xAxis,
        valueFormatter: props.xAxisValueFormatter, // ['周一', '周二', '周三', '周四', '周五']
        axisMinimum: 0,
        axisMaximum: props.xAxisValueFormatter.length
      }
    }
  }, [props.dataSets, props.xAxisValueFormatter, props.chartDescription, props.barColors])

  return (
    <View style={[styles.fullParent, styles.posRelative]}>
      <BarChart
        key={JSON.stringify(options.data)} // 确保图表能正确渲染
        data={options.data as BarData}
        xAxis={options.xAxis as xAxis}
        yAxis={options.yAxis}
        legend={options.legend as ChartLegend}
        marker={options.marker}
        visibleRange={options.visibleRange}
        chartDescription={options.chartDescription}
        style={[styles.fullParent]}
      />
      <IFComponent IF={!options.data.dataSets.length}>
        <View style={[styles.empty, styles.flexCenter]}>
          <Text style={[styles.fz14, styles.cr999]}>暂无数据</Text>
        </View>
      </IFComponent>
    </View>
  )
}

const BarCharter = (props: BarChartProps) => {
  const options = useMemo(() => {
    const barOptions = {
      chartDescription: {
        text: ' ',
        textSize: 10,
        textColor: processColor('#333333'),
        positionX: 100,
        positionY: 10,
        ...props.chartDescription
      },
      legend: {
        enabled: true,
        textSize: 10,
        horizontalAlignment: 'RIGHT',
        verticalAlignment: 'TOP',
        orientation: 'HORIZONTAL',
        form: 'CIRCLE',
        formSize: 10,
        wordWrapEnabled: true
      },
      xAxis: {
        position: 'BOTTOM',
        drawGridLines: false,
        granularity: 1,
        granularityEnabled: true
      },
      yAxis: {
        left: {
          drawGridLines: false,
          axisMinimum: 0,
          spaceTop: 14,
          ...props.yAxisLeft
        },
        right: {
          enabled: false
        }
      },
      visibleRange: {
        x: { min: 0, max: 5 }
      },
      marker: {
        enabled: true,
        markerColor: processColor('#31c7a999'),
        textColor: processColor('black'),
        textSize: 14,
        ...props.marker
      }
    }

    // 空数据
    if (!props.dataSets.length) {
      return {
        ...barOptions,
        data: {
          dataSets: []
        }
      }
    }

    // 存在数据
    const colors = props.barColors || presetBarColors
    return {
      ...barOptions,
      data: {
        // dateSets: [
        //   {
        //     values: [100, 105, 102, 115, 114, 109, 105],
        //     label: '新阳',
        //     config: { drawValues: false, colors: [processColor('red')] }
        //   },
        //   {
        //     values: [80, 82, 94, 60, 99, 75, 77],
        //     label: '蛇口',
        //     config: { drawValues: false, colors: [processColor('red')] }
        //   }
        // ],
        dataSets: props.dataSets.map((item, index) => {
          return {
            ...item,
            config: {
              colors: [processColor(colors[index % colors.length])],
              drawValues: false,
              ...item.config
            }
          }
        })
      },
      xAxis: {
        ...barOptions.xAxis,
        valueFormatter: props.xAxisValueFormatter // ['周一', '周二', '周三', '周四', '周五']
      }
    }
  }, [props.dataSets, props.xAxisValueFormatter, props.chartDescription, props.barColors])

  return (
    <View style={[styles.fullParent, styles.posRelative]}>
      <BarChart
        key={JSON.stringify(options.data)} // 确保图表能正确渲染
        data={options.data as BarData}
        xAxis={options.xAxis as xAxis}
        yAxis={options.yAxis}
        legend={options.legend as ChartLegend}
        marker={options.marker}
        visibleRange={options.visibleRange}
        chartDescription={options.chartDescription}
        style={[styles.fullParent]}
      />
      <IFComponent IF={!options.data.dataSets.length}>
        <View style={[styles.empty, styles.flexCenter]}>
          <Text style={[styles.fz14, styles.cr999]}>暂无数据</Text>
        </View>
      </IFComponent>
    </View>
  )
}

type LineChartProps = LineBarProps & {
  lineColors?: string[]
}
const presetLineColors = ['#A6CEE3']
const LineCharter = (props: LineChartProps) => {
  const options = useMemo(() => {
    const lineOptions = {
      chartDescription: {
        text: ' ',
        textSize: 10,
        textColor: processColor('#333333'),
        positionX: 100,
        positionY: 0,
        ...props.chartDescription
      },
      legend: {
        enabled: true,
        textSize: 10,
        horizontalAlignment: 'RIGHT',
        verticalAlignment: 'TOP',
        orientation: 'HORIZONTAL',
        form: 'CIRCLE',
        formSize: 10,
        wordWrapEnabled: true,
        ...props.legend
      },
      xAxis: {
        position: 'BOTTOM',
        drawGridLines: false,
        granularity: 1,
        granularityEnabled: true
      },
      yAxis: {
        left: {
          drawGridLines: true,
          axisMinimum: 0,
          spaceTop: 14,
          ...props.yAxisLeft
        },
        right: {
          enabled: false,
          ...props.yAxisRight
        }
      },
      visibleRange: {
        x: { min: 0, max: 7 }
      },
      marker: {
        enabled: false,
        ...props.marker
      }
    }

    // 空数据
    if (!props.dataSets.length) {
      return {
        ...lineOptions,
        data: {
          dataSets: []
        }
      }
    }

    // 存在数据
    const colors = props.lineColors || presetLineColors
    return {
      ...lineOptions,
      data: {
        // dateSets: [
        //   {
        //     values: [100, 105, 102, 115, 114, 109, 105],
        //     label: '新阳',
        //     config: { colors: [processColor('red')] }
        //   }
        // ],
        dataSets: props.dataSets.map((item, index) => {
          return {
            ...item,
            config: {
              mode: 'HORIZONTAL_BEZIER', // LINEAR：直线 STEPPED：折线 CUBIC_BEZIER：贝茨曲线 HORIZONTAL_BEZIER：平滑曲线
              lineWidth: 2, // 线宽
              colors: [processColor(colors[index % colors.length])], // 线条颜色
              drawValues: true, // 线上是否显示数值
              valueFormatter: '#.###',
              valueTextSize: 10, // 线上数值字体大小
              // drawFilled: true, // 是否显示填充
              // fillColor: processColor('#A6CEE3'), // 填充颜色
              drawCircles: true, // 是否显示拐点
              circleColor: processColor('#A6CEE3'), // 拐点颜色
              circleRadius: 3, // 拐点大小
              drawCircleHole: true, // 拐点是否实心
              circleHoleColor: processColor('#A6CEE3'), // 实心拐点颜色
              ...item.config
            }
          }
        })
      },
      xAxis: {
        ...lineOptions.xAxis,
        valueFormatter: props.xAxisValueFormatter // ['周一', '周二', '周三', '周四', '周五']
      }
    }
  }, [props.dataSets, props.xAxisValueFormatter, props.chartDescription, props.lineColors])

  return (
    <View style={[styles.fullParent, styles.posRelative]}>
      <LineChart
        key={JSON.stringify(options.data)} // 确保图表能正确渲染
        data={options.data as LineData}
        xAxis={options.xAxis as xAxis}
        yAxis={options.yAxis}
        legend={options.legend as ChartLegend}
        marker={options.marker}
        visibleRange={options.visibleRange}
        chartDescription={options.chartDescription}
        style={[styles.fullParent]}
      />
      <IFComponent IF={!options.data.dataSets.length}>
        <View style={[styles.empty, styles.flexCenter]}>
          <Text style={[styles.fz14, styles.cr999]}>暂无数据</Text>
        </View>
      </IFComponent>
    </View>
  )
}

export { PieCharter, BarCharter, GroupBarCharter }
export default LineCharter