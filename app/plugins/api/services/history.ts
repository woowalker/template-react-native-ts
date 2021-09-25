export default [
  {
    name: 'getHistoryData',
    method: 'GET',
    path: '/stenches/History',
    params: {
      siteId: '',
      stenchTypeId: '',
      startTime: '',
      endTime: '',
      timeRangeType: 0,
      queryType: 2
    },
    desc: '获取监测气体历史数据'
  }
]