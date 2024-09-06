import { fireEvent, render, screen } from '@testing-library/react';
import TodoForm from '../TodoForm';

describe('TodoForm', () => {
  const setup = () => {
    const onInsert = jest.fn();
    const utils = render(<TodoForm onInsert={onInsert} />);
    const input = screen.getByPlaceholderText('할 일을 입력하세요');
    const button = screen.getByText('등록하기');

    return {
      ...utils,
      input,
      button,
      onInsert,
    };
  };

  it('has input and a button', () => {
    const { input, button } = setup();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('changes input', () => {
    const { input } = setup();
    fireEvent.change(input, {
      target: {
        value: 'TDD-TODO',
      },
    });
    expect(input).toHaveAttribute('value', 'TDD-TODO');
  });

  it('calls onInsert and clears input', () => {
    const { input, button, onInsert } = setup();
    fireEvent.change(input, {
      target: {
        value: 'TDD-TODO',
      },
    });
    fireEvent.click(button);
    // onInsert('TDD-TODO')가 호출되었는지 확인한다.
    expect(onInsert).toHaveBeenCalledWith('TDD-TODO');
    // onInsert 실행 후 input이 비워졌는지 확인한다.
    expect(input).toHaveAttribute('value', '');
  });

  // input이 비어있을 때는 onInsert가 호출되지 않아야 한다.
  it('does not call onInsert when input is empty', () => {
    const { button, onInsert } = setup();
    fireEvent.click(button);
    // onInsert 함수가 호출되지 않아야 한다.
    expect(onInsert).not.toHaveBeenCalled();
  });
});
