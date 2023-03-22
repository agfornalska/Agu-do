import React from 'react'
import { Button } from 'antd'
import { PlusOutlined, CloseOutlined } from '@ant-design/icons'

import './Header.css'

export default function Header({ panes, selectTabContent, remove, addTab }) {
  function handleAddTab() {
    if (panes[panes.length - 1].id === null) return
    const newPanes = [...panes]
    const newElement = {
      name: null,
      id: null,
    }
    newPanes.push(newElement)

    addTab(newPanes, newElement.id)
  }

  return (
    <div>
      <div className='tab-list'>
        {panes.map((pane) => (
          <div
            key={pane.id}
            onClick={() => selectTabContent(pane.id)}
            className={'tab-default'}
          >
            {pane.name ? pane.name : 'New Tab'}
            <div
              className='tab-delete-button'
              onClick={(event) => remove(event, pane.id)}
            >
              <CloseOutlined />
            </div>
          </div>
        ))}
        <Button onClick={handleAddTab}>
          <PlusOutlined />
        </Button>
      </div>
    </div>
  )
}
