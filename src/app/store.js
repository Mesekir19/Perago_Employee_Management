// store.js
import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../redux/reducers/employeeReducer";
import positionReducer from "../redux/reducers/positionReducer";
import employeeTableReducer from "../redux/reducers/employeeTableReducer";
import modalReducer from "../redux/reducers/modalReducer";
import empOrPosi from "../redux/reducers/empOrPosi";
import newPositionModal from "../redux/reducers/newPositionModal";

const store = configureStore({
  reducer: {
    employee: employeeReducer,
    position: positionReducer,
    employeeTable: employeeTableReducer,
    addModal: modalReducer,
    addNewEmpOrPosi: empOrPosi,
    positionModal: newPositionModal,
  },
});

export default store;
