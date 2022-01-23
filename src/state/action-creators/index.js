export const dipositMoney = (ammount) => {
  return (dispatch) => {
    dispatch({
      type: "DOPOSIT",
      payload: ammount,
    });
  };
};

export const withdrawMoney = (ammount) => {
  return (dispatch) => {
    dispatch({
      type: "WITHDRAW",
      payload: ammount,
    });
  };
};
