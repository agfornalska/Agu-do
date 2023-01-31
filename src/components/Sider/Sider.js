// import React, { useState } from 'react'
import { Button } from 'antd'
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

export function Sider({ items = [], current, setCurrent }) {
  console.log('🚀 ~ file: UserContent.js:25 ~ Snippet ~ current', current)

  return (
    <div className='list-div'>
      <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: 0 }}>
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
          </Button>
        ))}
      </ul>
    </div>
  )
}
