import React from "react";
import { Button, Nav, Tab } from "react-bootstrap";
import NavigationBar from "../Navbar/NavigationBar";
import DealsActiveList from "../DealsActiveList";
import OffersActiveList from "../OffersActiveList";

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

export default function ViewActiveTransactions() {
  return (
    <div>
      <NavigationBar />
      <Tab.Container defaultActiveKey="offers">
        <Nav fill variant="underline">
          <Nav.Item>
            <Nav.Link eventKey="offers">Your Offers</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="deals">Your Deals</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="offers">
            <div className="container mb-5">
              {/* <div className="row">
                <span style={styles.title}>View Your Active Offers</span>
              </div> */}
              <div className="row mt-4">
                <span style={stylesv2.title}>Ongoing Offers</span>
              </div>
              <OffersActiveList status="ongoing" origin="received" />
              <OffersActiveList status="ongoing" origin="made" />
              <div className="row mt-5">
                <span style={stylesv2.title}>Pending Offers</span>
              </div>
              <OffersActiveList status="pending" origin="made" />
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="deals">
            <div className="container mb-5">
              {/* <div className="row">
                <span style={styles.title}>View Your Active Deals</span>
              </div> */}
              <div className="row mt-4">
                <span style={stylesv2.title}>Ongoing Deals</span>
              </div>
              <DealsActiveList status="ongoing" origin="received" />
              <DealsActiveList status="ongoing" origin="made" />
              <div className="row mt-5">
                <span style={stylesv2.title}>Pending Deals</span>
              </div>
              <DealsActiveList status="pending" origin="made" />
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}
