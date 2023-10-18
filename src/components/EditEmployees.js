import React, { useEffect, useState } from "react";
import {
  Modal,
  Paper,
  TextInput,
  Textarea,
  Text,
  Button,
  Select,
  useMantineTheme,
} from "@mantine/core";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useDispatch, useSelector } from "react-redux";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  setPosition,
  setPositions,
  setDescription,
  setName,
  setShowSuccessMessage,
} from "../redux/actions";
import { Checks } from "tabler-icons-react";
const EditEmployeePopup = ({
  isOpen,
  onClose,
  employee,
  handleSave,
  showSuccessMessage,
}) => {
  const theme = useMantineTheme();
  const dispatch = useDispatch();

  const { position, positions, description, name } = useSelector(
    (state) => state.position
    );

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const positionsCollectionRef = collection(db, "positions");
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
    <>
      <Modal
        opened={isOpen}
        onClose={onClose}
        title="Edit Employee"
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
        <div padding="md" shadow="sm" radius="md">
          {console.log("position " + positions)}
          {positions.length > 0 && (
            <Select
              value={position}
              onChange={(value) => dispatch(setPosition(value))}
              data={positions.map((position) => ({
                value: position.name,
                label: position.name,
              }))}
              label="Position"
              required
            />
          )}
          <TextInput
            label="Name"
            value={name}
            onChange={(event) => dispatch(setName(event.target.value))}
            style={{ marginBottom: theme.spacing.md }}
          />
          <Textarea
            label="Description"
            value={description}
            onChange={(event) => dispatch(setDescription(event.target.value))}
            style={{ marginBottom: theme.spacing.md }}
          />
          <Button
            onClick={handleSave}
            variant="filled"
            className="bg-green-700 hover:bg-green-500"
          >
            Save
          </Button>
        </div>
      </Modal>
        {showSuccessMessage && (
          <Modal
            opened={showSuccessMessage}
            onClose={() => dispatch(setShowSuccessMessage(false))}
            hideCloseButton
            styles={(theme) => ({
              header: {
                backgroundColor: "green",
                color: "white",
              },
              body: {
                backgroundColor: "green",
                color: "white",
              },
            })}
          >
            <Checks size={60} className=" ml-44" />
            <div className="ml-16">
              <Text>Employee has been successfully updated.</Text>
            </div>
          </Modal>
        )}
        {console.log("style" + showSuccessMessage)}
    </>
  );
};

export default EditEmployeePopup;
