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
    marginTop: 20,
  },
};

export default function ViewActiveTransactions() {
  return (
    <div>
      <NavigationBar />
      <Tab.Container defaultActiveKey="offers">
        <Nav fill variant="pills">
          <Nav.Item>
            <Nav.Link eventKey="offers">Offers</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="deals">Deals</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="offers">
            <div className="container">
              <div className="row">
                <span style={styles.title}>View all active offers</span>
              </div>
              <div className="row">
                <span style={styles.title}>Ongoing Offers</span>
              </div>
              <OffersActiveList status="ongoing" origin="received" />
              <OffersActiveList status="ongoing" origin="made" />
              <div className="row">
                <span style={styles.title}>Pending Offers</span>
              </div>
              <OffersActiveList status="pending" origin="made" />
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="deals">
            <div className="container">
              <div className="row">
                <span style={styles.title}>View all active deals</span>
              </div>
              <div className="row">
                <span style={styles.title}>Ongoing Deals</span>
              </div>
              <DealsActiveList status="ongoing" origin="received" />
              <DealsActiveList status="ongoing" origin="made" />
              <div className="row">
                <span style={styles.title}>Pending Deals</span>
              </div>
              <DealsActiveList status="pending" origin="made" />
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}
