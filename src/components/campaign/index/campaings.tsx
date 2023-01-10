import { db } from "../../../utils/firebase";
import { useEffect, useState } from "react";
import CampaignsCard from "../../../components/card/campaignCard";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import { showNotification } from "@mantine/notifications";
import {
  collection,
  getDocs,
  doc,
  DocumentData,
  deleteDoc,
} from "firebase/firestore/lite";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState<DocumentData>([]);
  const [deleteHelper, setDeleteHelper] = useState(false);

  useEffect(() => {
    getCampaigns(db).then((campaigns) => {
      setCampaigns(campaigns);
    });
  }, [deleteHelper]);

  async function getCampaigns(db: any) {
    const users = collection(db, "campaigns");
    const userSnapshot = await getDocs(users);
    const userList = userSnapshot.docs.map((doc) => doc.data());
    return userList;
  }

  async function deleteCampaign(id: string) {
    await deleteDoc(doc(db, "campaigns", id))
      .then(() => {
        showNotification({
          title: "Deleted",
          message: "Campaing was removed successfuly!",
          color: "red",
        });
        setDeleteHelper((prev) => !prev);
      })
      .catch((error) => {
        showNotification({
          title: "Error",
          message: error,
          color: "red",
        });
      });
  }

  const renderCards = () => {
    return campaigns.map((el: any) => {
      return (
        <div
          style={{
            marginBottom: "25px",
            display: "flex",
            justifyContent: "center",
          }}
        >
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
      <Container style={{ marginTop: "50px" }}>
        <Row xxl={4} xl={3} lg={3} md={2} sm={1}>
          {renderCards()}
        </Row>
      </Container>
    </div>
  );
};

export default Campaigns;
