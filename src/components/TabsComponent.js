import React, { useRef, useState } from 'react'

import { Tabs } from 'antd'

import { TabContent } from './TabContent'

export function TabsComponent() {
  const { id, name } = { id: null, name: null }
  const initialItems = [
    {
      label: name,
      children: <TabContent />,
      key: '1',
      id: id,
    },
  ]
  const [activeKey, setActiveKey] = useState(initialItems[0].key)
  const [items, setItems] = useState(initialItems)
  const newTabIndex = useRef(0)
  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey)
  }
  //dodawanie nowego taba
  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`
    const newPanes = [...items] //propsy
    newPanes.push({
      label: 'new tab',
      children: <TabContent />,
      key: newActiveKey,
    })
    setItems(newPanes)
    setActiveKey(newActiveKey)
  }

  const remove = (targetKey) => {
    let newActiveKey = activeKey
    let lastIndex = -1
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1
      }
    })
    const newPanes = items.filter((item) => item.key !== targetKey)
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key
      } else {
        newActiveKey = newPanes[0].key
      }
    }
    setItems(newPanes)
    setActiveKey(newActiveKey)
  }

  const onEdit = (targetKey, action) => {
    if (action === 'add') {
      //pojawienie sie formularza dodawania
      add()
    } else {
      remove(targetKey)
    }
  }

  return (
    <Tabs
      type='editable-card'
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit}
      items={items}
    />
  )
}
