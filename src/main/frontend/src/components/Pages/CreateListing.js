import React, { useState } from "react";
import Select from "react-select";
import CreateIFS from "../CreateIFS";
import CreateWTB from "../CreateWTB";
import NavigationBar from "../Navbar/NavigationBar";

const OPTIONS = [
  { value: "wtb", label: "wtb" },
  { value: "ifs", label: "ifs" },
];

function Toggler({ selected }) {
  return selected === "wtb" ? <CreateWTB /> : <CreateIFS listingType="s" />;
}

export default function CreateListing() {
  const [selected, setSelected] = useState("wtb");

  return (
    <div>
      <NavigationBar />
      <h1>Post a Listing</h1>
      <Select
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
