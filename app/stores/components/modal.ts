import { makeObservable, observable, action } from 'mobx'

type ModalOptions = {
  title?: string,
  content: string,
  buttons: any[]
}

class ModalStore {
  visible: boolean
  options: ModalOptions

  constructor () {
    this.visible = false
    this.options = {
      title: '温馨提示',
      content: '这是一个弹窗',
      buttons: [
        { text: '取消', textColor: '#666666', onPress: () => { } },
        { text: '确定', textColor: '#4B8AEB', onPress: () => { } }
      ]
    }

    makeObservable(this, {
      visible: observable,
      options: observable,
      show: action,
      hide: action
    })
  }

  show = (visible: boolean, options: ModalOptions) => {
    this.visible = visible
    this.options = options
  }

  hide = () => {
    this.visible = false
  }
}

const modalStore = new ModalStore()

export default modalStore