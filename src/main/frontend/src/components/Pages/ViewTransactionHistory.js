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
    marginTop: 20,
  },
};

export default function ViewTransactionHistory(props) {
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
                <span style={styles.title}>View all received offers</span>
              </div>
              <div className="row">
                <span style={styles.title}>Rejected Offers</span>
              </div>
              <OffersHistoryList status="r" />
              <div className="row">
                <span style={styles.title}>Confirmed Offers</span>
              </div>
              <OffersHistoryList status="c" />
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="deals">
            <div className="container">
              <div className="row">
                <span style={styles.title}>View all received deals</span>
              </div>
              <div className="row">
                <span style={styles.title}>Rejected Deals</span>
              </div>
              <DealsHistoryList status="r" />
              <div className="row">
                <span style={styles.title}>Confirmed Deals</span>
              </div>
              <DealsHistoryList status="c" />
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}
