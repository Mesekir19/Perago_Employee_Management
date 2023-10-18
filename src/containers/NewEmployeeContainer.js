import { useSelector, useDispatch } from "react-redux";
import NewEmployee from "../components/NewEmployee";
import {
  setShowSuccessMessageE,
  setShowModalE,
  setShowNoPositionModalE,
  setPosition,
  setPositions,
} from "../redux/actions";
import { db } from "../firebase-config";
import { addDoc, doc, updateDoc, collection} from "firebase/firestore";

function NewEmployeeContainer() {
    // const positionsCollectionRef = collection(db, "positions");
  const employeesCollectionRef = collection(db, "employees");
  const { showModalE, showSuccessMessageE, showNoPositionModalE } = useSelector(
    (state) => state.employee
  );
    const { position, positions, description, name } = useSelector(
      (state) => state.position
    );

  const dispatch = useDispatch();

  const handleAddNewPosition2 = () => {
    dispatch(setShowModalE(true));
  };

  const handleCloseModal2 = () => {
    dispatch(setShowModalE(false));
  };

  const onSubmit = async (data) => {

    try {
      const matchedPosition = positions.find((pos) => pos.name === position);
    if (!matchedPosition) {
      dispatch(setShowNoPositionModalE(true));
      return;
    }
const newEmp = {
        id: "",
        employeeName: data.employeeName,
        parentId: matchedPosition.id,
        description: matchedPosition.description,
        name: matchedPosition.name,
      };

      const docRef = await addDoc(employeesCollectionRef, newEmp);
      const docId = docRef.id;
      const positionDocRef = doc(db, "employees", docId);
      await updateDoc(positionDocRef, { id: docId });
      dispatch(setShowSuccessMessageE(true));
      // dispatch(setShowSuccessMessageE(true));
    } catch (error) {
      console.log("Error fetching position:", error);
    }

    // Reset the form fields
    // reset();
    dispatch(setShowModalE(false))
  };


  return (
    <NewEmployee
      showModal={showModalE}
      handleAddNewPosition2={handleAddNewPosition2}
      handleCloseModal2={handleCloseModal2}
      onSubmit={onSubmit}
      showSuccessMessage={showSuccessMessageE}
      showNoPositionModal={showNoPositionModalE}
    />
  );
}

export default NewEmployeeContainer;
