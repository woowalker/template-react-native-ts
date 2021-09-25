export default [
  {
    name: 'getGasTrend',
    method: 'GET',
    path: '/stenches/SiteMonitor/monitor',
    params: {
      days: 7
    },
    desc: '恶臭浓度趋势图表数据'
  },
  {
    name: 'getAlarmEvts',
    method: 'GET',
    path: '/stenches/Evets',
    params: {
      pageIndex: 1,
      pageSize: 10
    },
    desc: '报警事件单'
  }
]