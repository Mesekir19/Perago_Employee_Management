import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PositionsList from "../components/PositionList";
import { collection, getDocs,onSnapshot } from "firebase/firestore";
import { setPositions } from "../redux/actions";
import { db } from "../firebase-config";

const positionsCollectionRef = collection(db, "positions");

function PositionsListContainer() {
  const {positions} = useSelector((state) => state.position);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [localPositions, setLocalPositions] = useState(null);


  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const unsubscribe = onSnapshot(positionsCollectionRef, (snapshot) => {
          const positionsData = snapshot.docs.map((doc) => doc.data());
          // Update the local state directly
          setLocalPositions(positionsData);
          // Set isLoading to false once data is fetched
          setIsLoading(false);
        });

        // Cleanup the listener when the component unmounts
        return () => unsubscribe();
      } catch (error) {
        console.log("Error fetching positions:", error);
      }
    };
    console.log("main positions:"+ positions)
    fetchPositions();
  }, []);
    useEffect(() => {
      // Dispatch setPositions action only when the component is mounted
      if (!isLoading) {
        dispatch(setPositions(localPositions));
      }
    }, [dispatch, isLoading, localPositions]);

  return <PositionsList positions={positions} />;
}

export default PositionsListContainer;
