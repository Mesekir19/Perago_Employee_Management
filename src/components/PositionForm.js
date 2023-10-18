import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
// ... Rest of the imports ...
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  useNavigate,
  useParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { db } from "../firebase-config";
import {
  Box,
  Button,
  Text,
  TextInput,
  Select,
  Paper,
  Center,
  Modal,
  Textarea,
} from "@mantine/core";
import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { setSelectedDescription, setSelectedPosition, setDescription, setName, setPosition } from "../redux/actions";
import { IconTrash, IconDeviceFloppy } from "@tabler/icons-react";
import { setShowSuccessMessage, setShowDeletePrompt, setDeleteModalOpen, setEmployeesToDelete, setDeleteEmployeesModalOpen, setShowDeleteSuccessMessage, setChildPositions, setParentID } from "../redux/actions/positionFormAction";
import { AlertTriangle, X, Checks } from "tabler-icons-react";
function PositionForm() {
  const { positions, position, employees, name, description,parentID, showSuccessMessage, showDeletePrompt, deleteModalOpen, employeesToDelete, deleteEmployeesModalOpen, showDeleteSuccessMessage, childPositions } = useSelector(
    (state) => state.position
  );
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit ,reset} = useForm();

  const location = useLocation();
  useEffect(() => {
    let successMessageTimeout;
    if (showSuccessMessage) {
      // If the success message is visible, set a timeout to reset it after 2 seconds
      successMessageTimeout = setTimeout(() => {
        dispatch(setShowSuccessMessage(false));
      }, 2000);
    }

    // Cleanup the timeout when the component unmounts
    return () => {
      clearTimeout(successMessageTimeout);
    };
  }, [showSuccessMessage, dispatch]);

  useEffect(() => {
    let deleteSuccessMessageTimeout;
    if (showDeleteSuccessMessage) {
      // If the delete success message is visible, set a timeout to reset it after 2 seconds
      deleteSuccessMessageTimeout = setTimeout(() => {
        dispatch(setShowDeleteSuccessMessage(false));
      }, 2000);
    }

    // Cleanup the timeout when the component unmounts
    return () => {
      clearTimeout(deleteSuccessMessageTimeout);
    };
  }, [showDeleteSuccessMessage, dispatch]);

  const handlePositionChange = (event) => {
    dispatch(setName(event.target.value))
  };

  const handleDescriptionChange = (event) => {
    dispatch(setDescription(event.target.value))
  };

  const onSubmit = async (data) => {
    try {
      const matchedPositions = positions.find(
        (pos) => pos.name === parentID.name
      );
      // const matchedEmployees = employees.find(
      //   (emp) => emp.name === position.name
      // );
      const matchedEmployees = employees.filter(
        (emp) => emp.name === position.name
      );
      console.log("seted position "+position.name);
      console.log(matchedEmployees.employeeName+" == "+ matchedEmployees);
      let updatedPosition;
      if (position.name === name && matchedPositions.id== position.parentID) {
        updatedPosition = {
          // parentId: matchedPositions.parentId,
          name: name,
          description: description,
        };
      } else if(position.name === name && matchedPositions.id!=position.parentID)
       {
        updatedPosition = {
          parentId: matchedPositions.id,
          name: name,
          description: description,
        };

        
      }else{
        updatedPosition = {
          parentId: matchedPositions.id,
          name: name,
          description: description,
        };
      }
      if(matchedEmployees){
      // const empDoc = doc(db, "employees", matchedEmployees.id);
      // const updatedEmp={
      //   name: name,
      // }
      let count = 0;
       for (const emp of matchedEmployees) {
         const empDocRef = doc(db, "employees", emp.id);
         await updateDoc(empDocRef, {
           name: name,
           // Add other fields you want to update
         });
        //  await updateDoc(empDocRef, updatedEmp);
         console.log("Employees updated successfully " + count + 1);
       }
      }
      
      const positionDoc = doc(db, "positions", id);
      await updateDoc(positionDoc, updatedPosition);
      const positionDocRef = doc(db, "positions", id);
      const positionSnapshot = await getDoc(positionDocRef);
      const positionData = positionSnapshot.data();
      dispatch(setPosition(positionData));
      console.log("newly updated " + positionData.name);
      if (!showSuccessMessage){
      dispatch(setShowSuccessMessage(true));
      dispatch(setShowSuccessMessage(false)); 
      }
      
      reset();
    } catch (error) {
      console.log("Error updating position:", error);
    }
  };


  const onDelete = async () => {
    try {

      const childrenQuerySnapshot = await getDocs(
        query(collection(db, "positions"), where("parentId", "==", id))
      );
      const hasChildren = !childrenQuerySnapshot.empty;

      // Check if the position has associated employees
      const employeesQuerySnapshot = await getDocs(
        query(collection(db, "employees"), where("parentId", "==", id || ""))
      );
      const hasEmployees = !employeesQuerySnapshot.empty;

      if (hasChildren) {
        // Position has children, display a modal with child positions
        const childrenPositions = childrenQuerySnapshot.docs.map((doc) =>
          doc.data()
        );
        dispatch(setChildPositions(childrenPositions));
        dispatch(setDeleteModalOpen(true));
      } else if (hasEmployees) {
        // Position has associated employees, display a modal with employee list
        const employees = employeesQuerySnapshot.docs.map((doc) => doc.data());
        dispatch(setEmployeesToDelete(employees));
        dispatch(setDeleteEmployeesModalOpen(true));
      } else {
        // Delete the position directly
        const positionDoc = doc(db, "positions", id);
        await deleteDoc(positionDoc);
        //  setShowDeletePrompt(false);
        dispatch(setShowDeletePrompt(false));
        dispatch(setShowDeleteSuccessMessage(true));
        setTimeout(() => {
          navigate("/");
          // window.location.reload();
    dispatch(setShowDeleteSuccessMessage(false));
    dispatch(setShowDeletePrompt(false));
    dispatch(setDeleteModalOpen(false));
    dispatch(setDeleteEmployeesModalOpen(false));

        }, 2000);
      }
    } catch (error) {
      console.log("Error deleting position:", error);
    }
  };

  const handleDeleteEmployees = async () => {
    // Delete the employees
    const deleteEmployeePromises = employeesToDelete.map((employee) =>
      deleteDoc(doc(db, "employees", employee.id))
    );
    await Promise.all(deleteEmployeePromises);
    const positionDoc = doc(db, "positions", id);
    await deleteDoc(positionDoc);
    dispatch(setShowDeleteSuccessMessage(true));
    setTimeout(() => {
      navigate("/");
      // window.location.reload();
    dispatch(setShowDeleteSuccessMessage(false));
    dispatch(setShowDeletePrompt(false));
    dispatch(setDeleteModalOpen(false));
    dispatch(setDeleteEmployeesModalOpen(false));

    }, 2000);
  };

  return (
    <div className="felx ml-20 mr-20 object-contain ">
      <Box maxWidth={600} className=" dark:text-white text-black">
        <h2 className="text-2xl font-bold font-serif pb-4">Edit Position</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-lg font-bold font-serif pb-4 dark:text-white text-black">
            {positions?.length > 0 && (
              <Select
                value={parentID?.name}
                size="md"
                onChange={(value) => dispatch(setParentID({ name: value }))}
                data={positions.map((position) => ({
                  value: position.name,
                  label: position.name,
                }))}
                label="Change Parent"
                required
              />
            )}
          </div>
          <div className="text-lg font-bold font-serif pb-4 dark:text-white text-black">
            <TextInput
              label="Position"
              size="md"
              value={name}
              onChange={handlePositionChange}
              // {...register("positionName", { required: true })}
            />
          </div>
          <div className="text-lg font-bold font-serif pb-4 dark:text-white text-black">
            <Textarea
              label="Description"
              size="md"
              value={description}
              onChange={handleDescriptionChange}
              // {...register("positionDescription", { required: true })}
            />
          </div>
          <div className=" flex space-x-1 mt-4">
            <Button
              color="teal"
              type="submit"
              variant="filled"
              mt={2}
              mr={2}
              className="text-lg font-snas bg-green-700"
              onClick={() => dispatch(setShowSuccessMessage(true))}
              leftIcon={<IconDeviceFloppy />}
            >
              Save
            </Button>
            <Button
              type="button"
              variant="filled"
              color="red"
              className="text-lg font-snas bg-red-700 mt-0.5"
              onClick={() => dispatch(setShowDeletePrompt(true))}
              leftIcon={<IconTrash />}
            >
              Delete
            </Button>
            <Modal
              opened={showDeletePrompt}
              onClose={() => dispatch(setShowDeletePrompt(false))}
              overlayOpacity={0.5}
              // title={<AlertTriangle size={60} className=" ml-44" />}
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
              <div className=" bg-[#c4bcbc]">
                <AlertTriangle size={60} className=" ml-44" />
                <Text mt="sm">
                  Are you sure you want to delete this position? This action
                  cannot be undone.
                </Text>
                <Center mt="lg" className=" space-x-4">
                  <Button
                    color="teal"
                    onClick={() => dispatch(setShowDeletePrompt(false))}
                    variant="filled"
                    className=" bg-green-600 mr2"
                  >
                    Cancel
                  </Button>
                  <Button
                    color="red"
                    onClick={onDelete}
                    ml={2}
                    variant="filled"
                    className=" bg-red-600"
                  >
                    Delete
                  </Button>
                </Center>
              </div>
            </Modal>
            <Modal
              opened={showSuccessMessage}
              onClose={() => dispatch(setShowSuccessMessage(false))}
              overlayOpacity={0.5}
              styles={(theme) => ({
                header: {
                  backgroundColor: "#19f809",
                  color: "black",
                },
                body: {
                  backgroundColor: "#19f809",
                  color: "black",
                },
              })}
            >
              <div className=" bg-[#19f809]">
                <Checks size={60} className=" ml-44" />
                <Text mt="sm" className="ml-16">Position has been successfully updated.</Text>
                <Center mt="lg">
                  <Button
                    color="teal"
                    onClick={() => {
                      dispatch(setShowSuccessMessage(false));
                      // window.location.reload();
                    }}
                    variant="filled"
                    className=" bg-green-600"
                  >
                    Close
                  </Button>
                </Center>
              </div>
            </Modal>
          </div>
        </form>
        <Modal
          opened={deleteModalOpen}
          onClose={() => dispatch(setDeleteModalOpen(false))}
          title={<X size={60} className=" ml-44" />}
          styles={(theme) => ({
            header: {
              backgroundColor: "#a2f48d",
              color: "black",
            },
            body: {
              backgroundColor: "#a2f48d",
              color: "black",
            },
          })}
        >
          <p className=" pt-3 mb-9 pl-2 pr-2">
            You cannot delete this position because it has the following child
            positions:{" "}
            {childPositions.map((position) => position.name).join(", ")}
          </p>
          <Button
            variant="filled"
            color="green"
            onClick={() => dispatch(setDeleteModalOpen(false))}
            className=" bg-green-600 mb-2 ml-40"
          >
            Close
          </Button>
        </Modal>

        <Modal
          opened={deleteEmployeesModalOpen}
          onClose={() => dispatch(setDeleteEmployeesModalOpen(false))}
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
          <AlertTriangle size={60} className=" ml-44" />
          <p className="mb-2">
            This position has the following associated employees:{" "}
            {employeesToDelete
              .map((employee) => employee.employeeName)
              .join(", ")}
            . Do you want to delete these employees as well?
          </p>
          <div className="ml-28 space-x-4">
            <Button
              variant="filled"
              color="red"
              onClick={handleDeleteEmployees}
              className=" bg-red-600 mr-4"
            >
              Delete
            </Button>
            <Button
              variant="filled"
              color="green"
              onClick={() => dispatch(setDeleteEmployeesModalOpen(false))}
              className=" bg-green-600"
            >
              Cancel
            </Button>
          </div>
        </Modal>
        <Modal
          opened={showDeleteSuccessMessage}
          onClose={() => dispatch(setShowDeleteSuccessMessage(false))}
          overlayOpacity={0.5}
          styles={(theme) => ({
            header: {
              backgroundColor: "#19f809",
              color: "black",
            },
            body: {
              backgroundColor: "#19f809",
              color: "black",
            },
          })}
        >
          <Checks size={60} className=" ml-44" />
          <div className=" bg-[#19f809]">
            <Text mt="sm" className="ml-16">Position has been successfully deleted.</Text>
            <Center mt="lg">
              <Button
                color="teal"
                onClick={() => {
                  dispatch(setShowDeleteSuccessMessage(false));
                  // window.location.reload();
                }}
                variant="filled"
                className=" bg-green-600"
              >
                Close
              </Button>
            </Center>
          </div>
        </Modal>
      </Box>
    </div>
  );
}

export default PositionForm;
