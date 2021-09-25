import React, { useState, useEffect } from 'react'
import { ScrollView, ScrollViewProps, RefreshControl } from 'react-native'

type Props = ScrollViewProps & {
  getData: Function,
  children: React.ReactChild | React.ReactChild[],
  autoLoad?: Boolean,
  enableRefresh?: Boolean
}

const Refresher = (props: Props) => {
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
  }, [])

  const { enableRefresh = true } = props
  return (
    <ScrollView
      refreshControl={
        enableRefresh
          ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          )
          : undefined
      }
      {...props}
    >
      {props.children}
    </ScrollView>
  )
}

export default Refresher