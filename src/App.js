import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import PositionsList from "./components/PositionList";
import PositionDetails from "./components/PositionDetails";
import PositionForm from "./components/PositionForm";
// import Circles from "./components/circles";
import Navbar from "./components/NavBar";
import Sidebar from "./components/SideBar";
import EmployeeTable from "./components/EmployeeTable";
import Bg1 from "./components/bg1";
// import EmployeeTable from "./containers/EmployeeTable";
import PositionsListContainer from "./containers/PositionsListContainer";
import PositionDetailsContainer from "./containers/PositionDetailsContainer";
import PositionFormContainer from "./containers/PositionFormContainer";
import "./index.css";
import SideBar2 from "./components/SideBar2";
import Footer from "./components/Footer";
// import Login from "./components/Login";
// import "./App.css"
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col bg-gray-100 dark:bg-gray-400">
      <div>
        <Bg1 />
      </div>
      <div className="fixed z-20 w-full md:w-screen shadow-sm shadow-gray-500">
        <Navbar toggleSidebar={toggleSidebar} />
      </div>
      <div className="flex relative flex-1 mt-16">
        <SideBar2 open={sidebarOpen} />
        {/* {sidebarOpen && <Sidebar />} */}
        <div
          className="flex-1 mt-2 justify-center h-[89vh] overflow-y-auto"
          
        >
          <Routes>
            <Route exact path="/" element={<PositionsListContainer />} />
            <Route
              exact
              path="/positions/:id"
              element={<PositionDetailsContainer />}
            />
            <Route
              exact
              path="/positions/:id/edit"
              element={<PositionFormContainer />}
            />
            
          </Routes>
        </div>
        <div className=" h-3/4 overflow-y-auto bg-gray-100 dark:bg-gray-900 w-2/4 mt-2 shadow-lg dark:shadow-white shadow-gray-400 rounded-xl">
          <EmployeeTable />
        </div>
      </div>
      {/* <div className=" h-1/4"> */}

      <Footer />
      {/* </div> */}
    </div>
  );
}

export default App;
