import { reset, replace } from 'app/utils/rootNavigator'
import { makeObservable, observable, runInAction } from 'mobx'
import { toastStore } from 'app/stores'
import { $api, $consts } from 'app/plugins'
import storage from 'app/utils/storage'

class CommonStore {
  /**
   * 将初始化的步骤移动到 constructor 中，
   * 并且请务必初始化，否则 babel 插件 plugin-transform-flow-strip-types 编译失败，
   * 相关联 issue: 
   * https://github.com/react-navigation/react-navigation/issues/5825#issuecomment-590723220
   * https://github.com/facebook/react-native/issues/20150#issuecomment-417858270
   */
  token: string
  lastLoginTime: string
  initCacheDone: boolean

  constructor () {
    this.token = ''
    this.lastLoginTime = ''
    this.initCacheDone = false

    makeObservable(this, {
      token: observable,
      lastLoginTime: observable
    })
    this.initCache()
  }

  private clearCache = () => {
    storage.removeItem($consts['COMMON/CACHE_TOKEN'])
    storage.removeItem($consts['COMMON/CACHE_LAST_LOGIN_TIME'])
  }

  private setCache = (data: any) => {
    storage.setItem($consts['COMMON/CACHE_TOKEN'], data.token)
    storage.setItem($consts['COMMON/CACHE_LAST_LOGIN_TIME'], data.lastLogin)
  }

  initCache = () => {
    return Promise.all([
      storage.getItem($consts['COMMON/CACHE_TOKEN']),
      storage.getItem($consts['COMMON/CACHE_LAST_LOGIN_TIME'])
    ]).then(datas => {
      const [token, lastLoginTime] = datas
      this.initCacheDone = true
      runInAction(() => {
        this.token = token
        this.lastLoginTime = lastLoginTime
      })
      return { token, lastLoginTime }
    })
  }

  getRequestParams = () => {
    return new Promise((resolve) => {
      if (this.initCacheDone) {
        resolve({ token: this.token })
      } else {
        this.initCache().then(res => {
          resolve({ token: res.token })
        })
      }
    })
  }

  toLogin = async (username: string, password: string) => {
    const res = await $api['common/login']({ username, password }).catch(() => false)
    if (res.token) {
      res.token = `${$consts['COMMON/TOKEN_PREFIX']}${res.token}`
      runInAction(() => {
        this.token = res.token
        this.lastLoginTime = res.lastLogin
      })
      toastStore.show('登录成功')
      replace($consts['ROUTE/MAIN'])
      this.setCache(res)
    } else {
      toastStore.show('登录失败，请检查账号密码')
      this.clearCache()
    }
  }

  toLogout = () => {
    reset(0, [{ name: $consts['ROUTE/LOGIN'] }])
    this.clearCache()
  }
}

const commonStore = new CommonStore()

export default commonStore