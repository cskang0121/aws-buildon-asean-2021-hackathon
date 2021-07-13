import React, { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import NavigationBar from "../Navbar/NavigationBar";

export default function Home() {
  const [user, setUser] = useState({});

  useEffect(() => {
    UserService.getProfile().then((res) => setUser(res.data));
    console.log(user);
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
