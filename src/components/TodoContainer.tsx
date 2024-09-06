'use client';

import { useCallback, useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import { Todo } from './TodoItem';
import TodoList from './TodoList';

function TodoContainer() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const onInsert = useCallback(
    (value: string) => {
      const nextId = todos[todos.length - 1]
        ? todos[todos.length - 1].id + 1
        : 1;
      const newTodo = {
        id: nextId,
        text: value,
        done: false,
      };

      setTodos((todo) => [...todo, newTodo]);
    },
    [todos]
  );

  const handleRemove = useCallback((id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  const handleCheckBox = useCallback(
    (id: number, done: boolean) => {
      const filtered = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done };
        }

        return todo;
      });

      setTodos(filtered);
    },
    [todos]
  );

  useEffect(() => {
    const data = [
      {
        id: 1,
        text: 'TODO-TDD',
        done: true,
      },
      {
        id: 2,
        text: 'TODO-REACT',
        done: true,
      },
    ];
    setTodos(data);
  }, []);

  return (
    <div className="flex flex-col gap-y-4">
      <TodoForm onInsert={onInsert} />
      <TodoList
        todos={todos}
        onRemove={handleRemove}
        handleCheckBox={handleCheckBox}
      />
    </div>
  );
}

export default TodoContainer;
