import { makeObservable, observable, runInAction, action } from 'mobx'
import { $api } from 'app/plugins'

class StationStore {
  stations: any
  value?: string | number

  constructor () {
    this.stations = []
    this.value = undefined

    makeObservable(this, {
      stations: observable,
      value: observable,
      getStations: action,
      setValue: action
    })
  }

  getStations = async () => {
    if (this.stations.length) return Promise.resolve(this.stations)

    const stations = await $api['station/getStations']().catch(() => false)
    runInAction(() => {
      this.stations = stations && stations.length ? stations : []
      this.value = stations && stations.length ? stations[0].id : -1
    })
    return stations ? Promise.resolve(stations) : Promise.reject(false)
  }

  setValue = (val: string | number) => {
    this.value = val
  }
}

const stationStore = new StationStore()

export default stationStore