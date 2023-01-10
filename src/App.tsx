import { Route, Routes } from "react-router-dom";
import Navigation from "./components/navigation/navigation.component";
import AddCampaignPage from "./routes/addCampaign/addCampaignPage.component";
import MyCampaignsPage from "./routes/myCampaigns/myCampaignsPage.component";
import EditPage from "./routes/editCampaign/editPage.component";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<MyCampaignsPage />} />
          <Route path="/addCampaign" element={<AddCampaignPage />} />
          <Route path="/myCampaigns" element={<MyCampaignsPage />} />
          <Route path="/editCampaign/:campaignID" element={<EditPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
