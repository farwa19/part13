const Todo = ({ todo, deleteTodo, completeTodo }) => {
  return (
    <li>
      {todo.text}

      <button onClick={() => completeTodo(todo)}>
        Set as done
      </button>

      <button onClick={() => deleteTodo(todo)}>
        Delete
      </button>
    </li>
  )
}

export default Todo
