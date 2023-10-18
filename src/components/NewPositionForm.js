import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Button, Center, Select, Modal, Text, TextInput } from "@mantine/core";
import { collection, getDocs, updateDoc, addDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";
import AddIcon from "@mui/icons-material/Add";
import {
  addPosition,
  setShowNoPositionModal,
  setShowSuccessMessage,
  setPositions,
  setPosition,
  setShowModal,
} from "../redux/actions";
import { Checks } from "tabler-icons-react";

function EmployeeForm() {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const { showModal, showSuccessMessage, showNoPositionModal } = useSelector(
    (state) => state.positionModal
  );
  const { position, positions } = useSelector((state) => state.position);
  const positionsCollectionRef = collection(db, "positions");

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const positionsSnapshot = await getDocs(positionsCollectionRef);
        const positionsData = positionsSnapshot.docs.map((doc) => doc.data());
        dispatch(addPosition(positionsData));
      } catch (error) {
        console.log("Error fetching positions:", error);
      }
    };
    fetchPositions();
  }, [dispatch]);

  const handleAddNewPosition = () => {
    dispatch(setShowModal(true));
  };

  const handleCloseModal = () => {
    dispatch(setShowModal(false));
  };

  const handleSavePosition = async (data) => {
    try {
      const matchedPositions = positions.find((pos) => pos.name === position);
      if (!matchedPositions) {
        dispatch(setShowNoPositionModal(true));
        setTimeout(() => {
          dispatch(setShowNoPositionModal(false));
        }, 2000);
        return;
      }

      const newEmp = {
        id: "",
        parentId: matchedPositions.id,
        name: data.positionName,
        description: data.positionDescription,
      };

      const docRef = await addDoc(positionsCollectionRef, newEmp);
      const docId = docRef.id;
      const positionDocRef = doc(db, "positions", docId);
      await updateDoc(positionDocRef, { id: docId });
      
        dispatch(setShowSuccessMessage(true));
        
      setTimeout(() => {
        dispatch(setShowSuccessMessage(false));

      }, 2000);
      
    } catch (error) {
      console.log("Error fetching position:", error);
    }
    reset();
    dispatch(setShowModal(false));
    dispatch(setPosition(null));
  };

  return (
    <div>
      <Button
        variant="filled"
        color="teal"
        onClick={handleAddNewPosition}
        style={{ margin: "1rem" }}
        className="bg-green-600"
      >
        <AddIcon style={{ marginRight: "0.5rem" }} /> Add New Position
      </Button>
      {showModal && (
        <Modal
          opened={showModal}
          onClose={handleCloseModal}
          title="Add New Position"
          styles={(theme) => ({
            header: {
              backgroundColor: "#c4bcbc",
              color: "black",
            },
            body: {
              backgroundColor: "#c4bcbc",
              color: "black",
            },
          })}
        >
          <div className="bg-[#c4bcbc] text-black">
            <form onSubmit={handleSubmit(handleSavePosition)}>
              {positions?.length > 0 && (
                <Select
                  id="position-select"
                  value={position}
                  onChange={(value) => dispatch(setPosition(value))}
                  required
                  placeholder="Select Parent Position"
                  data={positions.map((position) => ({
                    value: position.name,
                    label: position.name,
                  }))}
                  label="Parent Position"
                />
              )}
              <TextInput
                label="Position Name"
                id="new-position-name"
                {...register("positionName", { required: true })}
                style={{ marginBottom: "1rem" }}
              />
              <TextInput
                label="Position Description"
                id="new-position-description"
                {...register("positionDescription", { required: true })}
                style={{ marginBottom: "1rem" }}
              />
              <Button
                type="submit"
                variant="filled"
                className="bg-green-600 text-white hover:bg-green-500"
              >
                Save
              </Button>
            </form>
          </div>
        </Modal>
      )}
      {showSuccessMessage && (
        <Modal
          opened={showSuccessMessage}
          onClose={() => dispatch(setShowSuccessMessage(false))}
          
          hideCloseButton
          styles={(theme) => ({
            header: {
              backgroundColor: "#08c722",
              color: "black",
            },
            body: {
              backgroundColor: "#08c722",
              color: "black",
            },
          })}
        >
          <Checks size={60} className=" ml-44" />
          <div className=" text-black">
            <Text>Position has been successfully added.</Text>
          </div>
        </Modal>
      )}
      <Modal
        opened={showNoPositionModal}
        onClose={() => dispatch(setShowNoPositionModal(false))}
        title="Error"
        styles={(theme) => ({
          header: {
            backgroundColor: "red",
            color: "black",
          },
          body: {
            backgroundColor: "red",
            color: "black",
          },
        })}
      >
        <div className="">
          <Text>No such position name registered.</Text>
          <Center>
            <Button
              variant="light"
              color="teal"
              onClick={() => setShowNoPositionModal(false)}
              style={{ marginTop: "1rem" }}
            >
              Close
            </Button>
          </Center>
        </div>
      </Modal>
    </div>
  );
}

export default EmployeeForm;
