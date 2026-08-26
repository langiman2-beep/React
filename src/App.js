import HelloWorldComponent from "./HelloWorldComponent";
import "./App.css";
import MyClassComponent from "./MyClassComponent";

function App() {
  const showFunctional = true;
  return (
    <div className="App">
      <header className="App-header">
        <p>Пробую ваять в React</p>
        {showFunctional ? <HelloWorldComponent /> : <MyClassComponent />}
      </header>
    </div>
  );
}

export default App;
