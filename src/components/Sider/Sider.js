// import React, { useState } from 'react'
import { Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import './Sider.css'

export function Sider({ items = [], setItems, current, setCurrent }) {
  function deleteCurrentItem(event, chosen) {
    if (items.length === 1) {
      setItems([])
      setCurrent(null)
      return
    }
    const newItems = items.filter((item) => item.id !== chosen)
    if (current === chosen) {
      const newCurrentIndex = items.map((item) => item.id).indexOf(chosen) - 1

      newCurrentIndex !== -1
        ? setCurrent(newItems[newCurrentIndex].id)
        : setCurrent(newItems[0].id)
    }
    setItems(newItems)
    event.stopPropagation()
  }

  return (
    <div className='list-div'>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => setCurrent(item.id)}
            className={classNames([
              'box-default',
              item.id === current ? 'box-clicked' : 'box-new',
            ])}
          >
            <div style={{ whiteSpace: 'normal' }}>
              <div className='title'>{item.title}</div>
              <div className='snippet'>{item.snippet}</div>
            </div>
            <Button
              className='delete'
              onClick={(event) => deleteCurrentItem(event, item.id)}
              icon={<DeleteOutlined />}
            />
          </div>
        ))}
      </ul>
    </div>
  )
}
