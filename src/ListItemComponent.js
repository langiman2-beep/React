import React from "react";

const ListItemComponent = (props) => {
  // Вытаскиваем из нашего элемента название, дату и статус, чтобы код был чистым
  const title = props.element?.title || props.element;
  const date = props.element?.creationDate || "Нет даты";
  const checked = props.element?.checked || false;

  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "8px",
      }}
    >
      {/* 📍 Галочка статуса: если checked равен true — она будет стоять, если false — будет пустой */}
      <input
        type="checkbox"
        checked={checked}
        onChange={() => props.onToggle(props.id, checked)}
      />

      {/* Название задачи */}
      <b style={{ textDecoration: checked ? "line-through" : "none" }}>
        {title}
      </b>

      {/* 📍 Красивый вывод даты создания задачи */}
      <span style={{ color: "#888", fontSize: "12px" }}>({date})</span>

      <button
        onClick={() => props.onDelete(props.id)}
        style={{ marginLeft: "auto" }}
      >
        Удалить
      </button>
    </li>
  );
};

export default ListItemComponent;
