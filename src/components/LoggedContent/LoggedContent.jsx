import './LoggedContent.css'
import { Button, Checkbox, Input } from 'antd'
import React, { useReducer } from 'react'
import uuid from 'react-uuid'
import reducer from './LoggedContentReducer'

const initialItem = {
  id: '1todoId',
  userId: '1user',
  title: '1 sadtitle',
  notes: '1 notes notes',
  description: 'description description description blabalam ska ',
  taskList: [
    {
      taskId: uuid(),
      taskTitle: '1 task',
      isDone: true,
    },
    {
      taskId: uuid(),
      taskTitle: '2 task',
      isDone: false,
    },
    {
      taskId: uuid(),
      taskTitle: '3 task',
      isDone: true,
    },
    {
      taskId: uuid(),
      taskTitle: '4 task',
      isDone: false,
    },
  ],
}

export function LoggedContent({ current }) {
  //GET /todo/:todoId
  const [toDoItem, dispatch] = useReducer(reducer, initialItem)
  const { id, userId, title, notes, description, taskList } = toDoItem

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
        {taskList.map(({ taskTitle, isDone, taskId }) => (
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
      <Button>Save</Button>
    </div>
  )
}
