import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./campaignCard.scss";
import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { db } from "../../utils/firebase";
import { Link } from "react-router-dom";
import Keyword from "../keyword/keyword.component";
import * as firebase from "firebase/app";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  DocumentData,
  deleteDoc,
} from "firebase/firestore/lite";

import { trashIcon, editIcon } from "../../assets/icons";

interface ICard {
  campaignName: string;
  keywords: Array<object>;
  bidAmount: number;
  campaignFund: number;
  status: boolean;
  town: string;
  radius: number;
  id: string;
  deleteCampaign: Function;
}
interface IOption {
  label: string;
  value: string;
  id: number;
}

const CampaignCard = ({
  campaignName,
  keywords,
  bidAmount,
  campaignFund,
  status,
  town,
  radius,
  id,
  deleteCampaign,
}: ICard) => {
  return (
    <div className="campaignCard-container">
      <Card
        bg={"light"}
        key={"light"}
        text={"dark"}
        style={{ width: "18rem" }}
        className="mb-2"
      >
        <Card.Header style={{ fontWeight: "bold" }}>{campaignName}</Card.Header>
        <Card.Body>
          <Card.Text>Bid amount: {bidAmount + "$"}</Card.Text>
          <Card.Text>Campaign Fund: {campaignFund + "$"}</Card.Text>
          <Card.Text>Status: {status ? "On" : "Off"}</Card.Text>
          <Card.Text>Town: {town}</Card.Text>
          <Card.Text>Radius: {radius + "km"}</Card.Text>
        </Card.Body>
        <Card.Header style={{ fontWeight: "bold" }}>
          {" "}
          {keywords.map((el: any) => (
            <Keyword name={el.label} />
          ))}
        </Card.Header>
        <Card.Header style={{ display: "flex", justifyContent: "flex-end" }}>
          <div>
            <Link style={{ color: "black" }} to={`/editCampaign/${id}`}>
              <span className="icon">{editIcon}</span>
            </Link>
            <span onClick={() => deleteCampaign(id)} className="icon">
              {trashIcon}
            </span>
          </div>
        </Card.Header>
      </Card>
    </div>
  );
};

export default CampaignCard;
