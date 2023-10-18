import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Paper, Text } from "@mantine/core";
import {
  RiDashboardFill,
  RiSettings3Fill,
  RiCalendarEventFill,
  RiFileList3Fill,
  RiUserSettingsFill,
} from "react-icons/ri";
const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("dashboard");

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  return (
    <div className="h-91vh bg-slate-400 w-60">
      <ul className="list-none bg-slate-400 w-full">
        <li className="my-5 text-xl ml-0 hover:bg-blue-400 m-0">
          <Button
            component={Link}
            to="/dashboard"
            variant="link"
            fullWidth
            leftIcon={<RiDashboardFill />}
            color={activeItem === "dashboard" ? "blue" : "gray"}
            onClick={() => handleItemClick("dashboard")}
          >
            <Text>Dashboard</Text>
          </Button>
        </li>
        <li className="my-5 text-xl hover:bg-blue-400">
          <Button
            component={Link}
            to="/settings"
            variant="link"
            fullWidth
            leftIcon={<RiSettings3Fill />}
            color={activeItem === "settings" ? "blue" : "gray"}
            onClick={() => handleItemClick("settings")}
          >
            <Text>Settings</Text>
          </Button>
        </li>
        <li className="my-5 text-xl hover:bg-blue-400">
          <Button
            component={Link}
            to="/events"
            variant="link"
            fullWidth
            leftIcon={<RiCalendarEventFill />}
            color={activeItem === "events" ? "blue" : "gray"}
            onClick={() => handleItemClick("events")}
          >
            <Text>Events</Text>
          </Button>
        </li>
        <li className="my-5 text-xl hover:bg-blue-400">
          <Button
            component={Link}
            to="/documents"
            variant="link"
            fullWidth
            leftIcon={<RiFileList3Fill />}
            color={activeItem === "documents" ? "blue" : "gray"}
            onClick={() => handleItemClick("documents")}
          >
            <Text>Documents</Text>
          </Button>
        </li>
        <li className="my-5 text-xl hover:bg-blue-400">
          <Button
            component={Link}
            to="/users"
            variant="link"
            fullWidth
            leftIcon={<RiUserSettingsFill />}
            color={activeItem === "users" ? "blue" : "gray"}
            onClick={() => handleItemClick("users")}
          >
            <Text>Users</Text>
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
