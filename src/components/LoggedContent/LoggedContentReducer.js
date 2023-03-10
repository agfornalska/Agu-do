import uuid from 'react-uuid'
export default function reducer(toDoItem, action) {
  switch (action.type) {
    case 'none': {
      return {}
    }
    case 'fetch': {
      const newTaskList = action.element.taskList.map((task) => {
        return { ...task, key: uuid() }
      })

      return { ...action.element, taskList: newTaskList }
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
