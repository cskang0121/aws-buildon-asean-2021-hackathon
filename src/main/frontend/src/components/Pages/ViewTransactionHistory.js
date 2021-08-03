import React from "react";
import { Button, Nav, Tab } from "react-bootstrap";
import NavigationBar from "../Navbar/NavigationBar";
import OffersHistoryList from "../OffersHistoryList";
import DealsHistoryList from "../DealsHistoryList";

const styles = {
  title: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 600,
    fontSize: 40,
    marginBottom: 20,
    marginTop: 40,
    textAlign: "center",
  },
};

const stylesv2 = {
  title: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 500,
    fontSize: 35,
    marginBottom: 20,
    marginTop: 20,
  },
};

export default function ViewTransactionHistory(props) {
  return (
    <div>
      <NavigationBar />
      <Tab.Container defaultActiveKey="offers">
        <Nav fill variant="underline">
          <Nav.Item>
            <Nav.Link eventKey="offers">Received Offers</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="deals">Received Deals</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="offers">
            <div className="container mb-5">
              {/* <div className="row">
                <span style={styles.title}>View All Received Offers</span>
              </div> */}
              <div className="row mt-4">
                <span style={stylesv2.title}>Rejected Offers</span>
              </div>
              <OffersHistoryList status="r" />
              <div className="row mt-5">
                <span style={stylesv2.title}>Confirmed Offers</span>
              </div>
              <OffersHistoryList status="c" />
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="deals">
            <div className="container mb-5">
              {/* <div className="row">
                <span style={styles.title}>View All Received Deals</span>
              </div> */}
              <div className="row mt-4">
                <span style={stylesv2.title}>Rejected Deals</span>
              </div>
              <DealsHistoryList status="r" />
              <div className="row mt-5">
                <span style={stylesv2.title}>Confirmed Deals</span>
              </div>
              <DealsHistoryList status="c" />
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}
