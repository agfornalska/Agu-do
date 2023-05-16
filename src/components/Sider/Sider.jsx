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
    <div className='sider-default'>
      <Button className={'button-add'} onClick={addNewSnippet}>
        Add
      </Button>
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
                {item.snippet
                  ? item.snippet
                  : item.description
                  ? item.description.substring(0, 50)
                  : '50 characters of description'}
              </div>
            </div>
            <Button
              className='delete'
              onClick={(event) => deleteChoosenSnippet(event, item.id)}
              icon={<DeleteOutlined />}
            />
          </div>
        ))}
      </ul>
    </div>
  )
}
