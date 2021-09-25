import constMapToObj from 'app/utils/constMapToObj'

const queryType = [
  // 按小时查询
  {
    name: 'QUERY_TYPE_HOUR',
    text: '小时',
    value: 0
  },
  // 按日查询
  {
    name: 'QUERY_TYPE_DATE',
    text: '日期',
    value: 1
  },
  // 按月查询
  {
    name: 'QUERY_TYPE_MONTH',
    text: '月份',
    value: 2
  }
]

const dataType = [
  // 数据类型：最大值
  {
    name: 'DATA_TYPE_MAX',
    text: '最大值',
    value: 0
  },
  // 数据类型：最小值
  {
    name: 'DATA_TYPE_MIN',
    text: '最小值',
    value: 1
  },
   // 数据类型：平均值
   {
    name: 'DATA_TYPE_AVERAGE',
    text: '平均值',
    value: 2
  }
]

const alarmType = [
  // 报警类型：超标报警
  {
    name: 'ALARM_TYPE_ALARM',
    text: '超标报警',
    value: 1
  },
  // 报警类型：超标预警
  {
    name: 'ALARM_TYPE_PRE_ALARM',
    text: '超标预警',
    value: 0
  },
  // 报警类型：数据中断
  {
    name: 'ALARM_TYPE_BREAK',
    text: '数据中断',
    value: 2
  }
]

const alarmStatus = [
  // 报警处理状态：未处理
  {
    name: 'ALARM_STATUS_UNHANDLE',
    text: '未处理',
    value: 0
  },
  // 报警处理状态：已发送
  {
    name: 'ALARM_STATUS_SEND',
    text: '已发送',
    value: 1
  },
  // 报警处理状态：已提交
  {
    name: 'ALARM_STATUS_SUBMIT',
    text: '已提交',
    value: 2
  },
  // 报警处理状态：已确认
  {
    name: 'ALARM_STATUS_CONFIRM',
    text: '已确认',
    value: 3
  },
  // 报警处理状态：已消除
  {
    name: 'ALARM_STATUS_DISMISS',
    text: '已消除',
    value: 4
  }
]

export default [
  {
    name: 'QUERY_TYPE',
    value: queryType
  },
  {
    name: 'QUERY_TYPE_OBJ',
    value: constMapToObj(queryType)
  },
  ...queryType,
  {
    name: 'DATA_TYPE',
    value: dataType
  },
  {
    name: 'DATA_TYPE_OBJ',
    value: constMapToObj(dataType)
  },
  ...dataType,
  {
    name: 'ALARM_TYPE',
    value: alarmType
  },
  {
    name: 'ALARM_TYPE_OBJ',
    value: constMapToObj(alarmType)
  },
  ...alarmType,
  {
    name: 'ALARM_STATUS',
    value: alarmStatus
  },
  {
    name: 'ALARM_STATUS_OBJ',
    value: constMapToObj(alarmStatus)
  },
  ...alarmStatus
]