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
      <h1 className="ml-4 mt-3">Create New Listing</h1>
      <h4 className="ml-4 mt-3">Are you <b>buying</b> or <b>selling</b> an item?</h4>
      <Select
        className="ml-4 mr-4 mt-3"
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
