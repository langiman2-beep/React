import React, { useState, useEffect } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import ListItemComponent from "./ListItemComponent";

const ListComponent = () => {
  const [input, setInput] = useState("");

  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Крутилка завантаження (по умолчанию включена)
  const [error, setError] = useState(null); // Сюда текст ошибки, если сервер ляжет

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await axios.get("http://localhost:3030/todos");
        setItem(response.data);
      } catch (err) {
        setError("Не вдалося завантажити дані");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const onClickHandler = async (input) => {
    if (!input.trim()) return; // Защита от пустых тыканий

    try {
      // 1. Собираем мешок с данными для новой задачи
      const newTodo = {
        title: input, // Название задачи берём из инпута
        description: "Опис завдання", // Описание по умолчанию
        checked: false, // По умолчанию задача не выполнена
        creationDate: new Date().toLocaleDateString("uk-UA"), // Ставим текущую дату
      };

      // 2. Отправляем Аксиос на сервер с методом POST и дарим ему этот мешок
      const response = await axios.post("http://localhost:3030/todos", newTodo);

      // 3. Сервер сохранил задачу в db.json и вернул её нам уже со своим уникальным ID!
      // Закидываем её в наш стейт, чтобы она тут же отобразилась на экране
      setItem((prevItem) => [...prevItem, response.data]);

      setInput(""); // Очищаем поле ввода для новой записи
    } catch (err) {
      setError("Не вдалося додати завдання");
    }
  };

  const deleteItemHandler = async (idToDelete) => {
    try {
      // 1. Командуем Аксиосу удалить задачу с конкретным ID прямо из файла на сервере
      await axios.delete(`http://localhost:3030/todos/${idToDelete}`);

      // 2. Если сервер успешно стёр строчку, мы убираем её и с экрана нашего сайта
      const filteredArray = item.filter((element) => element.id !== idToDelete);
      setItem(filteredArray);
    } catch (err) {
      setError("Не вдалося видалити завдання");
    }
  };

  const toggleItemHandler = async (id, currentChecked) => {
    try {
      // 1. Отправляем PATCH запрос на сервер и меняем checked на противоположный
      const response = await axios.patch(`http://localhost:3030/todos/${id}`, {
        checked: !currentChecked,
      });

      // 2. Обновляем массив на экране, чтобы текст зачеркнулся
      setItem(
        item.map((element) => (element.id === id ? response.data : element)),
      );
    } catch (err) {
      setError("Не вдалося оновити статус");
    }
  };

  const clearListHandler = () => {
    // Просто передаём в стейт пустой массив, чтобы мгновенно очистить экран!
    setItem([]);
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

      {/* 📍 Проверяем нашу лампочку. Если идёт загрузка — показываем текст. Если нет — показываем всё остальное! */}
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0",
          }}
        >
          <ClipLoader color="#36d7b7" size={50} />
        </div>
      ) : (
        <>
          <p>Кількість завдань: {item.length}</p>

          {/* Пункт 3 домашки: если тудушек на сервере нет вообще — пишем текст  */}
          {item.length === 0 ? (
            <p>Наразі у вас немає ще завдань</p>
          ) : (
            <ul>
              {item.map((element, index) => (
                <ListItemComponent
                  key={element.id}
                  id={element.id}
                  element={element}
                  index={index}
                  onDelete={deleteItemHandler}
                  onToggle={toggleItemHandler}
                />
              ))}
            </ul>
          )}
        </>
      )}

      {/* 📍 Если в коробке error появится текст — он красиво выведется красным цветом! */}
      {error && (
        <p style={{ color: "red", fontWeight: "bold", textAlign: "center" }}>
          ⚠️ {error}
        </p>
      )}

      <button onClick={() => onClickHandler(input)}>Додати елемент</button>

      <button
        onClick={clearListHandler}
        style={{
          marginLeft: "10px",
          backgroundColor: "#ff4d4d",
          color: "white",
        }}
      >
        Очистити все
      </button>
    </>
  );
};

export default ListComponent;
