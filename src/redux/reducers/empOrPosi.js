const initialState = {
  newEmpOrPosi: null,
};

const empOrPosi = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NEW_EMP_OR_POSI":
      return {
        ...state,
        newEmpOrPosi: action.payload,
      };
    default:
      return state;
  }
};

export default empOrPosi;