import TodoItem, { TodoProps } from '../TodoItem';
import { fireEvent, render, screen } from '@testing-library/react';

describe('TodoItem', () => {
  const mockTodo = {
    id: 1,
    text: 'TODO-TDD',
    done: false,
  };

  const setup = (props = {} as TodoProps) => {
    const onRemove = jest.fn();
    const handleCheckBox = jest.fn();
    const initialProps = { todo: mockTodo };
    const utils = render(
      <TodoItem
        {...initialProps}
        {...props}
        onRemove={onRemove}
        handleCheckBox={handleCheckBox}
      />
    );
    const todo = props.todo || initialProps.todo;
    const input = screen.getByLabelText(todo.text, { selector: 'input' });
    const label = screen.getByText(todo.text);
    const button = screen.getByText('삭제');

    return {
      ...utils,
      input,
      label,
      button,
      onRemove,
      handleCheckBox,
    };
  };

  // input, label, button이 존재하는지 확인한다.
  it('has input, label, and a button', () => {
    const { input, label, button } = setup();

    expect(input).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  // done 값이 true일 때 checkbox가 체크되고, text 부분은 line-through 스타일이 적용되어야 한다.
  it('does not show check and line-through when done in false', () => {
    const { input, label } = setup({ todo: { ...mockTodo, done: false } });
    expect(input).not.toBeChecked();
    expect(label).not.toHaveClass('line-through');
  });

  // 삭제 버튼이 클릭되었을 때 onRemove 함수가 호출되어야 한다.
  it('calls onRemove when button is clicked', () => {
    const { button, onRemove } = setup();
    fireEvent.click(button);
    expect(onRemove).toHaveBeenCalledWith(mockTodo.id);
  });

  // 체크박스가 클릭되었을 때 handleCheckBox 함수가 호출되어야 한다.
  it('calls handleCheckBox when checkbox is clicked', () => {
    const { input, handleCheckBox } = setup();
    fireEvent.click(input);
    expect(handleCheckBox).toHaveBeenCalledWith(mockTodo.id, !mockTodo.done);
  });
});
