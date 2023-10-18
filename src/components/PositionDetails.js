import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase-config";
import { Box, Button, Paper, Container, Table } from "@mantine/core";
import EditIcon from "@mui/icons-material/Edit";
import { Eye } from "tabler-icons-react";

import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

function PositionDetails() {
  const { id } = useParams();
  const [position, setPosition] = useState(null);
  const [childrenPositions, setChildrenPositions] = useState([]);

  useEffect(() => {
    const fetchPosition = async () => {
      try {
        const positionDocRef = doc(db, "positions", id);
        const positionSnapshot = await getDoc(positionDocRef);
        const positionData = positionSnapshot.data();
        setPosition(positionData);
      } catch (error) {
        console.log("Error fetching position:", error);
      }
    };

    const fetchChildrenPositions = async () => {
      try {
        const positionsCollectionRef = collection(db, "positions");
        const q = query(positionsCollectionRef, where("parentId", "==", id));
        const querySnapshot = await getDocs(q);
        const childrenPositionsData = querySnapshot.docs.map((doc) =>
          doc.data()
        );
        setChildrenPositions(childrenPositionsData);
      } catch (error) {
        console.log("Error fetching children positions:", error);
      }
    };

    fetchPosition();
    fetchChildrenPositions();
  }, [id]);

  if (!position) {
    return <div>Loading...</div>;
  }

  return (
    <Container size="xs" className="flex flex-col justify-center">
      <Paper padding="lg" sx={{ backgroundColor: "transparent" }}>
        <Box className=" w-auto dark:text-white text-black justify-content-center align-items-center">
          <h2 className="text-4xl font-bold font-newone pb-4">
            Position Details
          </h2>
          <h3 className="text-2xl font-bold  font-newone pb-4">
            {position.name}
          </h3>
          <p className="text-lg font-newone pb-8">{position.description}</p>
          <Button
            variant="filled"
            color="teal"
            component={Link}
            className="text-lg font-sans bg-green-700 mb-3"
            to={`/positions/${position.id}/edit?employeeName=${position.employeeName}&description=${position.description}&positionName=${position.name}`}
          >
            <EditIcon />
            Edit
          </Button>
        </Box>
      </Paper>
      <div className="bg-gray-100 dark:bg-gray-900 mt-2 shadow-lg dark:shadow-white shadow-gray-400 rounded-xl">
        {childrenPositions.length > 0 ? (
          <Table className=" bg-white dark:bg-gray-500 dark:text-white text-black">
            <thead className="dark:text-white text-black uppercase bg-green-500 dark:bg-green-500">
              <tr>
                <th className="px-4 py-2">Child</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {childrenPositions.map((childPosition, index) => (
                <tr
                  key={childPosition.id}
                  className={`${
                    index % 2 === 0
                      ? " bg-gray-100 dark:bg-gray-700"
                      : "bg-gray-200 dark:bg-gray-800"
                  } hover:bg-slate-400 dark:hover:bg-gray-500 hover:text-black `}
                >
                  <td>{childPosition.name}</td>
                  <td className=" hover:text-black">
                    <Button
                      component={Link}
                      to={`/positions/${childPosition.id}`}
                      className="cursor-pointer hover:bg-green-600"
                    >
                      <Eye className="text-gray-700 dark:text-white"/>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className=" bg-red-400 position-relative text-center justify-center align-items-center flex flex-row">No child available</p>
        )}
      </div>
    </Container>
  );
}

export default PositionDetails;
