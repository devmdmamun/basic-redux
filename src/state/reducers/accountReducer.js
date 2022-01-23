const reducer = (state = 0, action) => {
  switch (action.type) {
    case "DOPOSIT":
      return state + action.payload;
    case "WITHDRAW":
      return state - action.payload;
    default:
      return state;
  }
};

export default reducer;
