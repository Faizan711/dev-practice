import { Component } from "react";

import "./App.css";

function App() {
  return (
    <div>
      Hello from div again
      <Car model="mustang" />
    </div>
  );
}

// Lifecycle methods are of 3 types in react - Mounting, Updating and Unmounting(render function is only required, all else are optional and are called when we define them
// like componentDidMount, getStateDerivedProps, getBeforeUpdate)

class Car extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = { color: "red" };
  }
  render() {
    return (
      <h2>
        I am a {this.state.color} Car! and this is the prop passed to my class
        component {this.props.model}
      </h2>
    );
  }
}

export default App;
