// components/EmployeeTable.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDocs, collection, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase-config";
import {
  Table,
  Text,
  Button,
  Paper,
  ScrollArea,
  Pagination,
  Center,
  Modal,
} from "@mantine/core";
import {
  IconEdit,
  IconTrash,
  IconChevronUp,
  IconChevronDown,
} from "@tabler/icons-react";
import {
  setSearchTerm,
  setSortBy,
  setReverseSortDirection,
  setData,
  setSelectedEmployee,
  setIsPopupOpen,
  setSelectedEmployeeDelete,
  setIsDeleteOpen,
  setTotalPages,
  setPage,
  setPerPage,
  setSortedData,
  setDescription,
  setName,
  setPosition,
} from "../redux/actions";
import EditEmployeePopupContainer from "../containers/EditEmployeePopupContainer";
import DeleteEmployeePopupContainer from "../containers/DeleteEmployeePopupContainer";

function EmployeeTable() {
  const dispatch = useDispatch();
  const {
    search,
    data,
    sortBy,
    reverseSortDirection,
    sortedData,
    page,
    perPage,
    totalPages,
    isPopupOpen,
    selectedEmployee,
    isDeleteOpen,
    selectedEmployeeDelete,
  } = useSelector((state) => state.employeeTable);

  const handleOpenPopup = (employee) => {
    dispatch(setSelectedEmployee(employee));
    const { employeeName, name, description } = employee;
    // console.log("name", employeeName);
    dispatch(setName(employeeName));
    dispatch(setPosition(name));
    dispatch(setDescription(description));
    dispatch(setIsPopupOpen(true));
  };

  const handleClosePopup = () => {
    dispatch(setIsPopupOpen(false));
    dispatch(setSelectedEmployee(null));
  };

  const handleDeleteClick = (empId) => {
    dispatch(setSelectedEmployeeDelete(empId));
    dispatch(setIsDeleteOpen(true));
  };

  const handleDeleteClose = () => {
    dispatch(setIsDeleteOpen(false));
  };

  const handleConfirmDelete = () => {
    // Perform any necessary actions after confirming the delete
    window.location.reload();
    console.log("Delete confirmed");
  };
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeesCollectionRef = collection(db, "employees");
        const employeesSnapshot = await getDocs(employeesCollectionRef);
        const employeesData = employeesSnapshot.docs.map((doc) => doc.data());
        dispatch(setData(employeesData));
        dispatch(setTotalPages(Math.ceil(employeesData.length / perPage))); // Calculate and set the total pages
      } catch (error) {
        console.log("Error fetching employees:", error);
      }
    };

    fetchEmployees();
    const employeesCollectionRef = collection(db, "employees");
    const unsubscribe = onSnapshot(employeesCollectionRef, (snapshot) => {
      const employeesData = snapshot.docs.map((doc) => doc.data());
      dispatch(setData(employeesData));
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    const sortData = () => {
      const sorted = [...data].sort((a, b) => {
        const valueA = a[sortBy]?.toLowerCase() || "";
        const valueB = b[sortBy]?.toLowerCase() || "";

        if (reverseSortDirection) {
          return valueB.localeCompare(valueA);
        }
        return valueA.localeCompare(valueB);
      });

      dispatch(setSortedData(sorted));
    };

    sortData();
  }, [data, sortBy, reverseSortDirection, dispatch]);

  const handleSort = (field) => {
    if (field === sortBy) {
      dispatch(setReverseSortDirection(!reverseSortDirection));
    } else {
      dispatch(setSortBy(field));
      dispatch(setReverseSortDirection(false));
    }
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    dispatch(setSearchTerm(searchTerm));
    dispatch(setPage(1)); // Reset page number when search is changed

    // Calculate filtered data based on the new search term
    const filteredData = sortedData.filter((row) =>
      Object.values(row).some(
        (value) => value && value.toLowerCase().includes(searchTerm)
      )
    );

    // Update the total pages based on the filtered data
    dispatch(setTotalPages(Math.ceil(filteredData.length / perPage)));

  };



  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const handlePerPageChange = (newPerPage) => {
    dispatch(setPerPage(newPerPage));
    dispatch(setPage(1));
      const filteredData = sortedData.filter((row) =>
        Object.values(row).some(
          (value) => value && value.toLowerCase().includes(search.toLowerCase())
        )
      );
      dispatch(setTotalPages(Math.ceil(filteredData.length / newPerPage)));
  };

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;

  // Filter the sortedData based on search input
  const filteredData = sortedData.filter((row) =>
    Object.values(row).some(
      (value) => value && value.toLowerCase().includes(search.toLowerCase())
    )
  );
  const renderNoMatchMessage = () => {
    return (
      <div className="text-center text-lg font-bold text-black dark:text-white py-4">
        No employees or positions found.
      </div>
    );
  };
  const displayedData = filteredData.slice(startIndex, endIndex);

  const rows = displayedData.map((row, index) => (
    <tr
      key={row.id}
      className={`${
        index % 2 === 0
          ? " bg-gray-100 dark:bg-gray-700"
          : "bg-gray-200 dark:bg-gray-800"
      } hover:bg-slate-400 dark:hover:bg-green-200 capitalize hover:text-black `}
    >
      <td className="py-2 px-4 border-b dark:border-gray-600">
        {row.employeeName}
      </td>
      <td className="py-2 px-4 border-b dark:border-gray-600">{row.name}</td>
      <td className="py-2 px-4 border-b dark:border-gray-600 flex flex-row space-x-4">
        <IconEdit
          onClick={() => handleOpenPopup(row)}
          className="cursor-pointer"
          stroke={2}
          size={28}
          color="green"
        />
        <IconTrash
          onClick={() => handleDeleteClick(row.id)}
          stroke={2}
          size={28}
          color="red"
          className="cursor-pointer"
        />
      </td>
    </tr>
  ));

  return (
    <ScrollArea padding="md">
      <div className="flex justify-between">
        <p className="text-lg font-sans text-center align-items-center pl-10 font-bold dark:text-white">
          Company's Hired Employees
        </p>
        <input
          type="text"
          placeholder="Search by any field"
          value={search}
          onChange={handleSearchChange}
          className="bg-green-200 w-1/2 px-4 py-2 rounded-lg text-white focus:outline-none dark:bg-green-200"
        />
      </div>

      <Table className=" bg-white dark:bg-gray-500 dark:text-white text-black">
        <thead className="bg-green-400 dark:bg-green-700 uppercase">
          <tr>
            <th onClick={() => handleSort("employeeName")}>
              <Text className="cursor-pointer dark:text-white text-black">
                Employee Name
              </Text>
              {sortBy === "employeeName" && (
                <IconChevronUp
                  size={12}
                  style={{ marginLeft: "0.25rem", verticalAlign: "middle" }}
                />
              )}
            </th>
            <th onClick={() => handleSort("name")}>
              <Text className="cursor-pointer dark:text-white text-black">
                Position
              </Text>
              {sortBy === "name" && (
                <IconChevronUp
                  size={14}
                  style={{ marginLeft: "0.25rem", verticalAlign: "middle" }}
                />
              )}
            </th>
            <th>
              <Text className="dark:text-white text-black">Actions</Text>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan="3">{renderNoMatchMessage()}</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Center className="dark:text-white rounded-md">
        <Paper className=" bg-transparent">
          <Pagination
            value={page}
            onChange={handlePageChange}
            total={totalPages}
            limit={7}
            onPerPageChange={handlePerPageChange}
            color="green"
            radius="md"
            className="bg-green-400 dark:bg-green-700  rounded-md"
          />
        </Paper>
      </Center>
      {isPopupOpen && (
        <EditEmployeePopupContainer
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          employee={selectedEmployee}
        />
      )}
      {isDeleteOpen && (
        <DeleteEmployeePopupContainer
          employeeId={selectedEmployeeDelete}
          isOpen={isDeleteOpen}
          onClose={handleDeleteClose}
          onConfirmDelete={handleConfirmDelete}
        />
      )}
    </ScrollArea>
  );
}

export default EmployeeTable;
