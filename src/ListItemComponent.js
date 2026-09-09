import React from "react";

const ListItemComponent = (props) => {
  return (
    <li>
      <b>{props.element}</b>
      Индекс: <i>{props.index}</i>
      Ключ-ID: <u>{props.id}</u>
      <button onClick={() => props.onDelete(props.id)}>Удалить</button>
    </li>
  );
};

export default ListItemComponent;
