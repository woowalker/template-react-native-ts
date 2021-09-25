export default [
  {
    name: 'getComplains',
    method: 'GET',
    path: '/stenches/Complaint',
    params: {
      siteId: '',
      status: '',
      pageIndex: 1,
      pageSize: 10
    },
    desc: '查询投诉单'
  }
]