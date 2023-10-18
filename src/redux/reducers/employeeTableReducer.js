const initialState = {
  search: "",
  data: [],
  sortBy: null,
  reverseSortDirection: false,
  sortedData: [],
  page: 1,
  perPage: 10,
  totalPages: 0,
  isPopupOpen: false,
  selectedEmployee: null,
  isDeleteOpen: false,
  selectedEmployeeDelete: null,
};

const employeeTableReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return {
        ...state,
        search: action.payload,
      };
    case "SET_SORT_BY":
      return {
        ...state,
        sortBy: action.payload,
      };
    case "SET_REVERSE_SORT_DIRECTION":
      return {
        ...state,
        reverseSortDirection: action.payload,
      };
    case "SET_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "SET_SORTED_DATA":
      return {
        ...state,
        sortedData: action.payload,
      };
    case "SET_PAGE":
      return {
        ...state,
        page: action.payload,
      };
    case "SET_PER_PAGE":
      return {
        ...state,
        perPage: action.payload,
      };
    case "SET_TOTAL_PAGES":
      return {
        ...state,
        totalPages: action.payload,
      };
    case "SET_SELECTED_EMPLOYEE":
      return {
        ...state,
        selectedEmployee: action.payload,
      };
    case "SET_IS_POPUP_OPEN":
      return {
        ...state,
        isPopupOpen: action.payload,
      };
    case "SET_SELECTED_EMPLOYEE_DELETE":
      return {
        ...state,
        selectedEmployeeDelete: action.payload,
      };
    case "SET_IS_DELETE_OPEN":
      return {
        ...state,
        isDeleteOpen: action.payload,
      };
    default:
      return state;
  }
};

export default employeeTableReducer;
