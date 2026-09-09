import React, { useState, useEffect } from "react";
import ListItemComponent from "./ListItemComponent";
import { MassivData } from "./MassivData";

const ListComponent = () => {
  const [input, setInput] = useState("");

  const [item, setItem] = useState(() => {
    const savedItems = localStorage.getItem("my_todo_list");
    return savedItems ? JSON.parse(savedItems) : MassivData;
  });

  useEffect(() => {
    localStorage.setItem("my_todo_list", JSON.stringify(item));
  }, [item]);

  const onClickHandler = (input) => {
    if (!input.trim()) return; // Защита от пустых тыканий
    const updatedElement = [...item, { id: Date.now(), name: input }];
    setItem(updatedElement);
    setInput("");
  };

  const deleteItemHandler = (idToDelete) => {
    const filteredArray = item.filter((element) => element.id !== idToDelete);
    setItem(filteredArray);
  };

  const clearListHandler = () => {
    setItem(MassivData);
  };

  const onChangeHandler = (e) => {
    setInput(e.target.value);
  };

  const onKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      onClickHandler(input);
    }
  };

  return (
    <>
      <input
        onKeyDown={onKeyDownHandler}
        onChange={onChangeHandler}
        value={input}
      />
      <p>Количество тыканий: {item.length}</p>

      <ul>
        {item.map((element, index) => (
          <ListItemComponent
            key={element.id}
            id={element.id}
            element={element.name}
            index={index}
            onDelete={deleteItemHandler}
          />
        ))}
      </ul>

      <button onClick={() => onClickHandler(input)}>Добавить элемент</button>

      <button
        onClick={clearListHandler}
        style={{
          marginLeft: "10px",
          backgroundColor: "#ff4d4d",
          color: "white",
        }}
      >
        Очистить всё
      </button>
    </>
  );
};

export default ListComponent;
