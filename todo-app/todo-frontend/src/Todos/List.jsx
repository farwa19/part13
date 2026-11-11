import Todo from './Todo'

const List = ({ todos, deleteTodo, completeTodo }) => {
  return (
    <ul>
      {todos.map(todo =>
        <Todo
          key={todo._id}
          todo={todo}
          deleteTodo={deleteTodo}
          completeTodo={completeTodo}
        />
      )}
    </ul>
  )
}

export default List