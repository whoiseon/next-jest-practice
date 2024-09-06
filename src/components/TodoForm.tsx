'use client';

import { ChangeEvent, FormEvent, useState } from 'react';

interface Props {
  onInsert: (value: string) => void;
}

function TodoForm({ onInsert }: Props) {
  const [value, setValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;
    onInsert(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-[400px]">
      <div className="flex items-center">
        <input
          className="bg-transparent text-neutral-100 placeholder:text-neutral-400 flex-1 h-[38px] border-[1px] border-r-0 border-neutral-700 px-3 text-sm outline-none"
          placeholder="할 일을 입력하세요"
          value={value}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-[80px] h-[38px] bg-green-400 hover:bg-green-300 text-[#121212] text-sm font-bold">
          등록하기
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
