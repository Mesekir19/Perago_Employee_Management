// src/redux/reducers/positionReducer.js

const initialState = {
  showModal: false,
  showSuccessMessage: false,
  showNoPositionModal: false,
  position: "",
  positions: [],
};

const newPositionModal = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SHOW_MODAL":
      return { ...state, showModal: action.payload };
    case "SET_SHOW_SUCCESS_MESSAGE":
      return { ...state, showSuccessMessage: action.payload };
    case "SET_SHOW_NO_POSITION_MODAL":
      return { ...state, showNoPositionModal: action.payload };
    case "SET_POSITION":
      return { ...state, position: action.payload };
    case "SET_POSITIONS":
      return { ...state, positions: action.payload };
    case "ADD_POSITION":
      return {
        ...state,
        positions: [...state.positions, action.payload],
      };
    default:
      return state;
  }
};

export default newPositionModal;
