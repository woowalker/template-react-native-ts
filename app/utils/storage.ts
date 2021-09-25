import AsyncStorage from '@react-native-async-storage/async-storage'

const getItem: string | any = async (key: string) => {
  let value: any = await AsyncStorage.getItem(key)
  try {
    value = JSON.parse(value)
  } catch (err) {
  }
  return value
}

const setItem = async (key: string, value: any) => {
  await AsyncStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value))
}

const removeItem = async (key: string) => {
  await AsyncStorage.removeItem(key)
}

export default {
  getItem,
  setItem,
  removeItem
}
