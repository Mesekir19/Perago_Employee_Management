import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  TextInput,
  Select,
  Modal,
  Paper,
  Text,
  Center,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  setShowSuccessMessageE,
  setShowNoPositionModalE,
  setPosition,
  setPositions,
} from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { getDocs, doc, collection } from "firebase/firestore";
import { Checks } from "tabler-icons-react";
const NewEmployee = ({
  showModal,
  handleAddNewPosition2,
  handleCloseModal2,
  onSubmit,
  showSuccessMessage,
  showNoPositionModal,
}) => {
  const dispatch=useDispatch();
  const { register, handleSubmit, reset } = useForm();
const { position, positions } = useSelector(
  (state) => state.position
);
  const positionsCollectionRef = collection(db, "positions");
  // const employeesCollectionRef = collection(db, "employees");
  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const positionsSnapshot = await getDocs(positionsCollectionRef);
        const positionsData = positionsSnapshot.docs.map((doc) => doc.data());
        dispatch(setPositions(positionsData))
      } catch (error) {
        console.log("Error fetching positions:", error);
      }
    };

    fetchPositions();
  }, []);
  return (
    <div>
      <Button
        variant="filled"
        color="teal"
        className="bg-green-600"
        onClick={handleAddNewPosition2}
        style={{ margin: "1rem" }}
      >
        <PersonAddIcon style={{ marginRight: "0.5rem" }} /> Add New Employee
      </Button>
      <Modal
        opened={showModal}
        onClose={handleCloseModal2}
        title="Add New Employee"
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: "1rem" }}>
            <TextInput
              label="Employee Name"
              id="employee-name"
              required
              {...register("employeeName")}
            />
          </div>
          <div>
            {positions?.length > 0 && (
              <Select
                id="position-select"
                value={position}
                onChange={(value) => dispatch(setPosition(value))}
                required
                placeholder="Select Postion"
                data={positions.map((position) => ({
                  value: position.name,
                  label: position.name,
                }))}
                label="Position"
              />
            )}
          </div>
          <Button
            type="submit"
            variant="light"
            color="teal"
            style={{ marginTop: "1rem" }}
            className=" bg-green-600 hover:bg-green-500 text-white"
          >
            Submit
          </Button>
        </form>
      </Modal>
      <Modal
        opened={showSuccessMessage}
        onClose={() => dispatch(setShowSuccessMessageE(false))}
        
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
        <div style={{ padding: "1rem" }}>
          <Text>Employee has been successfully added.</Text>
        </div>
      </Modal>
      <Modal
        opened={showNoPositionModal}
        onClose={() => dispatch(setShowNoPositionModalE(false))}
        title="Error"
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
        <div style={{ padding: "1rem" }}>
          <Text>No such position name registered.</Text>
          <Center>
            <Button
              variant="light"
              color="teal"
              onClick={() => dispatch(setShowNoPositionModalE(false))}
              style={{ marginTop: "1rem" }}
            >
              Close
            </Button>
          </Center>
        </div>
      </Modal>
    </div>
  );
};

export default NewEmployee;
