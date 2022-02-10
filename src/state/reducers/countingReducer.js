//created the function with parameters.
const reducer = (state = 0, action) => {
  // reads the action and returns a state.
  switch (action.type) {
    case "INCREMENT":
      return state + action.payload;
    case "DECREMENT":
      return state - action.payload;
    default:
      return state;
  }
};

//exporting the function.
export default reducer;
