import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore/lite";
import { db } from "../../../utils/firebase";
import CreateCampaign from "../create/createCampaign.component";

const EditCampaign = () => {
  const [data, setData] = useState<any>();
  const { campaignID } = useParams();
  let id = campaignID === undefined ? "" : campaignID;

  useEffect(() => {
    const docRef = doc(db, "campaigns", id);
    getDoc(docRef)
      .then((snapshot) => {
        return snapshot.data();
      })
      .then((snap) => setData(snap));
  }, []);

  return (
    <div>
      {data && (
        <CreateCampaign
          campaignName={data.campaignName}
          keywords={data.keywords}
          bidAmount={data.bidAmount}
          campaignFund={data.campaignFund}
          status={data.status}
          town={data.town}
          radius={data.radius}
          id={data.id}
          editMode={true}
        />
      )}
    </div>
  );
};

export default EditCampaign;
