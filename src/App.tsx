import Home from "./routes/home/home.component";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/navigation/navigation.component";
import AddCampaign from "./routes/addCampaign/addCampaign.component";
import MyCampaigns from "./routes/myCampaigns/myCampaigns.component";
import EditCampaign from "./routes/editCampaign/editCampaign.component";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<MyCampaigns />} />
          <Route path="/addCampaign" element={<AddCampaign />} />
          <Route path="/myCampaigns" element={<MyCampaigns />} />
          <Route path="/editCampaign/:campaignID" element={<EditCampaign />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
