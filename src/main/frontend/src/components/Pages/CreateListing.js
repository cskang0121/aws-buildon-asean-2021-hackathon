import React, { useState } from "react";
import Select from "react-select";
import CreateIFS from "../CreateIFS";
import CreateWTB from "../CreateWTB";
import NavigationBar from "../Navbar/NavigationBar";

const OPTIONS = [
  { value: "wtb", label: "Buying" },
  { value: "ifs", label: "Selling" },
];

function Toggler({ selected }) {
  return selected === "wtb" ? <CreateWTB /> : <CreateIFS listingType="s" />;
}

export default function CreateListing() {
  const [selected, setSelected] = useState("wtb");

  return (
    <div>
      <NavigationBar />
      <h1 className="ml-3">Create New Listing</h1>
      <h4 className="ml-3 mt-3">1. Are you looking to buy or sell an item?</h4>
      <Select
        className="ml-3 mr-3"
        options={OPTIONS}
        onChange={(value) => {
          setSelected(value.value);
        }}
        defaultValue={OPTIONS[0]}
      />
      <br />
      <Toggler selected={selected} />
    </div>
  );
}
