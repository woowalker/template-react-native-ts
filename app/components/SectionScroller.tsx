import React, { useState, useEffect } from 'react'
/**
 * 之所以用 SectionList，是应为
 * FlatList BUG: https://github.com/facebook/react-native/issues/29084
 * 等 BUG 修复，再换成 FlatList
 */
import { SectionList, SectionListProps } from 'react-native'
import { EmptyPage } from 'app/components'

type Props = Omit<SectionListProps<any>, 'sections'> & {
  data: any[],
  getData: Function,
  autoLoad?: Boolean,
  enableRefresh?: Boolean
}

const Scroller = (props: Props) => {
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    const { enableRefresh = true } = props
    if (!enableRefresh || refreshing) return

    setRefreshing(true)
    const promise: Promise<any> = props.getData()
    promise.finally(() => { setRefreshing(false) })
  }

  useEffect(() => {
    const { autoLoad = true } = props
    autoLoad && handleRefresh()
  }, [props.extraData])

  return (
    <SectionList
      sections={props.data}
      keyExtractor={(item: any, index: number) => `${item.id}_${index}`}
      ListEmptyComponent={<EmptyPage />}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      {...props}
    />
  )
}

export default Scroller