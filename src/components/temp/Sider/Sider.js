import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import './Sider.css'
import { LoggedContent } from '../LoggedContent/LoggedContent'
import uuid from 'react-uuid'

//currentSnippet <- {id Snippeta string, isNew boolean}

export function Sider({ userId, currentSnippet, setCurrentSnippet }) {
  console.log(
    '🚀 ~ file: Sider.js:12 ~ Sider ~ currentSnippet:',
    currentSnippet
  )
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
      setCurrentSnippet({ id: null, isNew: false })
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

  function addNewItem() {
    var newItems = items
    var newId = uuid()
    newItems.push({
      id: newId,
      title: null,
      snippet: null,
    })

    console.log('🚀 ~ file: Sider.js:55 ~ addNewItem ~ newItems:', newItems)
    setItems(newItems)
    setCurrentSnippet({ id: newId, isNew: true })
  }

  return (
    <div className='content'>
      <div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                setCurrentSnippet({
                  id: item.id,
                  isNew: item.title ? false : true,
                })
              }
              className={classNames([
                'box-default',
                item.id === currentSnippet.id ? 'box-clicked' : 'box-new',
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
                onClick={(event) => deleteCurrentItem(event, item.id)}
                icon={<DeleteOutlined />}
              />
            </div>
          ))}
          <Button onClick={() => addNewItem()}>Add</Button>
        </ul>
      </div>
      {currentSnippet.id && (
        <LoggedContent idUser={userId} current={currentSnippet} />
      )}
    </div>
  )
}
