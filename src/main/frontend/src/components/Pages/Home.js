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
      <h1 className="m-5">
        Welcome, {user.firstName} {user.lastName}!
      </h1>
      <hr></hr>
      <div className="container-fluid">
        <h4 className="ml-5">
          Recommended For You
        </h4>
      </div>
      <hr></hr>
    </div>
  );
}
