import React, { useState } from "react";
import ListItemComponent from "./ListItemComponent";
import { MassivData } from "./MassivData";

const ListComponent = () => {
  const [input, setInput] = useState("");
  const [item, setItem] = useState(MassivData);

  const onClickHandler = (input) => {
    const updatedElement = [...item, { id: Date.now(), name: input }];
    setItem(updatedElement);
    setInput("");
  };

  const deleteItemHandler = (idToDelete) => {
    const filteredArray = item.filter((element) => element.id !== idToDelete);
    setItem(filteredArray);
  };

  const onChangeHandler = (e) => {
    const value = e.target.value;
    setInput(value);
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
    </>
  );
};

export default ListComponent;
