import { rest } from 'msw'
import {
  DeleteTodoParams,
  ErrorResponse,
  Task,
  Todo,
  TodoBody,
  TodoSnippetResponse,
  User,
  UserBody,
} from './types'

const validateUser = (
  userId: string | null
): { message: string; status: number } | null => {
  if (!userId) {
    return {
      message: 'Header user-id is not defined',
      status: 403,
    }
  }
  const sessionUsers = localStorage.getItem('users')

  if (!sessionUsers) {
    return {
      message: "Can't retrieve users from database",
      status: 500,
    }
  }

  const users = JSON.parse(sessionUsers) as User[]

  if (!users.some(({ id }) => id === userId)) {
    return {
      message: 'This user id is not valid',
      status: 403,
    }
  }

  return null
}

const isUserBody = (obj: unknown): obj is UserBody => {
  if (
    obj &&
    typeof obj === 'object' &&
    'userName' in obj &&
    typeof obj.userName === 'string'
  ) {
    return true
  }
  return false
}

const isTask = (obj: unknown): obj is Task => {
  if (!obj || typeof obj !== 'object') return false
  if (!('taskTitle' in obj) || typeof obj.taskTitle !== 'string') return false
  if (!('isDone' in obj) || typeof obj.isDone !== 'boolean') return false
  return true
}

const isTodoBody = (obj: unknown): obj is TodoBody => {
  if (!obj || typeof obj !== 'object') return false
  if (!('title' in obj) || typeof obj.title !== 'string') return false
  if (!('notes' in obj) || typeof obj.notes !== 'string') return false
  if (!('description' in obj) || typeof obj.description !== 'string')
    return false
  if (!('taskList' in obj) || !Array.isArray(obj.taskList)) return false
  const isTaskListCorrect = obj.taskList.every(isTask)
  if (!isTaskListCorrect) return false
  return true
}

export const handlers = [
  rest.get<never, never, TodoSnippetResponse | ErrorResponse>(
    '/todo',
    (req, res, ctx) => {
      const userId = req.headers.get('user-id')
      const validationResult = validateUser(userId)
      if (validationResult) {
        return res(
          ctx.status(validationResult.status),
          ctx.json({
            errorMessage: validationResult.message,
          })
        )
      }

      const sesionTodos = localStorage.getItem('todos')

      if (!sesionTodos) {
        return res(
          ctx.status(500),
          ctx.json({
            errorMessage: "Can't retrieve snippets from database",
          })
        )
      }

      const todos = JSON.parse(sesionTodos) as Todo[]
      const userSnippets = todos
        .filter((todo) => todo.userId === userId)
        .map(({ id, title, description, userId }) => ({
          id,
          title,
          userId,
          snippet: description.slice(0, 50),
        }))

      return res(
        ctx.status(200),
        ctx.json({
          snippets: userSnippets,
        })
      )
    }
  ),

  rest.post<TodoBody, never, Todo | ErrorResponse>(
    '/todo',
    async (req, res, ctx) => {
      const userId = req.headers.get('user-id')
      const validationResult = validateUser(userId)
      if (validationResult) {
        return res(
          ctx.status(validationResult.status),
          ctx.json({
            errorMessage: validationResult.message,
          })
        )
      }

      const body: unknown = await req.json()

      if (!isTodoBody(body)) {
        return res(
          ctx.status(400),
          ctx.json({
            errorMessage: 'Request body is invalid',
          })
        )
      }

      const sesionTodos = localStorage.getItem('todos')

      if (!sesionTodos) {
        return res(
          ctx.status(500),
          ctx.json({
            errorMessage: "Can't retrieve todos from database",
          })
        )
      }

      const todos = JSON.parse(sesionTodos) as Todo[]

      const newTodo: Todo = {
        ...body,
        id: crypto.randomUUID(),
        userId: userId as string,
      }

      localStorage.setItem('todos', JSON.stringify(todos.concat(newTodo)))

      return res(ctx.status(200), ctx.json(newTodo))
    }
  ),

  rest.delete<never, DeleteTodoParams, never | ErrorResponse>(
    '/todo/:todoId',
    async (req, res, ctx) => {
      const userId = req.headers.get('user-id')
      const validationResult = validateUser(userId)
      if (validationResult) {
        return res(
          ctx.status(validationResult.status),
          ctx.json({
            errorMessage: validationResult.message,
          })
        )
      }

      const sesionTodos = localStorage.getItem('todos')

      if (!sesionTodos) {
        return res(
          ctx.status(500),
          ctx.json({
            errorMessage: "Can't retrieve todos from database",
          })
        )
      }

      const todos = JSON.parse(sesionTodos) as Todo[]

      const todoId = req.params.todoId

      if (todos.every((todo) => todo.id !== todoId)) {
        return res(
          ctx.status(400),
          ctx.json({
            errorMessage: 'Todo is already deleted',
          })
        )
      }

      localStorage.setItem(
        'todos',
        JSON.stringify(todos.filter((todo) => todo.id !== todoId))
      )

      return res(ctx.status(204))
    }
  ),

  rest.get<never, DeleteTodoParams, Todo | ErrorResponse>(
    '/todo/:todoId',
    async (req, res, ctx) => {
      const userId = req.headers.get('user-id')
      const validationResult = validateUser(userId)
      if (validationResult) {
        return res(
          ctx.status(validationResult.status),
          ctx.json({
            errorMessage: validationResult.message,
          })
        )
      }

      const sesionTodos = localStorage.getItem('todos')

      if (!sesionTodos) {
        return res(
          ctx.status(500),
          ctx.json({
            errorMessage: "Can't retrieve todos from database",
          })
        )
      }

      const todos = JSON.parse(sesionTodos) as Todo[]

      const todoId = req.params.todoId
      const todo = todos.find((todo) => todo.id === todoId)

      if (!todo) {
        return res(
          ctx.status(400),
          ctx.json({
            errorMessage: "Can't find todo with this id",
          })
        )
      }

      return res(ctx.status(200), ctx.json(todo))
    }
  ),

  rest.put<TodoBody, DeleteTodoParams, Todo | ErrorResponse>(
    '/todo/:todoId',
    async (req, res, ctx) => {
      const userId = req.headers.get('user-id')
      const validationResult = validateUser(userId)
      if (validationResult) {
        return res(
          ctx.status(validationResult.status),
          ctx.json({
            errorMessage: validationResult.message,
          })
        )
      }

      const body: unknown = await req.json()

      if (!isTodoBody(body)) {
        return res(
          ctx.status(400),
          ctx.json({
            errorMessage: 'Request body is invalid',
          })
        )
      }

      const sesionTodos = localStorage.getItem('todos')

      if (!sesionTodos) {
        return res(
          ctx.status(500),
          ctx.json({
            errorMessage: "Can't retrieve todos from database",
          })
        )
      }

      const todos = JSON.parse(sesionTodos) as Todo[]

      const todoId = req.params.todoId
      const todo = todos.find((todo) => todo.id === todoId)

      if (!todo) {
        return res(
          ctx.status(400),
          ctx.json({
            errorMessage: "Can't find todo with this id",
          })
        )
      }

      const newTodo: Todo = {
        ...todo,
        ...body,
      }
      const newTodos: Todo[] = todos.map((todo) => {
        if (todo.id !== todoId) return todo
        return newTodo
      })

      localStorage.setItem('todos', JSON.stringify(newTodos))

      return res(ctx.status(200), ctx.json(newTodo))
    }
  ),

  rest.post<UserBody, never, User | ErrorResponse>(
    '/auth',
    async (req, res, ctx) => {
      const body: unknown = await req.json()

      if (!isUserBody(body)) {
        return res(
          ctx.status(400),
          ctx.json({
            errorMessage: 'Request body is invalid',
          })
        )
      }

      const sessionUsers = localStorage.getItem('users')

      if (!sessionUsers) {
        return res(
          ctx.status(500),
          ctx.json({
            errorMessage: "Can't retrieve users from database",
          })
        )
      }

      const users = JSON.parse(sessionUsers) as User[]
      const loggingUser = users.find((user) => user.name === body.userName)

      if (!loggingUser) {
        return res(
          ctx.status(403),
          ctx.json({
            errorMessage: 'There is no user with this name',
          })
        )
      }

      return res(ctx.status(200), ctx.json(loggingUser))
    }
  ),

  rest.post<UserBody, never, User | ErrorResponse>(
    '/user',
    async (req, res, ctx) => {
      const body: unknown = await req.json()

      if (!isUserBody(body)) {
        return res(
          ctx.status(400),
          ctx.json({
            errorMessage: 'Request body is invalid',
          })
        )
      }

      const sessionUsers = localStorage.getItem('users')

      if (!sessionUsers) {
        return res(
          ctx.status(500),
          ctx.json({
            errorMessage: "Can't retrieve users from database",
          })
        )
      }

      const users = JSON.parse(sessionUsers) as User[]

      if (users.some((user) => user.name === body.userName)) {
        return res(
          ctx.status(400),
          ctx.json({
            errorMessage: 'User with this name already exists',
          })
        )
      }

      const newUser: User = {
        id: crypto.randomUUID(),
        name: body.userName,
      }

      localStorage.setItem('users', JSON.stringify(users.concat(newUser)))

      return res(ctx.status(200), ctx.json(newUser))
    }
  ),
]
