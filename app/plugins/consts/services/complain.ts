import constMapToObj from 'app/utils/constMapToObj'

const handleType = [
  // 待处理投诉
  {
    name: 'HANDLE_TYPE_UNSOLVE',
    text: '待处理',
    value: 0
  },
  // 已处理投诉
  {
    name: 'HANDLE_TYPE_SOLVE',
    text: '已处理',
    value: 1
  }
]

export default [
  {
    name: 'HANDLE_TYPE',
    value: handleType
  },
  {
    name: 'HANDLE_TYPE_OBJ',
    value: constMapToObj(handleType)
  },
  ...handleType
]