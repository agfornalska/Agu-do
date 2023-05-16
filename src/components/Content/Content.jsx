//import './Content.css'
import { Button, Checkbox, Input } from 'antd'
import React from 'react'
import uuid from 'react-uuid'

export default function Content({
  title,
  description,
  taskList,
  notes,
  saveItem,
  setCurrentItem,
}) {
  function handleInput(type, newElement, taskId) {
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
            snippet: newElement.substring(0, 50),
            description: newElement,
          }
        }
        case 'taskList': {
          const newTaskList = taskList.map((task) => {
            if (task.key === taskId) {
              return { ...task, taskTitle: newElement }
            }
            return task
          })
          return {
            taskList: newTaskList,
          }
        }

        case 'taskListChecked': {
          const newTaskList = taskList.map((task) => {
            if (task.key === taskId) {
              return { ...task, isDone: newElement }
            }
            return task
          })
          return {
            taskList: newTaskList,
          }
        }

        case 'newTaskList': {
          const newTaskList = [
            ...taskList,
            {
              taskTitle: null,
              isDone: false,
              key: uuid(),
            },
          ]

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
        placeholder='New Title'
        value={title}
        onChange={(event) => handleInput('title', event.target.value)}
      />
      <Input
        placeholder='Your Descripton'
        value={description}
        onChange={(event) => handleInput('description', event.target.value)}
      />
      <div className='check-list'>
        {taskList?.map(({ taskTitle, isDone, key }) => (
          <ul key={key}>
            <div>
              <Checkbox
                checked={isDone}
                onChange={(event) =>
                  handleInput('taskListChecked', event.target.checked, key)
                }
              >
                <Input
                  placeholder='New Assigment'
                  value={taskTitle}
                  onChange={(event) =>
                    handleInput('taskList', event.target.value, key)
                  }
                />
              </Checkbox>
            </div>
          </ul>
        ))}

        <Button onClick={(event) => handleInput('newTaskList', event)}>
          Add task
        </Button>
      </div>
      <Input
        placeholder='Your Notes'
        value={notes}
        onChange={(event) => handleInput('notes', event.target.value)}
      />
      <Button onClick={saveItem}>Save</Button>
    </div>
  )
}
