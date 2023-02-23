import './LoggedContent.css'
import { Button, Checkbox, Input } from 'antd'
import React, { useState } from 'react'
import uuid from 'react-uuid'

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
  const [toDoItem, setToDoItem] = useState(initialItem)
  const { id, userId, title, notes, description, taskList } = toDoItem

  function handleCheckbox(checkedTitle, event) {
    const newTaskList = taskList.map((task) => {
      if (task.taskTitle === checkedTitle)
        return { ...task, isDone: event.target.checked }
      return task
    })

    setToDoItem({ ...toDoItem, taskList: newTaskList })
  }

  function handleInput(changedTitle, event) {
    console.log(
      '🚀 ~ file: LoggedContent.js:47 ~ handleInput ~ changedTitle:',
      changedTitle
    )
    const newTaskList = taskList.map((task) => {
      if (task.taskTitle === changedTitle)
        return { ...task, taskTitle: event.target.value }
      return task
    })
    console.log(
      '🚀 ~ file: LoggedContent.js:52 ~ newTaskList ~ newTaskList:',
      newTaskList
    )

    setToDoItem({ ...toDoItem, taskList: newTaskList })
  }

  return (
    <div className='box'>
      <div>{title}</div>
      <div>{description}</div>
      <div className='check-list'>
        {taskList.map(({ taskTitle, isDone, taskId }) => (
          <ul key={taskId}>
            <div>
              <Checkbox
                checked={isDone}
                onChange={(event) => handleCheckbox(taskTitle, event)}
              >
                <Input
                  defaultValue='new assigment'
                  value={taskTitle}
                  onChange={(event) => handleInput(taskTitle, event)}
                ></Input>
              </Checkbox>
            </div>
          </ul>
        ))}
      </div>
      <div>{notes}</div>
      <Button>Save</Button>
    </div>
  )
}
