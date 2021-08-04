import React from "react";
import WTB from "./WTB";
import IFS from "./IFS";
import NavigationBar from "../Navbar/NavigationBar";
import { Tab, Nav, Row, Col } from "react-bootstrap";

const styles = {
  title: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 600,
    fontSize: 30,
    marginTop: 25,
    textAlign: "right",
    color: "#9d4edd"
  },
  line : {
    height: 5,
    color: "#9d4edd",
    opacity: 1
  },
  button : {
    verticalAlign: "baseline",
    opacity: 0.8,
    borderRadius: 0,
    height: 70,
    paddingTop: 22,
  }
};

export default function ViewMyListings() {
  return (
    <div>
      <NavigationBar />
      <Tab.Container defaultActiveKey="ifs">
        <Row>
          <Col sm={2}>
            <div className="row mt-4">
              <span style={styles.title}>My Listings</span>
            </div>
            <hr style={styles.line} className="mb-0"></hr>
            <Nav fill variant="pills" className="flex-column ml-0 mr-0 ">
              <hr className="m-0"></hr>
              <Nav.Item className="text-right">
                <Nav.Link style={styles.button} eventKey="ifs">Items for Sale</Nav.Link>
              </Nav.Item>
              <hr className="m-0"></hr>
              <Nav.Item className="text-right">
                <Nav.Link style={styles.button} eventKey="wtb">Want to Buy</Nav.Link>
              </Nav.Item>
              <hr className="m-0"></hr>
            </Nav>
          </Col>
          <Col sm={10}>
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
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}
