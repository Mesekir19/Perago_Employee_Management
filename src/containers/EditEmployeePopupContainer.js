import { useSelector, useDispatch } from "react-redux";
import EditEmployees from "../components/EditEmployees";
// import { showSuccessMessage } from "../redux/actions";
import { db } from "../firebase-config";
import { doc, updateDoc } from "firebase/firestore";
import {
  setShowSuccessMessage,
} from "../redux/actions";
function EditEmployeePopupContainer({ isOpen, onClose, employee }) {
  const { showSuccessMessage } = useSelector((state) => state.employee);
  const dispatch = useDispatch();
  const {
    position,
    positions,
    description,
    name,
  } = useSelector((state) => state.position);

  const handleSave = async () => {
    try {
      // Update the employee data in Firestore
      const matchedPositions = positions.find((pos) => pos.name === position);
      const employeeRef = doc(db, "employees", employee.id);
      const UpdateEmp = {
        parentId: matchedPositions.id,
        name: position,
        employeeName: name,
        description: description,
      };
      await updateDoc(employeeRef, UpdateEmp);
      console.log("Employee updated successfully!");
      // Show the success message using Redux action
      
      dispatch(setShowSuccessMessage(true));

      // Close the popup after 2 seconds (you can adjust the duration as needed)
      setTimeout(() => {
        onClose();
      dispatch(setShowSuccessMessage(false));

        // window.location.reload();
      }, 3000);
    } catch (error) {
      console.log("Error updating employee:", error);
    }
  };

  return (
    <EditEmployees
      isOpen={isOpen}
      onClose={onClose}
      employee={employee}
      handleSave={handleSave}
      showSuccessMessage={showSuccessMessage}
    />
    
  );
}

export default EditEmployeePopupContainer;
