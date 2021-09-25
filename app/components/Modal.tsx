import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { observer } from 'mobx-react'
import Modal from 'react-native-modal'
import { IFComponent } from 'app/components'
import { modalStore } from 'app/stores'
import styles from 'app/styles/components/modal'

const MyModal = () => {
  const handleBtnPress = (onPress: Function) => {
    modalStore.hide()
    onPress instanceof Function && onPress()
  }

  return (
    <Modal
      animationIn='fadeInUp'
      animationOut='fadeOutDown'
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      hideModalContentWhileAnimating={true}
      isVisible={modalStore.visible}
    >
      <View style={[styles.container, styles.boxRadius4, styles.bgWhite]}>
        <IFComponent
          IF={!!modalStore.options.title}
          ELSE={<View style={{ height: 4 }} />}
        >
          <Text
            style={[
              styles.title,
              styles.fz16,
              styles.cr333,
              styles.fwBolder,
              styles.textCenter
            ]}
          >{modalStore.options.title}</Text>
        </IFComponent>
        <Text
          style={[
            styles.content,
            styles.fz14,
            styles.cr333,
            styles.textCenter
          ]}
        >{modalStore.options.content}</Text>
        <View style={[styles.buttons, styles.flexCenter]}>
          {
            modalStore.options.buttons.map((item, index) => {
              const borderRight = index !== modalStore.options.buttons.length - 1
              return (
                <TouchableOpacity
                  key={`${item.text}_${index}`}
                  onPress={() => { handleBtnPress(item.onPress) }}
                  style={[styles.fullHeight, styles.flex1, styles.flexCenter, borderRight ? styles.borderRight : null]}
                >
                  <Text style={[styles.fz14, styles.fwBolder, { color: item.textColor || '#4B8AEB' }]}>{item.text}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
    </Modal>
  )
}

export default observer(MyModal)