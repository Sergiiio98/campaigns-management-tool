import { Outlet, Link } from "react-router-dom";
import "./navigation.styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { db } from "../../utils/firebase";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  getDoc,
  DocumentData,
  deleteDoc,
} from "firebase/firestore/lite";
import { useContext } from "react";
import { AccountContext } from "../../contexts/accountBalance.component";

const Navigation = () => {
  const { currentBalance, setCurrentBalance } = useContext(AccountContext);
  async function getCampaigns(db: any) {
    const docRef = doc(db, "accountBalance", "acc");
    const docSnap = await getDoc(docRef);
    return docSnap?.data();
  }

  useEffect(() => {
    getCampaigns(db).then((campaigns) => {
      setCurrentBalance(campaigns?.balance);
    });
  }, []);

  return (
    <div>
      <div>
        <Navbar expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <LinkContainer to="myCampaigns">
                  <Nav.Link>My Campaigns</Nav.Link>
                </LinkContainer>
                <LinkContainer to="addCampaign">
                  <Nav.Link>Add Campaign</Nav.Link>
                </LinkContainer>
              </Nav>
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  Emerald funds: <a href="#login">{currentBalance + "$"}</a>
                </Navbar.Text>
              </Navbar.Collapse>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <Outlet />
    </div>
  );
};

export default Navigation;
