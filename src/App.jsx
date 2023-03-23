import React, { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import LogginForm from './components/LogginForm/LogginForm'
import Sider from './components/Sider/Sider'
import { toDoFetch } from './utils/ToDoUtils'
import uuid from 'react-uuid'

function App() {
  const [panes, setPanes] = useState([{ name: 'Agu', id: null }])
  const [selectedPane, setSelectedPane] = useState(null)
  const [currentSnippet, setCurrentSnippet] = useState(null)

  const { name, snippets } = panes.find((pane) => pane.id === selectedPane)

  function addTab(newPanes, newId) {
    setPanes(newPanes)
    setSelectedPane(newId)
  }

  function remove(event, targetId) {
    event.stopPropagation()

    if (panes.length === 1) {
      setPanes([{ name: null, id: null }])
      //setCurrentSnippet(null)
      setSelectedPane(null)
      return
    }

    const newPanes = panes.filter((pane) => pane.id !== targetId)
    if (selectedPane === targetId) {
      const newCurrentIndex = panes.map((pane) => pane.id).indexOf(targetId) - 1

      newCurrentIndex !== -1
        ? setSelectedPane(newPanes[newCurrentIndex].id)
        : setSelectedPane(newPanes[0].id)
    }
    setPanes(newPanes)
  }
  function handleNameChange(event) {
    setPanes(
      panes.map((pane) => {
        if (pane.id === selectedPane) {
          return { ...pane, name: event.target.value }
        }
        return pane
      })
    )
  }

  async function handleLogginFormSubmit(submitType) {
    const requestBody = {
      userName: name,
    }

    const url = submitType === 'login' ? '/auth' : '/user'

    const newUserDataResponse = await toDoFetch(url, {
      method: 'POST',
      body: JSON.stringify(requestBody),
    })

    let snippets = []

    if (submitType === 'login') {
      const snippetsResponse = await toDoFetch('/todo', {
        method: 'GET',
        headers: { 'user-id': newUserDataResponse.id },
      })
      snippets = snippetsResponse.snippets
    }

    const newUserData = {
      name: newUserDataResponse.name,
      id: newUserDataResponse.id,
      snippets,
    }
    const newPanes = panes.map((pane) =>
      pane.id === null ? newUserData : pane
    )

    setPanes(newPanes)
    setSelectedPane(newUserDataResponse.id)
  }

  function deleteChoosenSnippet(event, chosen) {
    event.stopPropagation()
    if (snippets.length === 1) {
      const newPanes = panes.map((pane) =>
        pane.id === selectedPane ? { ...pane, snippets: [] } : pane
      )
      setPanes(newPanes)
      setCurrentSnippet(null)
      return
    }

    const newSnippets = snippets.filter((item) => item.id !== chosen)
    if (currentSnippet === chosen) {
      const newCurrentIndex =
        snippets.map((item) => item.id).indexOf(chosen) - 1

      newCurrentIndex !== -1
        ? setCurrentSnippet(newSnippets[newCurrentIndex].id)
        : setCurrentSnippet(newSnippets[0].id)
    }

    const newPanes = panes.map((pane) =>
      pane.id === selectedPane ? { ...pane, snippets: newSnippets } : pane
    )
    setPanes(newPanes)
  }

  function addNewSnippet() {
    const newId = uuid()
    const newSnippets = [
      ...snippets,
      { id: newId, title: null, snippet: null, isNew: true },
    ]
    const newPanes = panes.map((pane) =>
      pane.id === selectedPane ? { ...pane, snippets: newSnippets } : pane
    )
    setPanes(newPanes)

    setCurrentSnippet(newId)
  }

  return (
    <div>
      <Header
        panes={panes}
        selectTabContent={setSelectedPane}
        remove={remove}
        addTab={addTab}
      />
      {!selectedPane ? (
        <LogginForm
          handleNameChange={handleNameChange}
          name={name}
          handleClick={handleLogginFormSubmit}
        />
      ) : (
        <Sider
          snippets={snippets}
          currentSnippet={currentSnippet}
          setCurrentSnippet={setCurrentSnippet}
          deleteChoosenSnippet={deleteChoosenSnippet}
          addNewSnippet={addNewSnippet}
        />
      )}
    </div>
  )
}

export default App
