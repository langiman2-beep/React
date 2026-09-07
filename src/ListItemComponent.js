import React from "react";

const ListItemComponent = (props) => {
  return (
    <li key={props.id}>
      <b>{props.element}</b>
      Индекс: <i>{props.index}</i>
      Ключ-ID: <u>{props.id}</u>
      <button onClick={() => props.onDelete(props.id)}>Удалить</button>
    </li>
  );
};

export default ListItemComponent;
