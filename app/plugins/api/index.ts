import axios, { CancelToken } from './axios'
// 数据 store
import { commonStore } from 'app/stores'
// 配置
import { AXIOS_DEFAULT_CONFIG as axiosDefaultConfig, API_DEFAULT_CONFIG } from './config'
import API_CONFIG from './services'
// 工具库
import { $consts } from 'app/plugins'
import storage from 'app/utils/storage'
import { pick, assign, isEmpty } from 'lodash'

const assert = (condition: boolean | string, msg: string): void => {
  if (!condition) {
    throw new Error(`[ApiErr] ${msg}`)
  }
}

type Api = {
  [propsName: string]: any
}

type Options = {
  baseURL: string,
  prefixPath: string,
  sep: string,
  debug: boolean,
  config: any
}

type ConfItem = {
  name: string,
  method: string,
  path: string,
  params: any,
  desc: string
}

type Params = {
  fullData?: boolean,
  noPickParams?: boolean,
  noErrorToast?: boolean,
  noShowLoading?: boolean,
  [propName: string]: any
}

class MakeApi {
  api: Api

  constructor (options: Options) {
    this.api = {}
    this.apiBuilder(options)
  }

  apiBuilder (options: Options) {
    Object.keys(options.config).forEach(namespace => {
      this._apiSingleBuilder(namespace, { ...options, config: options.config[namespace] })
    })
  }

  _apiSingleBuilder (namespace: string, { baseURL, prefixPath, sep, debug, config }: Options) {
    config.forEach((api: ConfItem) => {
      const { name, method, path, params } = api
      const apiName = `${namespace}${sep}${name}`
      const apiUrl = path

      debug && assert(name, `${apiUrl}: 接口name属性不能为空`)
      debug && assert(apiUrl.indexOf('/') === 0, `${apiUrl}: 接口路径path，首字符应为/`)

      Object.defineProperty(this.api, apiName, {
        /**
         * $api['common/dataMap'](outerParams, outerOptions, getCancenToken)
         * @param {Object} outerParams 接口请求所需携带的参数
         * @param {Object} outerOptions axios 的配置参数，与 url、method 同级，例如 { fullData: true }，该配置可在 response.config 中取到
         * @param {Function} getCancelToken 用于取消接口调用，调用参数为 cancel 实例，调用 cancel.cancel() 就能取消
         * @returns 
         */
        value (
          outerParams: any,
          outerOptions: Params = {
            fullData: false, // 全部数据返回，false 则只返回 Data 里面的数据
            noPickParams: false, // true: 根据 api 配置的 params 过滤参数 false: 不过滤
            noErrorToast: false, // true: 不显示接口错误信息 false: 显示接口错误信息
            noShowLoading: false // true: 不显示加载中动画
          },
          getCancelToken?: Function
        ) {
          const _params = isEmpty(outerParams) ? params : assign({}, params, outerParams)
          // 经过 pick 处理，就能以 params 中定义存在的属性为准，避免传递不需要的参数给后端
          const _data = outerOptions?.noPickParams ? _params : pick(_params, Object.keys(params))
          const url = _replaceURLparams(apiUrl, _params)
          // 本地存储的 token 由于 storage 是异步的，所以使用 Promise 来保证接口发起之前取得 token
          return commonStore.getRequestParams().then((params: any) => {
            return axios(_normoalize(assign({
              baseURL: `${baseURL}${prefixPath}`,
              url,
              method,
              cancelToken: new CancelToken(function (cancel) {
                // 用于取消 axios 请求，通过 getCancelToken 方法将 cancel 实例传出去，调用 cancel.cancel() 就能取消请求
                getCancelToken instanceof Function && getCancelToken(cancel)
              })
            }, outerOptions), _data, params))
          })
        }
      })
    })
  }
}

/**
 * 替换 services -> common.js 文件中的 path 属性中定义的字段
 * 例如：/text/path/:category，如果请求参数中存在 { category: 'baseType' }
 * 那么该请求路径会被替换为：/text/path/baseType
 * @param {string} url 接口请求路径
 * @param {Object} data 默认请求参数对象
 * @returns 
 */
function _replaceURLparams (url: string, data: any) {
  return url.replace(/:([\w\d]+)/ig, (reg, key) => {
    return data[key]
  })
}

/**
 * 决定 axios 请求的载体是 data(POST等) 还是 params(GET)
 * @param options axios 的配置项
 * @param data axios 请求的数据
 * @param extra 额外约定的数据
 * @returns 
 */
function _normoalize (options: any, data: any, extra: any) {
  const method = options.method.toUpperCase()
  if (['POST', 'PUT', 'PATCH', 'DELETE'].indexOf(method) > -1) {
    // 使用 FormData 类型，content-type 自动会被转成 multipart/form-data
    const formData = new FormData()
    Object.keys(data).forEach(key => {
      formData.append(key, data[key])
    })
    options.data = formData
  } else {
    options.params = data
  }
  // 添加统一的认证token
  options.headers = {
    ...axiosDefaultConfig.headers,
    ...options.headers,
    Authorization: extra.token
  }
  return options
}

export default new MakeApi({
  config: API_CONFIG,
  ...API_DEFAULT_CONFIG
})['api']