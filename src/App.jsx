import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header/Header'
import LogginForm from './components/LogginForm/LogginForm'
import Sider from './components/Sider/Sider'
import { toDoFetch } from './utils/ToDoUtils'
import uuid from 'react-uuid'
import Content from './components/Content/Content'

function App() {
  const [panes, setPanes] = useState([{ name: 'Agu', id: null }])
  const [selectedPane, setSelectedPane] = useState(null)
  const [currentSnippetId, setCurrentSnippetId] = useState(null) //snippetId

  const {
    id: userId,
    name,
    snippets,
  } = panes.find((pane) => pane.id === selectedPane)

  const currentSnippet = snippets?.find(
    (snippet) => snippet.id === currentSnippetId
  )

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
      snippets = snippetsResponse.snippets.map((snippet) => ({
        ...snippet,
        status: 'IDLE',
      }))
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
      setCurrentSnippetId(null)
      return
    }

    const newSnippets = snippets.filter((item) => item.id !== chosen)
    if (currentSnippetId === chosen) {
      const newCurrentIndex =
        snippets.map((item) => item.id).indexOf(chosen) - 1

      newCurrentIndex !== -1
        ? setCurrentSnippetId(newSnippets[newCurrentIndex].id)
        : setCurrentSnippetId(newSnippets[0].id)
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
      { id: newId, title: null, snippet: null, isNew: true, status: 'SUCCESS' },
    ]
    const newPanes = panes.map((pane) =>
      pane.id === selectedPane ? { ...pane, snippets: newSnippets } : pane
    )
    setPanes(newPanes)

    setCurrentSnippetId(newId)
  }

  useEffect(() => {
    if (!currentSnippet) return
    const { isNew, status } = currentSnippet
    if (isNew) return
    if (status !== 'IDLE') return

    async function fetchItems() {
      const contentResponse = await toDoFetch(`/todo/${currentSnippetId}`, {
        method: 'GET',
        headers: {
          'user-id': userId,
        },
      })

      function addContentToSnippet(pane) {
        function changeTaskList(taskList) {
          const newTaskList = taskList.map((task) => {
            return { ...task, key: uuid() }
          })
          return newTaskList
        }

        const newSnippets = pane.snippets.map((snippet) =>
          snippet.id === currentSnippetId
            ? {
                ...snippet,
                ...contentResponse,
                taskList: changeTaskList(contentResponse.taskList),
                status: 'SUCCESS',
              }
            : snippet
        )

        return { ...pane, snippets: newSnippets }
      }

      const newPanes = panes.map((pane) =>
        pane.id === selectedPane ? addContentToSnippet(pane) : pane
      )

      setPanes(newPanes)
    }
    fetchItems()
  }, [currentSnippet, currentSnippetId, panes, selectedPane, userId])

  function setCurrentItem(getModification) {
    function addModificationToSnippet(pane) {
      const newSnippets = pane.snippets.map((snippet) =>
        snippet.id === currentSnippetId
          ? { ...snippet, ...getModification() }
          : snippet
      )
      return { ...pane, snippets: newSnippets }
    }

    const newPanes = panes.map((pane) =>
      pane.id === selectedPane ? addModificationToSnippet(pane) : pane
    )

    setPanes(newPanes)
  }

  function saveButtonHandler() {
    const { title, notes, description, taskList, isNew } = currentSnippet

    const saveTaskList = taskList
      ? taskList.map((task) => {
          return { taskTitle: task.taskTitle, isDone: task.isDone }
        })
      : [{ taskTitle: 'new', isDone: false }]
    const method = isNew ? 'POST' : 'PUT'
    const url = isNew ? '/todo' : `/todo/${currentSnippetId}`

    const requestBody = {
      title: title ? title : 'New Title',
      notes: notes ? notes : 'your notes here',
      description: description ? description : 'description',
      taskList: saveTaskList,
    }
    async function fetchItems() {
      const contentResponse = await toDoFetch(url, {
        method: method,
        headers: { 'user-id': userId },
        body: JSON.stringify(requestBody),
      })
      return contentResponse
    }

    const response = fetchItems()
    console.log(
      '🚀 ~ file: App.jsx:233 ~ saveButtonHandler ~ response:',
      response
    )

    // const newSnippets = snippets.map((snippet) =>
    //   snippet.id === currentSnippetId ? { ...snippet, id: newId } : snippet
    // )
    // const newPanes = panes.map((pane) =>
    //   pane.id === selectedPane ? { ...pane, snippets: newSnippets } : pane
    // )

    // setPanes(newPanes)

    // setCurrentSnippetId(newId)
  }
  console.log(
    '🚀 ~ file: App.jsx:222 ~ fetchItems ~ currentSnippetId:',
    currentSnippet
  )

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
        <div>
          <Sider
            snippets={snippets}
            currentSnippet={currentSnippetId}
            setCurrentSnippet={setCurrentSnippetId}
            deleteChoosenSnippet={deleteChoosenSnippet}
            addNewSnippet={addNewSnippet}
          />
          {currentSnippet ? (
            <Content
              title={currentSnippet.title}
              description={currentSnippet.description}
              taskList={currentSnippet.taskList}
              notes={currentSnippet.notes}
              saveItem={saveButtonHandler}
              setCurrentItem={setCurrentItem}
            />
          ) : (
            'halo'
          )}
        </div>
      )}
    </div>
  )
}

export default App
