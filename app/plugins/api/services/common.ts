export default [
  {
    name: 'login',
    method: 'POST',
    path: '/stenches/Login',
    params: {
      username: '',
      password: ''
    },
    desc: '登录接口'
  },
  {
    name: 'actionLog',
    method: 'GET',
    path: '/stenches/Log',
    params: {
      pageIndex: 1,
      pageSize: 10
    },
    desc: '活动日志'
  }
]