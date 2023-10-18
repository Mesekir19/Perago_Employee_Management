import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PositionDetails from "../components/PositionDetails";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { setPosition } from "../redux/actions";
import { db } from "../firebase-config";

function PositionDetailsContainer() {
  const { id } = useParams();
  const position = useSelector((state) => state.position);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosition = async () => {
      try {
        const positionDocRef = doc(db, "positions", id);
        const positionSnapshot = await getDoc(positionDocRef);
        const positionData = positionSnapshot.data();
        dispatch(setPosition(positionData));
      } catch (error) {
        console.log("Error fetching position:", error);
      }
    };

    fetchPosition();
  }, [dispatch, id]);

  return <PositionDetails position={position} />;
}

export default PositionDetailsContainer;
