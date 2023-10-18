const initialState = {
  position: null,
  positions: null,
  description: null,
  parentID: null,
  name: null,
  employees: null,
  showSuccessMessage: false,
  showDeletePrompt: false,
  deleteModalOpen: false,
  employeesToDelete: [],
  deleteEmployeesModalOpen: false,
  showDeleteSuccessMessage: false,
  childPositions: [],
};

const positionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_POSITION":
      return {
        ...state,
        position: action.payload,
      };
    case "SET_SELECTED_POSITION":
      return {
        ...state,
        position: action.payload,
      };
    case "SET_POSITIONS":
      return {
        ...state,
        positions: action.payload,
      };
    case "SET_DESCRIPTION":
      return {
        ...state,
        description: action.payload,
      };
    case "SET_SELECTED_DESCRIPTION":
      return {
        ...state,
        description: action.payload,
      };
    case "SET_NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "SET_EMPLOYEES":
      return {
        ...state,
        employees: action.payload,
      };
    case "SET_SHOW_SUCCESS_MESSAGE":
      return {
        ...state,
        showSuccessMessage: action.payload,
      };
    case "SET_SHOW_DELETE_PROMPT":
      return {
        ...state,
        showDeletePrompt: action.payload,
      };
    case "SET_DELETE_MODAL_OPEN":
      return {
        ...state,
        deleteModalOpen: action.payload,
      };
    case "SET_EMPLOYEES_TO_DELETE":
      return {
        ...state,
        employeesToDelete: action.payload,
      };
    case "SET_DELETE_EMPLOYEES_MODAL_OPEN":
      return {
        ...state,
        deleteEmployeesModalOpen: action.payload,
      };
    case "SET_SHOW_DELETE_SUCCESS_MESSAGE":
      return {
        ...state,
        showDeleteSuccessMessage: action.payload,
      };
    case "SET_CHILD_POSITIONS":
      return {
        ...state,
        childPositions: action.payload,
      };
    case "SET_PARENT_ID":
      return {
        ...state,
        parentID: action.payload,
      };
    default:
      return state;
  }
};

export default positionReducer;
