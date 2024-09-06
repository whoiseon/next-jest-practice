import {
  fireEvent,
  getByPlaceholderText,
  render,
  screen,
} from '@testing-library/react';
import TodoContainer from '../TodoContainer';

describe('TodoContainer', () => {
  it('renders TodoForm and TodoList', () => {
    render(<TodoContainer />);
    screen.getByText('등록하기');
    screen.getByTestId('TodoList');
  });

  it('renders two default todos', () => {
    render(<TodoContainer />);
    screen.getByText('TODO-TDD');
    screen.getByText('TODO-REACT');
  });

  it('creates a new todo', () => {
    render(<TodoContainer />);
    const input = screen.getByPlaceholderText('할 일을 입력하세요');
    const button = screen.getByText('등록하기');
    fireEvent.change(input, {
      target: {
        value: 'NEW-TODO',
      },
    });
    fireEvent.click(button);
    screen.getByText('NEW-TODO');
  });

  it('remove a todo', () => {
    render(<TodoContainer />);
    const todoText = screen.getByText('TODO-TDD');
    const removeButton = screen.getAllByText('삭제')[0];
    fireEvent.click(removeButton);
    // 페이지에서 사라졌음을 의미한다.
    expect(todoText).not.toBeInTheDocument();
  });
});
