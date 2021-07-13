import React, { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import NavigationBar from "../Navbar/NavigationBar";

export default function Home() {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(UserService.getProfile());
  }, []);

  return (
    <div>
      <NavigationBar />
      <h1>
        Welcome {user.firstName} {user.lastName}
      </h1>
    </div>
  );
}
