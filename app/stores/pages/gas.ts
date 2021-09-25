import { makeObservable, observable, runInAction, action } from 'mobx'
import { $api } from 'app/plugins'

class GasStore {
  gases: any
  value?: string | number

  constructor () {
    this.gases = []
    this.value = undefined

    makeObservable(this, {
      gases: observable,
      value: observable,
      getGases: action,
      setValue: action
    })
  }

  getGases = async () => {
    if (this.gases.length) return Promise.resolve(this.gases)

    const gases = await $api['gas/getGases']().catch(() => false)
    runInAction(() => {
      this.gases = gases && gases.length ? gases : []
      this.value = gases && gases.length ? gases[0].id : -1
    })
    return gases ? Promise.resolve(gases) : Promise.reject(false)
  }

  setValue = (val: string | number) => {
    this.value = val
  }
}

const gasStore = new GasStore()

export default gasStore