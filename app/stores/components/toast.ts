import { makeObservable, observable, action } from 'mobx'

class ToastStore {
  visible: boolean
  msg: string
  timer: any
  durations: any

  constructor () {
    this.visible = false
    this.msg = ''
    this.timer = -1
    this.durations = {
      LONG: 3500,
      SHORT: 2000
    }

    makeObservable(this, {
      visible: observable,
      msg: observable,
      show: action,
      hide: action
    })
  }

  show = (msg: string, duration?: number) => {
    this.msg = msg
    this.visible = true

    clearTimeout(this.timer)
    this.timer = setTimeout(this.hide, duration || this.durations.SHORT)
  }

  hide = () => {
    this.visible = false
  }
}

const toastStore = new ToastStore()

export default toastStore