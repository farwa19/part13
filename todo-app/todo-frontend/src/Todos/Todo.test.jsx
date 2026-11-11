import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import Todo from './Todo'

test('renders todo text', () => {
  const todo = { _id: '1', text: 'Test todo', done: false }
  render(<Todo todo={todo} deleteTodo={() => {}} completeTodo={() => {}} />)
  expect(screen.getByText('Test todo')).toBeTruthy()
})


