import uuid from 'react-uuid'
export const initialState = {
  status: 'IDLE',
  title: 'New Title',
  notes: 'Your Notes',
  description: 'description description description blabalam ska ',
  taskList: [
    {
      taskId: uuid(),
      taskTitle: '1 task',
      isDone: true,
    },
  ],
}

export default function reducer(toDoItem, action) {
  switch (action.type) {
    case 'new': {
      return initialState
    }
    case 'fetchStart': {
      return { ...toDoItem, status: 'PENDING' }
    }
    case 'fetch': {
      const newTaskList = action.element.taskList.map((task) => {
        return { ...task, key: uuid() }
      })

      return { ...action.element, taskList: newTaskList, status: 'SUCCESS' }
    }
    case 'title': {
      return {
        ...toDoItem,
        title: action.element,
      }
    }
    case 'notes': {
      return {
        ...toDoItem,
        notes: action.element,
      }
    }
    case 'description': {
      return {
        ...toDoItem,
        description: action.element,
      }
    }
    case 'taskList': {
      return {
        ...toDoItem,
        taskList: action.element,
      }
    }
  }
  throw Error('Unknown action: ' + action.type)
}
