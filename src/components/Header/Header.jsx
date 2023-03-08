import React, { useRef, useState } from 'react'

import { Button } from 'antd'
import { LoggedContent } from '../LoggedContent/LoggedContent'
import { LoggingComponent } from '../LoggingComponent'
import { Sider } from '../Sider/Sider'
import { PlusOutlined, CloseOutlined } from '@ant-design/icons'
import classNames from 'classnames'

import './Header.css'

export function Header() {
  const [currentSnippet, setCurrentSnippet] = useState(null)
  const [panes, setPanes] = useState([{ name: null, id: null }])
  const [userData, setUserData] = React.useState(panes[0])
  const { id, name } = userData
  const [snippetId, setSnippetId] = useState(null)

  function handleLoggedIn(responseBody) {
    const newUserData = {
      name: responseBody.name,
      id: responseBody.id,
    }
    setUserData(newUserData)

    const newPanes = panes.map((pane) =>
      pane.id === null ? newUserData : pane
    )
    console.log(
      '🚀 ~ file: Header.jsx:33 ~ handleLoggedIn ~ newPanes:',
      newPanes
    )
    setPanes(newPanes)
  }

  function selectTabContent(newActiveTab) {
    const newUserData = panes.find((pane) => pane.id === newActiveTab)
    setUserData(newUserData)
  }
  function addTab() {
    if (panes[panes.length - 1].id === null) return
    const newPanes = [...panes]
    const newElement = {
      name: null,
      id: null,
    }
    newPanes.push(newElement)
    setPanes(newPanes)
    setUserData(newElement)
  }
  function remove(event, targetId) {
    console.log('🚀 ~ file: Header.jsx:49 ~ remove ~ targetId:', targetId)
    if (panes.length === 1) {
      setPanes([{ name: null, id: null }])
      return
    }

    const newPanes = panes.filter((pane) => pane.id !== targetId)
    if (userData.id === targetId) {
      const newCurrentIndex = panes.map((pane) => pane.id).indexOf(targetId) - 1

      newCurrentIndex !== -1
        ? setUserData(newPanes[newCurrentIndex])
        : setUserData(newPanes[0])
    }
    setPanes(newPanes)
    event.stopPropagation()
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
        <Button onClick={addTab}>
          <PlusOutlined />
        </Button>
      </div>
      <div>
        {!id ? (
          <LoggingComponent
            userData={userData}
            setUserData={setUserData}
            handleLoggedIn={handleLoggedIn}
          />
        ) : (
          <div className='content'>
            <Sider
              userId={id}
              currentSnippet={currentSnippet}
              setCurrentSnippet={setCurrentSnippet}
            />
            <LoggedContent idUser={id} current={currentSnippet} />
          </div>
        )}
      </div>
    </div>
  )
}
