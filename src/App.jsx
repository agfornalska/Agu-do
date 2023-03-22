import React, { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import LogginForm from './components/LogginForm/LogginForm'

// const initialItems = [
//   {
//     id: '1user',
//     title: '1 sadtitle',
//     snippet: '1snippet1 snippet 1snippet1 b; ippet1 snippet1snippet1',
//   },
//   {
//     id: '2user',
//     title: '2title',
//     snippet: '2snippet',
//   },
//   {
//     id: '3user',
//     title: '2tsdaditle',
//     snippet: '2sfasfanippet',
//   },
//   {
//     id: '4user',
//     title: '2tsdaditle',
//     snippet: '2sfa sfsad anippet',
//   },
// ]

function App() {
  const [panes, setPanes] = useState([{ name: null, id: null }])
  const [selectedPane, setSelectedPane] = useState(null)

  const name = panes.find((pane) => pane.id === selectedPane).name

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

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(requestBody),
    })

    const responseBody = await response.json()

    if (responseBody.errorMessage) {
      console.error(responseBody.errorMessage)
      return
    }

    const newUserData = {
      name: responseBody.name,
      id: responseBody.id,
    }

    setSelectedPane(newUserData.id)

    const newPanes = panes.map((pane) =>
      pane.id === null ? newUserData : pane
    )

    setPanes(newPanes)
  }

  return (
    <div>
      <Header
        panes={panes}
        selectTabContent={setSelectedPane}
        remove={remove}
        addTab={addTab}
      />
      <LogginForm
        handleNameChange={handleNameChange}
        name={name}
        handleClick={handleLogginFormSubmit}
      />
    </div>
  )
}

export default App
