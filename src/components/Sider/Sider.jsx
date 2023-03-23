import React from 'react'
import { Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import './Sider.css'

//currentSnippet <- {id Snippeta string, isNew boolean}

export default function Sider({
  snippets,
  currentSnippet,
  setCurrentSnippet,
  deleteChoosenSnippet,
  addNewSnippet,
}) {
  return (
    <div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {snippets.map((item) => (
          <div
            key={item.id}
            onClick={() => setCurrentSnippet(item.id)}
            className={classNames([
              'box-default',
              item.id === currentSnippet ? 'box-clicked' : 'box-new',
            ])}
          >
            <div style={{ whiteSpace: 'normal' }}>
              <div className='title'>
                {item.title ? item.title : 'New title'}
              </div>
              <div className='snippet'>
                {item.snippet ? item.snippet : 'description'}
              </div>
            </div>
            <Button
              className='delete'
              onClick={(event) => deleteChoosenSnippet(event, item.id)}
              icon={<DeleteOutlined />}
            />
          </div>
        ))}
        <Button onClick={addNewSnippet}>Add</Button>
      </ul>
    </div>
  )
}
