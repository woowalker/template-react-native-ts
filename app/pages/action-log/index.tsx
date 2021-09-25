import React from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Card, Scroller } from 'app/components'
import { $api } from 'app/plugins'
import dayjs from 'dayjs'
import styles from 'app/styles/pages/actionLog'

const ComplainPage = () => {
  const getData = (pagination: any) => {
    return $api['common/actionLog'](pagination)
  }

  const RenderItem = (props: any) => {
    const { data } = props
    return (
      <Card style={[styles.mgh12]}>
        <Text style={[styles.fz14, styles.cr000, styles.mgb10]}>{data.message}</Text>
        <Text style={[styles.fz12, styles.cr999]}>{dayjs(data.createdDate).format('YYYY-MM-DD HH:mm:ss')}</Text>
      </Card>
    )
  }

  return (
    <SafeAreaView style={[styles.flex1, styles.bgMain, styles.pdv12]}>
      <Scroller
        getData={getData}
        renderItem={({ item }) => <RenderItem data={item} />}
        style={[styles.flex1]}
      />
    </SafeAreaView>
  )
}

export default ComplainPage
