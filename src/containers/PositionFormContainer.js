import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PositionForm from "../components/PositionForm";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc, getDocs, onSnapshot, query, where, } from "firebase/firestore";
// import { setPosition } from "../redux/actions";
import { db } from "../firebase-config";
import { setPosition, setPositions, setEmployees, setName, setDescription } from "../redux/actions";
import {
  setParentID,
} from "../redux/actions/positionFormAction";

function PositionFormContainer() {
  const { id } = useParams();
  const {positions, position, employees, name, parentID, description} = useSelector((state) => state.position);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosition = async () => {
      try {
        const positionDocRef = doc(db, "positions", id);
        const positionSnapshot = await getDoc(positionDocRef);
        const positionData = positionSnapshot.data();
        dispatch(setParentID(positionData.parentId));

        dispatch(setPosition(positionData));
        dispatch(setName(positionData.name));
        dispatch(setDescription(positionData.description));

        const childrenQuerySnapshot = await getDocs(
          query(
            collection(db, "positions"),
            where("id", "==", positionData.parentId)
          )
        );

        // Dispatch the query snapshot's data instead of the whole snapshot
        // If there's only one child, access the name directly
        const childData = childrenQuerySnapshot.docs[0]?.data(); // Use optional chaining to handle empty array case
        if (childData) {
          dispatch(setParentID(childData));
        }
        console.log(childData.name);
      } catch (error) {
        console.log("Error fetching position:", error);
      }
    };

    const fetchPositions = async () => {
      try {
        const positionsCollectionRef = collection(db, "positions");
        const positionsSnapshot = await getDocs(positionsCollectionRef);
        const positionsData = positionsSnapshot.docs.map((doc) => doc.data());
        dispatch(setPositions(positionsData));
      } catch (error) {
        console.log("Error fetching positions:", error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const employeesCollectionRef = collection(db, "employees");
        const employeesSnapshot = await getDocs(employeesCollectionRef);
        const employeesData = employeesSnapshot.docs.map((doc) => doc.data());
        dispatch(setEmployees(employeesData));
      } catch (error) {
        console.log("Error fetching employees:", error);
      }
    };

    const unsubscribe = onSnapshot(doc(db, "positions", id), (snapshot) => {
      if (snapshot.exists()) {
        const positionData = snapshot.data();
        dispatch(setPosition(positionData));
      }
    });

    fetchPosition();
    fetchPositions(); // Fetch positions data
    fetchEmployees();

    return () => {
      unsubscribe();
    };
  }, [dispatch, id]);
  useEffect(() => {
    // Set up the real-time listener for employees collection
    const unsubscribe2 = onSnapshot(collection(db, "employees"), (snapshot) => {
      const employeesData = snapshot.docs.map((doc) => doc.data());
      dispatch(setEmployees(employeesData));
    });

    return () => {
      unsubscribe2();
    };
  }, [dispatch]);

  return (
    <PositionForm
      // positions={positions}
      // position={position}
      // employees={employees}
      // name={name}
      // description={description}
    />
  );
}

export default PositionFormContainer;
