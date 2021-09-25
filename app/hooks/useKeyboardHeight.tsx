import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

const useKeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0)

  const keyboardDidShow = (frames: any) => {
    setKeyboardHeight(frames.endCoordinates.height)
  }

  const keyboardDidHide = () => {
    setKeyboardHeight(0)
  }

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardDidShow)
    Keyboard.addListener('keyboardDidHide', keyboardDidHide)

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow)
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide)
    }
  }, [])

  return keyboardHeight
}

export default useKeyboardHeight