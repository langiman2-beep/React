import React, { useState } from "react";
import ListItemComponent from "./ListItemComponent";

const ListComponent = () => {
  const [input, setInput] = useState("");
  const [item, setItem] = useState(["First Element"]);

  const onClickHandler = (input) => {
    const updatedElement = [...item, input];
    setItem(updatedElement);
    setInput("");
  };

  const onChangeHandler = (e) => {
    const value = e.target.value;
    setInput(value);
  };
  return (
    <>
      <input onChange={onChangeHandler} value={input} />
      <p>Количество тыканий: {item.length}</p>

      <ul>
        {item.map((element, index) => (
          <ListItemComponent element={element} index={index} />
        ))}
      </ul>
      <button onClick={() => onClickHandler(input)}>Add new element</button>
    </>
  );
};

export default ListComponent;
