import React, { useRef, useState } from "react";

const Todo = () => {
  const [TodoList, setTodoList] = useState([]);
  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") {
      return null;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };

    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  const deleteTodo = (id) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
      {/* ----  title  ---- */}
      <div className="flex items-center mt-7 gap-2">
        <h1 className="text-2xl font-semibold">ToDo List</h1>
      </div>

      {/* ----  input box  ---- */}
      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-7 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="add your task "
        />
        <button
          onClick={add}
          className="border-none rounded-full bg-green-600 w-32 h-14 text-white text-lg font-medium cursor-pointer"
        >
          ADD+
        </button>
      </div>

      {/* ----  todo list  ---- */}
      <div className="my-3">
        {TodoList.length > 0 ? (
          TodoList.map((item) => (
            <div key={item.id} className="flex items-center gap-2 mb-2">
              <div className="flex flex-1 items-center cursor-pointer">
                <button
                  onClick={() => toggleComplete(item.id)}
                  className={`border-none rounded-full w-20 h-9 text-lg font-medium cursor-pointer ${
                    item.isComplete ? "bg-blue-600" : "bg-red-600"
                  } text-white`}
                >
                  {item.isComplete ? "SAVED" : "SAVE"}
                </button>
                <p className={`ml-12 text-[17px] ${item.isComplete ? "line-through text-gray-400" : "text-slate-700"}`}>
                  {item.text}
                </p>
              </div>

              <div>
                <button
                  onClick={() => deleteTodo(item.id)}
                  className="border-none rounded-full bg-orange-700 w-20 h-9 text-white text-lg font-medium cursor-pointer"
                >
                  DELETE
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-slate-500">No tasks added yet</p>
        )}
      </div>
    </div>
  );
};

export default Todo;
