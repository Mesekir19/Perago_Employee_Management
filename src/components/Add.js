import React from "react";
import { Button, Modal } from "@mantine/core";
import NewPositionForm from "./NewPositionForm";
import NewEmployeeContainer from "../containers/NewEmployeeContainer";
// import NewEmployee from "./NewEmployee";
const Add = ({
  visible,
  onClose,
  onOpen,
  onAddEmployee,
  onAddPosition,
  addModal,
}) => {

  return (
    <div className=" text-center mt-2">
      <Button
        onClick={onOpen}
        className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-green-400  dark:bg-green-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0">
          Add
        </span>
      </Button>

      <Modal
        opened={visible}
        onClose={onClose}
        title="Add"
        size="sm"
        padding="20px"
        hideCloseButton
        position="center"
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
        <div className="flex flex-col align-self-center align-content-center ml-16">
          <NewEmployeeContainer />
          <NewPositionForm />
        </div>
      </Modal>
    </div>
  );
};

export default Add;
