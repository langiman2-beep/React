import { useState } from "react";
import HelloWorldComponent from "./HelloWorldComponent";
import MyClassComponent from "./MyClassComponent";
import CounterComponent from "./CounterComponent";
import ListComponent from "./ListComponent";
import "./App.css";

function App() {
  const showFunctional = true;

  return (
    <div className="App">
      <header className="App-header">
        {/* Игру и кнопку скрытия убрали к чертям, теперь уроки видны всегда! */}
        <div className="lessons-block">
          {showFunctional ? <HelloWorldComponent /> : <MyClassComponent />}
          <ListComponent />
          <CounterComponent />
        </div>
      </header>
    </div>
  );
}

export default App;
