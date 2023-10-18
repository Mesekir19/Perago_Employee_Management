import React from "react";
import { Modal, Paper, Button } from "@mantine/core";
import { AlertTriangle } from "tabler-icons-react";
const DeleteEmployeePopup = ({
  employeeId,
  isOpen,
  onClose,
  onConfirmDelete,
  showConfirmation,
  handleDelete,
  handleConfirmDelete,
  handleCancelDelete,
}) => {
  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={<AlertTriangle size={60} className=" ml-44"/>}
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
      <div className="ml-8 mr-4">
        <p>Are you sure you want to delete this employee?</p>
        <div className=" ml-16 mt-4 space-x-4">
          {!showConfirmation && (
            <Button
              onClick={handleDelete}
              variant="filled"
              className=" bg-red-700 hover:bg-red-500 ml-16"
            >
              Delete
            </Button>
          )}

          {showConfirmation && (
            <>
              <Button
                onClick={handleConfirmDelete}
                variant="filled"
                className=" bg-red-700 hover:bg-red-500 mr-2"
              >
                Confirm
              </Button>
              <Button
                variant="filled"
                onClick={handleCancelDelete}
                className="bg-green-700 hover:bg-green-500"
              >
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default DeleteEmployeePopup;
