import { fireEvent, render, screen } from '@testing-library/react';
import TodoList from '../TodoList';
import { Todo } from '../TodoItem';

describe('TodoList', () => {
  const mockTodos: Todo[] = [
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

  const setup = () => {
    const onRemove = jest.fn();
    const handleCheckBox = jest.fn();
    const utils = render(
      <TodoList
        todos={mockTodos}
        onRemove={onRemove}
        handleCheckBox={handleCheckBox}
      />
    );

    return { ...utils, onRemove };
  };

  // todoList 컴포넌트에 todos들이 렌더링 되어야 한다.
  it('renders todos properly', () => {
    setup();
    mockTodos.forEach((todo) => {
      screen.getByText(todo.text);
    });
  });

  // props로 전달된 onRemove 함수가 정상적으로 호출되는지 확인한다.
  it('calls onRemove', () => {
    const { onRemove } = setup();
    const removeButton = screen.getAllByText('삭제', { selector: 'button' })[0];
    fireEvent.click(removeButton);
    expect(onRemove).toHaveBeenCalledWith(mockTodos[0].id);
  });
});
