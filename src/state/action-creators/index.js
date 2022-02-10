export const increment = (ammount) => {
  return (dispatch) => {
    dispatch({
      type: "INCREMENT",
      payload: ammount,
    });
  };
};

export const decrement = (ammount) => {
  return (dispatch) => {
    dispatch({
      type: "DECREMENT",
      payload: ammount,
    });
  };
};
