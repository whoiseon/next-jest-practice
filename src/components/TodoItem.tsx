'use client';

import { useCallback } from 'react';

export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export interface TodoProps {
  todo: Todo;
}

export interface TodoItemProps extends TodoProps {
  onRemove: (id: number) => void;
  handleCheckBox: (id: number, done: boolean) => void;
}

function TodoItem({ todo, onRemove, handleCheckBox }: TodoItemProps) {
  const { id, text, done } = todo;

  const handleRemove = useCallback(() => {
    onRemove(id);
  }, [id, onRemove]);

  return (
    <li>
      <input
        type="checkbox"
        id={text}
        checked={done}
        onChange={() => handleCheckBox(id, !done)}
      />
      <label htmlFor={text} className={`${done ? 'line-through' : ''}`}>
        {text}
      </label>
      <button type="button" onClick={handleRemove}>
        삭제
      </button>
    </li>
  );
}

export default TodoItem;
