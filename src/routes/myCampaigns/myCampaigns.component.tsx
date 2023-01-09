import { db } from "../../utils/firebase";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  DocumentData,
  deleteDoc,
} from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import CampaignsCard from "../../components/card/campaignCard";
import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const MyCampaigns = () => {
  const [campaigns, setCampaigns] = useState<DocumentData>([]);
  const [deleteHelper, setDeleteHelper] = useState(false);
  async function getCampaigns(db: any) {
    const users = collection(db, "campaigns");
    const userSnapshot = await getDocs(users);
    const userList = userSnapshot.docs.map((doc) => doc.data());
    return userList;
  }

  async function deleteCampaign(id: any) {
    await deleteDoc(doc(db, "campaigns", id))
      .then(() => {
        console.log("Document successfully deleted!");
        setDeleteHelper((prev) => !prev);
      })
      .catch((error) => {
        console.error("Error deleting document: ", error);
      });
  }

  useEffect(() => {
    getCampaigns(db).then((campaigns) => {
      setCampaigns(campaigns);
    });
  }, [deleteHelper]);

  const renderCards = () => {
    return campaigns.map((el: any) => {
      return (
        <div style={{ marginBottom: "25px" }}>
          <CampaignsCard
            campaignName={el.campaignName}
            keywords={el.keywords}
            bidAmount={el.bidAmount}
            campaignFund={el.campaignFund}
            status={el.status}
            town={el.town}
            radius={el.radius}
            id={el.id}
            deleteCampaign={deleteCampaign}
          />
        </div>
      );
    });
  };

  return (
    <div>
      {" "}
      <Container style={{ marginTop: "50px" }}>
        <Row md={4}>{renderCards()}</Row>
      </Container>
    </div>
  );
};

export default MyCampaigns;
