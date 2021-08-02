import React from "react";
import WTB from "./WTB";
import IFS from "./IFS";
import NavigationBar from "../Navbar/NavigationBar";
import { Tab, Nav } from "react-bootstrap";

export default function ViewMyListings() {
  return (
    <div>
      <NavigationBar />
      <Tab.Container defaultActiveKey="ifs">
        <Nav fill variant="underline" className="ml-0 mr-0">
          <Nav.Item>
            <Nav.Link eventKey="ifs">Item for Sale</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="wtb">Want to Buy</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="ifs">
            {/* <div className="container-fluid"> */}
            <div className="container">
              <div className="row">
                <IFS />
              </div>
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="wtb">
            {/* <div className="container-fluid"> */}
            <div className="container">
              <div className="row">
                <WTB />
              </div>
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}
