import React, { useState, useEffect, useMemo } from 'react'
/**
 * 之所以用 SectionList，是应为
 * FlatList BUG: https://github.com/facebook/react-native/issues/29084
 * 等 BUG 修复，再换成 FlatList
 */
import { View, Text, SectionList, SectionListProps } from 'react-native'
import { EmptyPage } from 'app/components'
import styles from 'app/styles/components/scroller'

type PropsFooter = {
  loadingMore: boolean,
  loadedAll: boolean
}

const ListFooterComponent = (props: PropsFooter) => {
  if (props.loadingMore) {
    return (
      <View style={[styles.pdv6]}>
        <Text style={[styles.fz12, styles.cr999, styles.textCenter]}>数据加载中...</Text>
      </View>
    )
  }
  if (props.loadedAll) {
    return (
      <View style={[styles.pdv6]}>
        <Text style={[styles.fz12, styles.cr999, styles.textCenter]}>没有更多数据了</Text>
      </View>
    )
  }
  // 此处不要返回 null，否则可能会因为组件的高度变化，而触发多次 onEndReached 函数
  return (
    <View style={[styles.pdv6]}>
      <Text style={[styles.fz12, styles.cr999, styles.textCenter]}>上拉加载更多</Text>
    </View>
  )
}

type Props = Omit<SectionListProps<any>, 'sections'> & {
  getData: Function,
  autoLoad?: Boolean,
  enableRefresh?: Boolean,
  enableLoadMore?: Boolean
}

const Scroller = (props: Props) => {

  const [refreshing, setRefreshing] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [pagination, setPagination] = useState({ pageIndex: 1, pageSize: 10 })
  const [data, setData] = useState({ totalPage: 1, data: [] })

  const handleRefresh = () => {
    const { enableRefresh = true } = props
    if (!enableRefresh || refreshing || loadingMore) return

    const currPagination = { ...pagination, pageIndex: 1 }
    setPagination(currPagination)
    setRefreshing(true)
    const promise: Promise<any> = props.getData(currPagination)
    promise
      .then(res => { setData(res) })
      .finally(() => { setRefreshing(false) })
  }

  const loadedAll = useMemo(() => {
    return pagination.pageIndex >= data.totalPage
  }, [pagination, data])

  const handleEndReached = () => {
    const { enableLoadMore = true } = props
    if (!enableLoadMore || refreshing || loadingMore || loadedAll) return

    const currPagination = { ...pagination, pageIndex: pagination.pageIndex + 1 }
    setPagination(currPagination)
    setLoadingMore(true)
    const promise: Promise<any> = props.getData(currPagination)
    promise
      .then(res => { setData({ ...res, data: data.data.concat(res.data) }) })
      .finally(() => { setLoadingMore(false) })
  }

  useEffect(() => {
    const { autoLoad = true } = props
    autoLoad && handleRefresh()
  }, [props.extraData])

  const sections = useMemo(() => {
    const showData = data.data
    if (!showData?.length) return []
    return [{ data: showData }]
  }, [data])

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item: any, index: number) => `${item.id}_${index}`}
      ListEmptyComponent={<EmptyPage />}
      ListFooterComponent={<ListFooterComponent loadingMore={loadingMore} loadedAll={loadedAll} />}
      onEndReachedThreshold={0.05}
      onEndReached={handleEndReached}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      {...props}
    />
  )
}

export default Scroller