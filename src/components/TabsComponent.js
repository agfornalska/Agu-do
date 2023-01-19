import React, { useRef, useState } from 'react'

import { Tabs } from 'antd'
import { LoggingComponent } from './LoggingComponent'
import { TabContent } from './TabContent'

const initialItems = [
  { label: 'Agu', children: <TabContent />, key: '1' },
  { label: 'Patryk', children: <TabContent />, key: '2' },
  {
    label: 'Tab 3',
    children: 'Content of Tab 3',
    key: '3',
  },
]

export const TabsComponent = () => {
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
      label: 'New Tab ',
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
