import type { NextPage } from 'next';
import Head from 'next/head';
import { trpc } from '../utils/trpc';

import { FormEvent, useState } from 'react';

interface Todo {
  id: string;
  title: string;
  done: boolean;
}

const Home: NextPage = () => {
  const utils = trpc.proxy.useContext();
  const { data: todoList } = trpc.proxy.todo.getTodoList.useQuery();


  const { data: helloWithArgs } = trpc.proxy.todo.hello.useQuery({
    text: 'from trpc',
  });

  const { mutate } = trpc.proxy.todo.createTodo.useMutation({
    onSuccess: () => {
      utils.todo.getTodoList.invalidate();
    },
  });

  const { mutate: updateTodo } = trpc.proxy.todo.updateTodo.useMutation({
    onSuccess: () => {
      utils.todo.getTodoList.invalidate();
    },
  });

  const { mutate: deleteTodo } = trpc.proxy.todo.deleteTodo.useMutation({
    onSuccess: () => {
      utils.todo.getTodoList.invalidate();
    },
  });

  const [title, setTitle] = useState<Todo['title']>('');

  const addTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate({ title });
    setTitle('');
  };

  return (
    <>
      <Head>
        <title>TODO APP</title>
        <meta name="description" content="TODO APP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex justify-center items-center">
        <div className="flex flex-col pt-8 lg:w-2/5 sm:w-3/5 w-11/12 gap-4">
          <h1 className="text-5xl text-center leading-normal font-extrabold text-gray-700">
            TODO APP
          </h1>
          <p className="text-gray-500 mb-2">NextJs + prisma + trpc + zod</p>

          <div>
            <form onSubmit={addTodo}>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </form>
          </div>

          {todoList?.map((todo) => (
            <div key={todo.id} className="flex items-center gap-2">
              <div
                className={`flex flex-grow items-center gap-2 ${
                  todo.done ? `bg-green-200 line-through` : `bg-gray-200`
                } p-2 rounded cursor-pointer`}
              >
                <input
                  className="flex-none"
                  checked={todo.done}
                  id={todo.id}
                  type="checkbox"
                  onChange={() => {
                    updateTodo({ id: todo.id, done: !todo.done });
                  }}
                />

                <label className="flex-grow" htmlFor={todo.id}>
                  {todo.title}
                </label>
              </div>
              <button
                className="flex-none bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  deleteTodo({ id: todo.id });
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </main>

      <div className="text-center m-5">{helloWithArgs?.greeting}</div>
    </>
  );
};

export default Home;

interface Input {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ value, onChange }: Input) => {
  return (
    <div>
      <label
        htmlFor="price"
        className="block text-sm font-medium text-gray-700"
      >
        Create Todo
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
