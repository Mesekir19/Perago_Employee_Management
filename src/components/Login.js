import React, { useState } from "react";
import { Modal, Text, Container, Button, Input } from "@mantine/core";
import Logo from "../assets/perago2.png";
import Register from "./Register";

const Login = ({ opened, onClose }) => {
  const [signUpModalOpened, setSignUpModalOpened] = useState(false);

  const openSignUpModal = () => {
    onClose();
    setSignUpModalOpened(true);
  };

  const closeSignUpModal = () => {
    setSignUpModalOpened(false);
  };

  return (
    <div>
      <Modal opened={opened} onClose={onClose} title="Sign in">
        <Container size="sm">
          <form>
            <div className="flex flex-col items-center">
              <img
                src={Logo}
                alt="Company Logo"
                width={200}
                height={80}
                className="mb-5"
              />
              <label htmlFor="login-email">
                {" "}
                Email
                <Input
                  id="login-email"
                  label="Your email"
                  placeholder="name@company.com"
                  required
                  className="mb-4"
                />
              </label>
              <label htmlFor="login-password">
                {" "}
                Password
                <Input
                  id="login-password"
                  type="password"
                  label="Your password"
                  placeholder="••••••••"
                  required
                  className="mb-4"
                />
              </label>
              <div className="flex flex-row space-x-2">
                <input id="remember" type="checkbox" className="mb-4" />{" "}
                <label htmlFor="remember">Remember Me</label>
              </div>
              <Button
                type="submit"
                variant="filled"
                color="green"
                className="w-full bg-green-700"
              >
                Login to your account
              </Button>
              <Text size="sm" align="center" className="mt-4">
                Not registered?
                <button
                  onClick={openSignUpModal}
                  className="text-green-700 underline"
                  type="button"
                >
                  Create account
                </button>
              </Text>
            </div>
          </form>
        </Container>
      </Modal>
      {signUpModalOpened ? (
        <Register
          opened={signUpModalOpened}
          onClose={closeSignUpModal}
          onLoginLinkClick={openSignUpModal}
        />

      ):(null)}
    </div>
  );
};

export default Login;
