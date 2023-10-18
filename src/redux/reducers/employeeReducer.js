const initialState = {
  showModalE: false,
  showSuccessMessageE: false,
  showNoPositionModalE: false,
  showConfirmation: false,
  employeeIdToDelete: null,
  showSuccessMessage:false,
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SHOW_MODALE":
      return {
        ...state,
        showModalE: action.payload,
      };
    case "SET_SHOW_SUCCESS_MESSAGEE":
      return {
        ...state,
        showSuccessMessageE: action.payload,
      };
    case "SET_SHOW_NO_POSITION_MODALE":
      return {
        ...state,
        showNoPositionModalE: action.payload,
      };
    case "SET_SHOW_CONFIRMATION":
      return {
        ...state,
        showConfirmation: action.payload,
        employeeIdToDelete: action.employeeIdToDelete,
      };
    case "SET_SHOW_SUCCESS_MESSAGE":
      return {
        ...state,
        showSuccessMessage: action.payload,
      };
    default:
      return state;
  }
};

export default employeeReducer;
