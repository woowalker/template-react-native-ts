import { get } from 'lodash'
import { CONSOLE_REQUEST_ENABLE, CONSOLE_RESPONSE_ENABLE } from './config'
import { toastStore, loadingStore, modalStore } from 'app/stores'
import { reset, getCurrRoute } from 'app/utils/rootNavigator'
import { $consts } from 'app/plugins'

const reqSuccess = (reqObj: any) => {
  CONSOLE_REQUEST_ENABLE && console.info('request success', reqObj.url, reqObj)
  !reqObj.noShowLoading && loadingStore.show()
  return reqObj
}

const reqFail = (err: any) => {
  return Promise.reject(err)
}

const resSuccess = ({ data, config }: any) => {
  CONSOLE_RESPONSE_ENABLE && console.log('response success', data)
  !config.noShowLoading && loadingStore.hide()
  // 很奇葩的，需要在 success 的返回体中将 code 当作 http 的状态码
  if (data.code !== 200) {
    switch (data.code) {
      case 401: // 登陆过期
        const currRoute = getCurrRoute()
        if (currRoute?.name !== $consts['ROUTE/LOGIN']) {
          modalStore.show(true, {
            title: '温馨提示',
            content: '登录过期，请重新登录',
            buttons: [{
              text: '确定',
              onPress: () => {
                reset(0, [{ name: $consts['ROUTE/LOGIN'] }])
              }
            }]
          })
        }
        config.noErrorToast = true
        break
      default:
        data.message = data.message.includes('timeout') ? '网络超时' : '网络错误'
        break
    }
    // 全局错误提示
    if (!config.noErrorToast) {
      toastStore.show(data.message)
    }
    return Promise.reject(data)
  }
  return config.fullData ? data : data.data
}

const resFail = (resErr: any) => {
  !resErr.config.noShowLoading && loadingStore.hide()
  if (resErr.response) {
    switch (resErr.response.status) {
      case 401: // 登录过期
        const currRoute = getCurrRoute()
        if (currRoute?.name !== $consts['ROUTE/LOGIN']) {
          modalStore.show(true, {
            title: '温馨提示',
            content: '登录过期，请重新登录',
            buttons: [{
              text: '确定',
              onPress: () => {
                reset(0, [{ name: $consts['ROUTE/LOGIN'] }])
              }
            }]
          })
        }
        resErr.config.noErrorToast = true
        break
      default:
        resErr.message = get(resErr, 'response.data.message', '网络错误')
        break
    }
  } else {
    resErr.message = '网络错误'
  }

  // 超时提示
  if (resErr.message.includes('timeout')) {
    resErr.message = '请求超时'
  }

  // 全局错误提示
  if (!resErr.config.noErrorToast) {
    toastStore.show(resErr.message)
  }

  return Promise.reject(resErr)
}

export default {
  reqSuccess,
  reqFail,
  resSuccess,
  resFail
}