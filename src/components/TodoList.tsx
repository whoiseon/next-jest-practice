'use client';

import TodoItem, { Todo } from './TodoItem';

interface Props {
  todos: Todo[];
  onRemove: (id: number) => void;
  handleCheckBox: (id: number, done: boolean) => void;
}

function TodoList({ todos, onRemove, handleCheckBox }: Props) {
  return (
    <ul data-testid="TodoList">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onRemove={onRemove}
          handleCheckBox={handleCheckBox}
        />
      ))}
    </ul>
  );
}

export default TodoList;
