export default [
  {
    name: 'getStations',
    method: 'GET',
    path: '/stenches/BasicData',
    params: {
      dataType: 1
    },
    desc: '获取所有站点'
  },
  {
    name: 'getGasData',
    method: 'GET',
    path: '/stenches/SiteMonitor',
    params: {
      siteId: '',
      stenchTypeId: '',
      startTime: '',
      endTime: '',
      timeRangeType: 0
    },
    desc: '获取气体排放数据'
  },
  {
    name: 'getGasDetail',
    method: 'GET',
    path: '/stenches/SiteMonitor/statistics',
    params: {
      siteId: '',
      stenchTypeId: '',
      startTime: '',
      endTime: ''
    },
    desc: '获取气体信息'
  },
  {
    name: 'getAlarmData',
    method: 'GET',
    path: '/stenches/Alarm/statistics',
    params: {
      siteIds: '',
      startTime: '',
      endTime: ''
    },
    desc: '获取站点报警图表数据'
  },
  {
    name: 'getAlarmInfos',
    method: 'GET',
    path: '/stenches/Alarm',
    params: {
      pageIndex: 1,
      pageSize: 10,
      siteIds: '',
      queryType: -1,
      startTime: '',
      endTime: ''
    },
    desc: '获取站点报警信息'
  }
]