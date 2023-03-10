import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import './Sider.css'

export function Sider({ userId, currentSnippet, setCurrentSnippet }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    async function fetchSnippets() {
      const response = await fetch('/todo', {
        method: 'GET',
        headers: { 'user-id': userId },
      })

      const responseBody = await response.json()

      try {
        if (responseBody.errorMessage) {
          throw new Error(responseBody.errorMessage)
        }
        setItems(responseBody.snippets)
      } catch (error) {
        console.log(error)
      }
    }

    fetchSnippets()
  }, [userId])

  function deleteCurrentItem(event, chosen) {
    event.stopPropagation()
    if (items.length === 1) {
      setItems([])
      setCurrentSnippet(null)
      return
    }

    const newItems = items.filter((item) => item.id !== chosen)
    if (currentSnippet === chosen) {
      const newCurrentIndex = items.map((item) => item.id).indexOf(chosen) - 1

      newCurrentIndex !== -1
        ? setCurrentSnippet(newItems[newCurrentIndex].id)
        : setCurrentSnippet(newItems[0].id)
    }

    setItems(newItems)
  }
  console.log(currentSnippet)
  return (
    <div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => setCurrentSnippet(item.id)}
            className={classNames([
              'box-default',
              item.id === currentSnippet ? 'box-clicked' : 'box-new',
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
