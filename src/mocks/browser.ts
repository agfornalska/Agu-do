import { setupWorker } from 'msw'
import { handlers } from './handlers'
import { Todo, User } from './types'

const initialUser: User = {
  id: crypto.randomUUID(),
  name: 'Agu',
}

const initialUsers: User[] = [initialUser]

const initialTodos: Todo[] = [
  {
    id: crypto.randomUUID(),
    title: 'Todo app work',
    userId: initialUser.id,
    taskList: [
      {
        taskTitle: 'Finish project',
        isDone: false,
      },
    ],
    notes: '',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla finibus dignissim elementum. Suspendisse pretium suscipit risus et vestibulum. Ut quis erat ac orci dictum convallis. Sed pellentesque eros nisl, at laoreet nulla gravida eget. Sed porttitor arcu id pharetra lobortis. Integer rutrum aliquet tincidunt. Cras et lectus sit amet tortor pellentesque pulvinar et at massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam eu massa rutrum, varius mi eu, dignissim massa. Etiam tempor nibh ac ultrices pretium. Nulla finibus quam ut est convallis lobortis. Nullam tellus neque, ultricies finibus pharetra sit amet, varius et neque.',
  },
]

// localStorage.setItem('users', JSON.stringify(initialUsers))
// localStorage.setItem('todos', JSON.stringify(initialTodos))

export const worker = setupWorker(...handlers)
