import {
  useState,
  useEffect,
  useContext,
  createContext,
  useReducer,
  useRef,
} from "react";

import "./App.css";

const moods = {
  happy: "happy",
  sad: "sad",
};

const MoodContext = createContext(moods);

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return state + 1;

    case "decrement":
      return state - 1;

    default:
      throw new Error();
  }
}

function App() {
  const [count, setCount] = useState(0);

  //mostly used to catch DOM elements from HTML to perform any native action on it
  const refCount = useRef(0);

  //similar to useState but gives state and dispatch
  const [state, dispatch] = useReducer(reducer, 0);
  useEffect(() => {
    console.log("Hi from mounting!");

    return () => console.log("by from unmounting!");
  }, [count]);
  return (
    <MoodContext.Provider value={moods.sad}>
      <button onClick={() => setCount(count + 1)}>
        Hello from div again {count}
      </button>
      <button ref={refCount}>useRef button</button>
      <p>useReducer count value :{state}</p>
      <button onClick={() => dispatch({ type: "increment" })}>
        useReducer increment count
      </button>
      <button onClick={() => dispatch({ type: "decrement" })}>
        useReducer decrement count
      </button>
      <MoodEmoji />
    </MoodContext.Provider>
  );
}

function MoodEmoji() {
  const mood = useContext(MoodContext);
  return <p>{mood}</p>;
}

// Lifecycle methods are of 3 types in react - Mounting, Updating and Unmounting(render function is only required, all else are optional and are called when we define them
// like componentDidMount, getStateDerivedProps, getBeforeUpdate)

// class Car extends Component {
//   constructor(props) {
//     super();
//     this.props = props;
//     this.state = { color: "red" };
//   }
//   render() {
//     return (
//       <h2>
//         I am a {this.state.color} Car! and this is the prop passed to my class
//         component {this.props.model}
//       </h2>
//     );
//   }
// }

export default App;
