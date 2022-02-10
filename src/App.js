import "./App.css";
// import useSelector & useDispatch from react-redux
import { useSelector, useDispatch } from "react-redux";
// import bindActionCreators from redux
import { bindActionCreators } from "redux";
// import actionCreators
import { actionCreators } from "./state/index";

function App() {
  const count = useSelector((state) => state.count);
  console.log(count);
  // assigned useDispatch to dispatch variable.
  const dispatch = useDispatch();

  // destructuring increment and decrement actions
  const { increment, decrement } = bindActionCreators(actionCreators, dispatch);

  return (
    <div className="App">
      <h2>{count}</h2>
      <button onClick={() => increment(100)}>increment</button>
      <button onClick={() => decrement(100)}>decrement</button>
    </div>
  );
}

export default App;
