import React, { useMemo, useEffect } from 'react'
import { observer } from 'mobx-react'
import { ScrollTab } from 'app/components'
import { gasStore } from 'app/stores'

const GasSelector = (props: any) => {
  // 获取可用气体监测
  useEffect(() => {
    gasStore.getGases()
  }, [])

  const gases = useMemo(() => {
    return gasStore.gases.map(({ id: value, name: text }: any) => {
      return { text, value }
    })
  }, [gasStore.gases])

  return (
    <ScrollTab
      data={gases}
      value={gasStore.value}
      onChange={gasStore.setValue}
      {...props}
    />
  )
}

export default observer(GasSelector)