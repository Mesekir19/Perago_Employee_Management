export const toggleSidebar = () => ({
  type: "TOGGLE_SIDEBAR",
});
export const setPositions = (positions) => ({
  type: "SET_POSITIONS",
  payload: positions,
});
export const setPosition = (position) => ({
  type: "SET_POSITION",
  payload: position,
});
export const setName = (name) => ({
  type: "SET_NAME",
  payload: name,
});
export const setDescription = (description) => ({
  type: "SET_DESCRIPTION",
  payload: description,
});

export const showSuccessMessage = (show) => ({
  type: "SHOW_SUCCESS_MESSAGE",
  payload: show,
});

export const showNoPositionModal = (show) => ({
  type: "SHOW_NO_POSITION_MODAL",
  payload: show,
});
export const showConfirmation = (show, employeeIdToDelete) => ({
  type: "SHOW_CONFIRMATION",
  payload: show,
  employeeIdToDelete,
});
export const setShowConfirmation = (show) => ({
  type: "SET_SHOW_CONFIRMATION",
  payload: show,
});
export const showModal = (modalType) => ({
  type: "SHOW_MODAL",
  payload: modalType,
});
export const showModalE = (modalType) => ({
  type: "SHOW_MODALE",
  payload: modalType,
});
export const setShowModalE = (modalType) => ({
  type: "SET_SHOW_MODALE",
  payload: modalType,
});
export const setShowModal = (modalType) => ({
  type: "SET_SHOW_MODAL",
  payload: modalType,
});

export const showModalState = (modalType) => ({
  type: "SHOW_MODAL_STATE",
  payload: modalType,
});
export const hideModal = () => ({
  type: "HIDE_MODAL",
});
export const setActiveItem = (itemName) => ({
  type: "SET_ACTIVE_ITEM",
  payload: itemName,
});

export const addNewPosition = (data) => ({
  type: "ADD_NEW_POSITION",
  payload: data,
});
export const addPosition = (position) => {
  return {
    type: "ADD_POSITION",
    payload: position,
  };
};
export const setShowNoPositionModal = (show) => ({
  type: "SET_SHOW_NO_POSITION_MODAL",
  payload: show,
});
export const setShowNoPositionModalE = (show) => ({
  type: "SET_SHOW_NO_POSITION_MODALE",
  payload: show,
});

export const setSearchTerm = (term) => ({
  type: "SET_SEARCH_TERM",
  payload: term,
});

export const setSortBy = (field) => ({
  type: "SET_SORT_BY",
  payload: field,
});

export const setReverseSortDirection = (reverse) => ({
  type: "SET_REVERSE_SORT_DIRECTION",
  payload: reverse,
});

export const setData = (data) => ({
  type: "SET_DATA",
  payload: data,
});
export const setSortedData = (sortedData) => ({
  type: "SET_SORTED_DATA",
  payload: sortedData,
});

export const setSelectedEmployee = (employee) => ({
  type: "SET_SELECTED_EMPLOYEE",
  payload: employee,
});
export const setSelectedPosition = (position) => ({
  type: "SET_SELECTED_POSITION",
  payload: position,
});
export const setSelectedDescription = (description) => ({
  type: "SET_SELECTED_DESCRIPTION",
  payload: description,
});

export const setIsPopupOpen = (isOpen) => ({
  type: "SET_IS_POPUP_OPEN",
  payload: isOpen,
});

export const setIsModalVisible = (modalType) => ({
  type: "SET_IS_MODAL_VISIBLE",
  payload: modalType,
});
export const setSelectedEmployeeDelete = (employeeId) => ({
  type: "SET_SELECTED_EMPLOYEE_DELETE",
  payload: employeeId,
});

export const setIsDeleteOpen = (isOpen) => ({
  type: "SET_IS_DELETE_OPEN",
  payload: isOpen,
});

export const setTotalPages = (totalPages) => ({
  type: "SET_TOTAL_PAGES",
  payload: totalPages,
});

export const setPage = (page) => ({
  type: "SET_PAGE",
  payload: page,
});

export const setPerPage = (perPage) => ({
  type: "SET_PER_PAGE",
  payload: perPage,
});
export const setShowSuccessMessage = (showSuccess) => ({
  type: "SET_SHOW_SUCCESS_MESSAGE",
  payload: showSuccess,
});
export const setShowSuccessMessageE = (showSuccess) => ({
  type: "SET_SHOW_SUCCESS_MESSAGEE",
  payload: showSuccess,
});
export const setNewEmpOrPosi = (emppos) => ({
  type: "SET_NEW_EMP_OR_POSI",
  payload: emppos,
});
export const setShowModalForNewPosition = (pos) => ({
  type: "SET_SHOW_MODAL_FOR_NEW_POSITION",
  payload: pos,
});
export const setEmployees = (emp) => ({
  type: "SET_EMPLOYEES",
  payload: emp,
});