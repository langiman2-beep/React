import { Component } from "react";

class MyClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Sacha",
      age: 43,
    };
  }
  render() {
    return (
      <div>
        <h1>Классовый компонент {this.state.name}</h1>
      </div>
    );
  }
}

export default MyClassComponent;
