import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Text, Button } from "@mantine/core";
import { RiUserFill, RiLoginCircleFill } from "react-icons/ri";
import { IconBaselineDensityMedium } from "@tabler/icons-react";
import { FiSun, FiMoon } from "react-icons/fi"; // Import the sun and moon icons
// import { theme } from "antd";
import Login from './Login'
import Register from "./Register";

const Navbar = ({ toggleSidebar }) => {
  const [darkTheme, setDarkTheme] = useState("light");
  // const [darkMode, setDarkMode] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [signUpModalOpened, setSignUpModalOpened] = useState(false); // State to control the sign-up modal

  const openSignUpModal = () => {
    setSignUpModalOpened(true);
  };

  const closeSignUpModal = () => {
    setSignUpModalOpened(false);
  };

  const openModal = () => {
    setModalOpened(true);
  };

  const closeModal = () => {
    setModalOpened(false);
  };
  useEffect(() => {
    if (darkTheme === "light") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkTheme]);
  const handleModeToggle = () => {
    setDarkTheme(darkTheme === "dark" ? "light" : "dark");

  };


  return (
    <div className="flex pt-3 pb-2 lg:w-full md:w-screen bg-gray-300 dark:bg-gray-800 h-16">
      <Button variant="outlined" onClick={toggleSidebar}>
        <IconBaselineDensityMedium />
      </Button>
      <div className="flex justify-content-center align-items-center m-auto">
        <div className="flex pl-28 space-x-10 m-auto">
          <Link to="/">
            <Button
              color="green"
              className="dark:hover:bg-gray-500 hover:text-black hover:bg-purple-200 text-lg text-black dark:text-white"
            >
              Home
            </Button>
          </Link>
          <Link to="/about">
            <Button variant="link" className="hover:bg-green-500 text-lg">
              About
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="link" className="hover:bg-green-500 text-lg">
              Contact
            </Button>
          </Link>
        </div>
        <div className="flex md:flex md:flex-grow flex-row justify-end">
          <div className="flex flex-row">
            <Button
              variant="outline"
              leftIcon={<RiLoginCircleFill />}
              color="gray"
              onClick={openModal}
              className="text-lg"
            >
              <Text>Login</Text>
            </Button>
            <Login opened={modalOpened} onClose={closeModal} />

            <Button
              leftIcon={<RiUserFill />}
              color="green"
              onClick={openSignUpModal}
              className=" text-lg"
            >
              <Text>Register</Text>
            </Button>
            <Register opened={signUpModalOpened} onClose={closeSignUpModal} />
          </div>

          <div className="ml-auto">
            <Button
              variant="filled"
              onClick={handleModeToggle}
              className={
                darkTheme === "light"
                  ? "bg-gray-800 hover:bg-gray-800"
                  : "bg-gray-300 hover:bg-gray-300"
              }
            >
              {darkTheme === "light" ? (
                <FiMoon color="black" size={28} />
              ) : (
                <FiSun color="yellow" size={28} />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
