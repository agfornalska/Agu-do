export interface User {
  name: string
  id: string
}

export interface Task {
  taskTitle: string
  isDone: boolean
}

export interface TodoSnippet {
  id: string
  title: string
  snippet: string
  userId: string
}

export interface Todo extends Omit<TodoSnippet, 'snippet'> {
  taskList: Task[]
  notes: string
  description: string
}

export interface ErrorResponse {
  errorMessage: string
}

export interface TodoSnippetResponse {
  snippets: TodoSnippet[]
}

export interface UserBody {
  userName: string
}

export interface TodoBody extends Omit<Todo, 'snippet' | 'id' | 'userId'> {}

export interface DeleteTodoParams {
  todoId: string
}
