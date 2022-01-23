import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./state/index";

function App() {
  const account = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const { dipositMoney, withdrawMoney } = bindActionCreators(
    actionCreators,
    dispatch
  );

  return (
    <div className="App">
      <h2>{account}</h2>
      <button onClick={() => dipositMoney(100)}>Diposit</button>
      <button onClick={() => withdrawMoney(100)}>Withdraw</button>
    </div>
  );
}

export default App;
