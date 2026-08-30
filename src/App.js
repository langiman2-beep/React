import HelloWorldComponent from "./HelloWorldComponent";
import MyClassComponent from "./MyClassComponent";
import CounterComponent from "./CounterComponent";
import ListComponent from "./ListComponent";
import ListItemComponent from "./ListItemComponent";
import "./App.css";

function App() {
  const showFunctional = true;

  return (
    <div className="App">
      <header className="App-header">
        {showFunctional ? <HelloWorldComponent /> : <MyClassComponent />}
        <ListComponent />
        <CounterComponent />
      </header>
    </div>
  );
}

export default App;
