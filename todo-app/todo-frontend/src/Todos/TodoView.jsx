import { useEffect, useRef, useState } from 'react'
import axios from '../util/apiClient'
import List from './List'
import Form from './Form'

const TodoView = () => {
  const [todos, setTodos] = useState([])
  const [addedTodos, setAddedTodos] = useState()
  const [statisticsError, setStatisticsError] = useState(false)
  const todosRequestId = useRef(0)

  const refreshTodos = async () => {
    const requestId = ++todosRequestId.current
    const { data } = await axios.get('/todos')
    if (requestId === todosRequestId.current) {
      setTodos(data)
    }
  }

  const refreshStatistics = async () => {
    try {
      const { data } = await axios.get('/todos/statistics')
      setAddedTodos(data.added_todos)
      setStatisticsError(false)
    } catch (error) {
      console.error('Failed to fetch todo statistics', error)
      setStatisticsError(true)
    }
  }

  useEffect(() => {
    refreshTodos()
    refreshStatistics()
  }, [])

  const createTodo = async (todo) => {
    const { data } = await axios.post('/todos', todo)
    todosRequestId.current += 1
    setTodos(currentTodos => [...currentTodos, data])
    refreshStatistics()
  }

  const deleteTodo = async (todo) => {
    await axios.delete(`/todos/${todo._id}`)
    refreshTodos()
  }

  const completeTodo = async (todo) => {
    await axios.put(`/todos/${todo._id}`, {
      text: todo.text,
      done: true
    })
    refreshTodos()
  }

  return (
    <>
      <h1>Todos</h1>
      <p>
        Added todos:{' '}
        {statisticsError
          ? 'statistics unavailable'
          : addedTodos === undefined
            ? 'loading...'
            : addedTodos === null
              ? 'statistics unavailable (Redis is disabled)'
              : addedTodos}
      </p>
      <Form createTodo={createTodo} />
      <List todos={todos} deleteTodo={deleteTodo} completeTodo={completeTodo} />
    </>
  )
}

export default TodoView
