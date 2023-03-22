import './LoggedContent.css'
import { Button, Checkbox, Input } from 'antd'
import React, { useReducer, useEffect, useRef } from 'react'
import reducer, { initialState } from './LoggedContentReducer'

export function LoggedContent({ idUser, current }) {
  //GET /todo/:todoId
  const [toDoItem, dispatch] = useReducer(reducer, initialState)
  const { title, notes, description, taskList, status } = toDoItem
  console.log(
    '🚀 ~ file: LoggedContent.jsx:10 ~ LoggedContent ~ toDoItem:',
    toDoItem
  )
  const { id: currentId, isNew } = current

  const lastFetchedId = useRef(null)

  useEffect(() => {
    //ten sam itemek
    //Agudo - feczowanie kiedy nie ma w lokalnej bazie itemka! lub tworzenie nowego . ZADANIE NA jutro
    if (currentId === lastFetchedId.current) return
    dispatch({ type: 'new' })
  }, [currentId])

  useEffect(() => {
    if (isNew) return
    if (status !== 'IDLE') return

    lastFetchedId.current = currentId

    async function fetchItems() {
      dispatch({ type: 'fetchStart' })
      const response = await fetch(`/todo/${currentId}`, {
        method: 'GET',
        headers: {
          'user-id': idUser,
        },
      })

      const responseBody = await response.json()

      if (responseBody.errorMessage) {
        console.error(responseBody.errorMessage)
        return
      }

      dispatch({ type: 'fetch', element: responseBody })
    }

    fetchItems()
  }, [currentId, dispatch, idUser, isNew, status])

  function handleTaskList(type, taskId, event) {
    const newTaskList = taskList.map((task) => {
      if (task.taskId === taskId) {
        if (type === 'checked') {
          return { ...task, isDone: event.target.checked }
        }
        if (type === 'changed') {
          return { ...task, taskTitle: event.target.value }
        }
      }
      return task
    })

    dispatch({ type: 'taskList', element: newTaskList })
  }

  function handleInput(type, event) {
    const newElement = event.target.value
    dispatch({ type, element: newElement })
  }
  function saveItem() {
    console.log('clicked')
  }
  return (
    <div className='box'>
      <Input
        defaultValue='new title'
        value={title}
        onChange={(event) => handleInput('title', event)}
      />
      <Input
        defaultValue='description'
        value={description}
        onChange={(event) => handleInput('description', event)}
      />
      <div className='check-list'>
        {taskList?.map(({ taskTitle, isDone, taskId }) => (
          <ul key={taskId}>
            <div>
              <Checkbox
                checked={isDone}
                onChange={(event) => handleTaskList('checked', taskId, event)}
              >
                <Input
                  defaultValue='new assigment'
                  value={taskTitle}
                  onChange={(event) => handleTaskList('changed', taskId, event)}
                />
              </Checkbox>
            </div>
          </ul>
        ))}
      </div>
      <Input
        defaultValue='your notes'
        value={notes}
        onChange={(event) => handleInput('notes', event)}
      />
      <Button onClick={() => saveItem()}>Save</Button>
    </div>
  )
}
