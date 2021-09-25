import { makeObservable, observable, action } from 'mobx'

class LoadingStore {
  visible: boolean
  msg?: string

  visibleTimestamp: number
  delay: number
  timer: any
  counter: number

  constructor () {
    this.visible = false
    this.msg = undefined
    this.visibleTimestamp = 0
    this.delay = 200
    this.timer = -1
    this.counter = 0

    makeObservable<LoadingStore, '_show' | '_hide'>(this, {
      visible: observable,
      msg: observable,
      show: action,
      hide: action,
      _show: action,
      _hide: action
    })
  }

  show = (msg: string = '请稍后...') => {
    ++this.counter
    clearTimeout(this.timer)

    msg && (this.msg = msg)
    this.timer = setTimeout(() => { this._show() }, this.delay)
  }

  private _show = () => {
    this.visibleTimestamp = new Date().getTime()
    this.visible = true
  }

  /**
   * 隐藏 Loading 组件
   * @param {boolean} force 强制立即关闭
   */
  hide = (force?: boolean) => {
    if (!force) {
      --this.counter
    }
    if (this.counter <= 0 || force) {
      clearTimeout(this.timer)
      const timestamp = new Date().getTime()
      if (this.visible && timestamp - this.visibleTimestamp <= 300) {
        // show 和 hide 之间的间隔不足 300ms 时， 加载动画至少存在 300ms
        setTimeout(() => { this._hide() }, 300)
      } else {
        this._hide()
      }
    }
  }

  private _hide = () => {
    this.visible = false
  }
}

const loadingStore = new LoadingStore()

export default loadingStore