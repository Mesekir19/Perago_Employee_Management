import { useSelector, useDispatch } from "react-redux";
import DeleteEmployeePopup from "../components/DeleteEmployeePopup";
import { showConfirmation } from "../redux/actions";
import { db } from "../firebase-config";
import { deleteDoc, doc } from "firebase/firestore";
import { setShowConfirmation, } from "../redux/actions";
function DeleteEmployeePopupContainer({
  employeeId,
  isOpen,
  onClose,
  onConfirmDelete,
}) {
  const { showConfirmation, employeeIdToDelete } = useSelector(
    (state) => state.employee
  );
  const dispatch = useDispatch();

  const handleDelete = () => {
    // Show the confirmation using Redux action
    dispatch(setShowConfirmation(true));
  };

  const handleConfirmDelete = async () => {
    try {
      const employeeRef = doc(db, "employees", employeeId);
      await deleteDoc(employeeRef);
      // onConfirmDelete();
    } catch (error) {
      console.log("Error deleting employee:", error);
    }
    dispatch(setShowConfirmation(false));
    // Close the popup after confirming delete (if needed)
    onClose();
  };

  const handleCancelDelete = () => {
    // Hide the confirmation using Redux action
    dispatch(setShowConfirmation(false));
  };

  return (
    <DeleteEmployeePopup
      employeeId={employeeId}
      isOpen={isOpen}
      onClose={onClose}
      onConfirmDelete={onConfirmDelete}
      showConfirmation={showConfirmation}
      handleDelete={handleDelete}
      handleConfirmDelete={handleConfirmDelete}
      handleCancelDelete={handleCancelDelete}
    />
  );
}

export default DeleteEmployeePopupContainer;
