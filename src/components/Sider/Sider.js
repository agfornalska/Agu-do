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
function deleteCurrentItem(list, setItems, current) {
  console.log('🚀 ~ file: Sider.js:17 ~ deleteCurrentItem ~ current', current)
  setItems((oldValues) => {
    return oldValues.filter((item) => item.id !== current)
  })
}

export function Sider({ items = [], setItems, current, setCurrent }) {
  console.log('🚀 ~ file: UserContent.js:25 ~ Snippet ~ current', current)

  return (
    <div className='list-div'>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((item) => (
          <Button
            key={item.id}
            onClick={() => setCurrent(item.id)}
            className={classNames([
              'button-default',
              item.id === current ? 'button-clicked' : 'button-new',
            ])}
          >
            <div style={{ whiteSpace: 'normal' }}>
              <div className='title'>{item.title}</div>
              <div className='snippet'>{item.snippet}</div>
            </div>
            <Button
              className='delete'
              onClick={() => deleteCurrentItem(items, setItems, item.id)}
              icon={<DeleteOutlined />}
            />
          </Button>
        ))}
      </ul>
    </div>
  )
}
