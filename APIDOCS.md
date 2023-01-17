# Custom api mocks documentation for Agu-do app by [neupatryk](https://github.com/neupatryk)

## Authorization

For every call to the api user have to provide user id in header. To get this id you need to use:

```http
POST /auth
```

#### Request body

```javascript
{
  userName: string
}
```

#### Response Body

```javascript
{
  name: string
  id: string
}
```

## User creation

If user is not yet defined you need to follow these steps for creation:

```http
POST /user
```

#### Request body

```javascript
{
  userName: string
}
```

#### Response Body

```javascript
{
  name: string
  id: string
}
```

## Todo functionality

To use any endopoint from this list you need to provide header with user id for current user.
| Header | Type | Description |
| :--- | :--- | :--- |
| `user-id` | `string` | **Required**. User id to validate which user is accessing data |

### Get all snippets for current user

Snippets are simplified list of todo items without all fields. Todo item description is cut and only 50 characters are passed in field snippet. When reading this list you should expect that snippet is only part of longer text from the fulle todo item.

```http
GET /todo
```

#### Response Body

```javascript
{
  snippets: [
    {
      id: string
      title: string
      snippet: string
      userId: string
    }
  ]
}
```

### Add new todo for current user

```http
POST /todo
```

#### Request body

```javascript
{
  title: string
  notes: string
  description: string
  taskList: [
    {
      taskTitle: string
      isDone: boolean
    }
  ]
}
```

#### Response Body

```javascript
{
  id: string
  userId: string
  title: string
  notes: string
  description: string
  taskList: [
    {
      taskTitle: string
      isDone: boolean
    }
  ]
}
```

### Delete todo item

```http
DELETE /todo/:todoId
```

| Param    | Type     | Description                   |
| :------- | :------- | :---------------------------- |
| `todoId` | `string` | **Required**. Id of todo item |

### Get details of todo item

```http
GET /todo/:todoId
```

| Param    | Type     | Description                   |
| :------- | :------- | :---------------------------- |
| `todoId` | `string` | **Required**. Id of todo item |

#### Response Body

```javascript
{
  id: string
  userId: string
  title: string
  notes: string
  description: string
  taskList: [
    {
      taskTitle: string
      isDone: boolean
    }
  ]
}
```

### Update existing todo item

```http
PUT /todo/:todoId
```

#### Request body

```javascript
{
  title: string
  notes: string
  description: string
  taskList: [
    {
      taskTitle: string
      isDone: boolean
    }
  ]
}
```

#### Response Body

```javascript
{
  id: string
  userId: string
  title: string
  notes: string
  description: string
  taskList: [
    {
      taskTitle: string
      isDone: boolean
    }
  ]
}
```

## Error handling

If for any reason server will detect issue it should response with following type.

```javascript
{
  errorMessage: string
}
```
