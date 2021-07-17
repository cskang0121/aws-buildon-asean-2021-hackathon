import React from "react";
import WTB from "./WTB";
import IFS from "./IFS";
import NavigationBar from "../Navbar/NavigationBar";

export default function ViewMyListings() {
  return (
    <div>
      <NavigationBar />
      <WTB />
      <IFS />
    </div>
  );
}
