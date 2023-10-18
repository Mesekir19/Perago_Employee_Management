import React, { useState } from "react";
import { Modal, Text, Container, Button, Input } from "@mantine/core";
import Logo from "../assets/perago2.png";
import Login from "./Login";
import validator from "validator";

const Register = ({ opened, onClose, onLoginLinkClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loginModalOpened, setLoginModalOpened] = useState(false);

  const openLoginModal = () => {
    onClose();
    setLoginModalOpened(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpened(false);
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    // Reset previous error messages
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    let isValid = true;

    // Basic validation
    if (!validator.isEmail(email)) {
      setEmailError("Invalid email");
      isValid = false;
    }

    if (password.length < 8) {
      setPasswordError("Password should be at least 8 characters long");
      isValid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }

    if (isValid) {
      try {
        // Perform your registration logic here
        console.log("Registration successful");
      } catch (error) {
        console.error("Error registering:", error);
      }
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={onClose} title="Create an Account">
        <Container size="sm">
          <form onSubmit={handleRegister}>
            <div className="flex flex-col items-center">
              <img
                src={Logo}
                alt="Company Logo"
                width={200}
                height={80}
                className="mb-5"
              />
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                label="Your email"
                placeholder="name@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-2"
              />
              {emailError && (
                <Text size="sm" color="red" className="mb-2">
                  {emailError}
                </Text>
              )}
              <label htmlFor="password">Password</label>
              <Input
                id="password"
                type="password"
                label="Your password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-2"
              />
              {passwordError && (
                <Text size="sm" color="red" className="mb-2">
                  {passwordError}
                </Text>
              )}
              <label htmlFor="confirmpassword">Confirm Password</label>
              <Input
                id="confirmpassword"
                type="password"
                label="Confirm Your password"
                placeholder="••••••••"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mb-2"
              />
              {confirmPasswordError && (
                <Text size="sm" color="red" className="mb-2">
                  {confirmPasswordError}
                </Text>
              )}
              <Button
                type="submit"
                variant="filled"
                color="green"
                className="w-full bg-green-700"
              >
                Sign Up
              </Button>
              <Text size="sm" align="center" className="mt-4">
                Already have an account?{" "}
                <button
                  onClick={openLoginModal}
                  className="text-green-700"
                  type="button"
                >
                  Login
                </button>
              </Text>
            </div>
          </form>
        </Container>
      </Modal>
      {loginModalOpened ? (
        <Login opened={loginModalOpened} onClose={closeLoginModal} />
      ) : null}
    </>
  );
};

export default Register;
