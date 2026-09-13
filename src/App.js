import { useState } from "react";
import Hrestiki from "./components/Hrestiki";
import HelloWorldComponent from "./HelloWorldComponent";
import MyClassComponent from "./MyClassComponent";
import CounterComponent from "./CounterComponent";
import ListComponent from "./ListComponent";
import "./App.css";

function App() {
  const showFunctional = true;
  const [showLessons, setShowLessons] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <Hrestiki />
        <button
          onClick={() => setShowLessons(!showLessons)}
          style={{
            margin: "40px 0",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          {showLessons ? "Сховати старі уроки" : "Показати старі уроки"}
        </button>
        {showLessons && (
          <div className="lessons-block">
            {showFunctional ? <HelloWorldComponent /> : <MyClassComponent />}
            <ListComponent />
            <CounterComponent />
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
