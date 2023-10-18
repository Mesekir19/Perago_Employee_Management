import { useSelector, useDispatch } from "react-redux";
import Add from "../components/Add";
import { showModal, hideModal, setIsModalVisible, setNewEmpOrPosi } from "../redux/actions";
import { useEffect } from "react";
function AddButtonContainer() {
  const { isModalVisible, modalType } = useSelector((state) => state.addModal);
  const { newEmpOrPosi } = useSelector((state) => state.addNewEmpOrPosi);
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    // Show the modal using Redux action
    dispatch(setIsModalVisible(true));
    dispatch(showModal(modalType));
  };

  const handleClose = () => {
    // Hide the modal using Redux action
    dispatch(setIsModalVisible(false));
    dispatch(hideModal());
  };

  const handleAddEmployee = () => {
  const emppos = "employee";
    console.log("Add employee "+ newEmpOrPosi);
    dispatch(setNewEmpOrPosi(emppos));
    console.log("Add employee " + newEmpOrPosi);


  };

  const handleAddPosition = () => {
  const emppos = "position";
    console.log("Add Position " + newEmpOrPosi);
    dispatch(setNewEmpOrPosi(emppos));
    console.log("Add position " + newEmpOrPosi);


  };
  useEffect(() => {
    console.log("newEmpOrPosi updated:", newEmpOrPosi);
    // Perform any actions you want to do with the updated value here
  }, [newEmpOrPosi]);

  return (
    <Add
      visible={isModalVisible}
      onClose={handleClose}
      onOpen={handleButtonClick}
      onAddEmployee={handleAddEmployee}
      onAddPosition={handleAddPosition}
      addModal={newEmpOrPosi}
    />
  );
}

export default AddButtonContainer;
