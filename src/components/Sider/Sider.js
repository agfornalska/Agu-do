// import React, { useState } from 'react'
import { Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import './Sider.css'

/**
 * id:  '1',
    title: 'Tytuł ',
    snippet: 'sa', - 50 znakow opis
    userId: '1user',
    {`button-default ${
              item.id === current ? 'button-clicked' : 'button-new'
            }`}
 */

export function Sider({ items = [], setItems, current, setCurrent }) {
  console.log('🚀 ~ file: UserContent.js:32 ~ Snippet ~ current', current)

  function deleteCurrentItem(event, id) {
    console.log('🚀 ~ file: Sider.js:17 ~ deleteCurrentItem ~ current', current)
    setItems((oldValues) => {
      const newItems = oldValues.filter((item) => item.id !== id)
      const newCurrentIndex = oldValues.map((item) => item.id).indexOf(id) - 1
      console.log(
        '🚀 ~ file: Sider.js:25 ~ setItems ~ newCurrentIndex',
        newCurrentIndex
      )
      newCurrentIndex !== -1
        ? setCurrent(newItems[newCurrentIndex].id)
        : newItems.length !== 0
        ? setCurrent(newItems[0].id)
        : setCurrent(null)

      return newItems
    })
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
