const initialState = {
  isModalVisible: false,
  modalType: null,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_MODAL":
      return {
        ...state,
        isModalVisible: true,
        modalType: action.payload,
      };
    case "HIDE_MODAL":
      return {
        ...state,
        isModalVisible: false,
        modalType: null,
      };
    default:
      return state;
  }
};

export default modalReducer;
