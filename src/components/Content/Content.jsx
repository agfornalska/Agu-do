//import './Content.css'
import { Button, Checkbox, Input } from 'antd'
import React from 'react'

export default function Content({
  title,
  description,
  taskList,
  notes,
  saveItem,
  setCurrentItem,
}) {
  function handleInput(type, event, taskId) {
    const newElement = event.target.value
      ? event.target.value
      : event.target.checked

    function getNewItem() {
      //nasz todoitem
      switch (type) {
        case 'title': {
          return {
            title: newElement,
          }
        }
        case 'notes': {
          return {
            notes: newElement,
          }
        }
        case 'description': {
          return {
            description: newElement,
          }
        }
        case 'taskList': {
          const newTaskList = taskList.map((task) => {
            if (task.taskId === taskId) {
              if (typeof newElement === 'boolean') {
                return { ...task, isDone: newElement }
              } else {
                return { ...task, taskTitle: newElement }
              }
            }
            return task
          })

          return {
            taskList: newTaskList,
          }
        }
      }
    }

    setCurrentItem(getNewItem)
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
                onChange={(event) => handleInput('taskList', event)}
              >
                <Input
                  defaultValue='new assigment'
                  value={taskTitle}
                  onChange={(event) => handleInput('taskList', event)}
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
      <Button onClick={saveItem}>Save</Button>
    </div>
  )
}
