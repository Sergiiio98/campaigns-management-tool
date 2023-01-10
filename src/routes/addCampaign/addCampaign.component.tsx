import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Typeahead } from "react-bootstrap-typeahead";
import { useState, useEffect } from "react";
import "./addCampaign.styles.scss";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../utils/firebase";
import { useContext } from "react";
import { AccountContext } from "../../contexts/accountBalance.component";
import { Group } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

import {
  collection,
  getDocs,
  setDoc,
  getDoc,
  doc,
  DocumentData,
  deleteDoc,
} from "firebase/firestore/lite";

interface IOption {
  label: string;
  value: string;
  id: number;
}

interface IForm {
  campaignName?: string;
  keywords?: Array<object>;
  bidAmount?: number;
  campaignFund?: number;
  status?: boolean;
  town?: string;
  radius?: number;
  id?: string;
  editMode?: boolean;
}

const options: IOption[] = [
  { label: "IT", value: "it", id: 1 },
  { label: "Social", value: "social", id: 2 },
  { label: "Food", value: "food", id: 3 },
  { label: "Entertaiment", value: "entertaiment", id: 4 },
  { label: "Chiarity", value: "chiarity", id: 4 },
];

const AddCampaign = ({
  campaignName = "",
  keywords = [],
  bidAmount = 0,
  campaignFund = 0,
  status = false,
  town = "Not entered",
  radius = 0,
  editMode = false,
  id = "",
}: IForm) => {
  const [multiSelections, setMultiSelections] = useState<any>(keywords);
  const { currentBalance, setCurrentBalance } = useContext(AccountContext);
  const [isSaved, setIsSaved] = useState(false);
  const [payHelper, setPayHelper] = useState(false);
  const [form, setForm] = useState<IForm>({
    campaignName: campaignName,
    keywords: keywords,
    bidAmount: bidAmount,
    campaignFund: campaignFund,
    status: status,
    town: town,
    radius: radius,
    id: id,
  });

  const handleChange = (e: any) => {
    if (e.target.name === "status") {
      setForm((prev) => ({
        ...prev,
        [e.target.name]: !prev.status,
      }));
    } else {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  async function getAccountValue(db: any) {
    const docRef = doc(db, "accountBalance", "acc");
    const docSnap = await getDoc(docRef);
    return docSnap?.data();
  }

  useEffect(() => {
    getAccountValue(db).then((value) => {
      setCurrentBalance(value?.balance);
    });
    console.log("pay");
  }, [payHelper]);

  useEffect(() => {
    setForm((prev) => ({ ...prev, keywords: multiSelections }));
  }, [multiSelections]);

  const checkIfCanBeDeducted = (price: number) => {
    if (currentBalance - price > 0) {
      return true;
    } else {
      return false;
    }
  };

  async function payment(newValue: number) {
    let newBankState = currentBalance - newValue;
    return await setDoc(doc(db, "accountBalance", "acc"), {
      balance: newBankState,
    });
  }

  async function saveCampaign(form: IForm) {
    let id = uuidv4();
    return await setDoc(doc(db, "campaigns", id), {
      campaignName: form.campaignName,
      keywords: form.keywords,
      bidAmount: form.bidAmount,
      campaignFund: form.campaignFund,
      status: form.status,
      town: form.town,
      radius: form.radius,
      id: id,
    }).then(() =>
      showNotification({
        title: "Campaign added",
        message: "Campaign was added successfuly!",
        color: "green",
      })
    );
  }

  async function editCampaign(form: IForm) {
    let id = form.id === undefined ? "" : form.id;
    console.log(id);
    return await setDoc(doc(db, "campaigns", id), {
      campaignName: form.campaignName,
      keywords: form.keywords,
      bidAmount: form.bidAmount,
      campaignFund: form.campaignFund,
      status: form.status,
      town: form.town,
      radius: form.radius,
      id: form.id,
    }).then(() =>
      showNotification({
        title: "Campaign edited",
        message: "Campaign was edited successfuly!",
        color: "blue",
      })
    );
  }

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (editMode) {
      if (form.bidAmount)
        if (checkIfCanBeDeducted(form.bidAmount)) {
          editCampaign(form)
            .then((response) => {
              setIsSaved(true);
              if (form.bidAmount) payment(form.bidAmount);
              setPayHelper((prev) => !prev);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          showNotification({
            title: "Not enough money",
            message: "You don't have money to perform this action",
            color: "red",
          });
        }
    } else {
      if (form.bidAmount)
        if (checkIfCanBeDeducted(form.bidAmount)) {
          saveCampaign(form)
            .then((response) => {
              setIsSaved(true);
              if (form.bidAmount) payment(form.bidAmount);
              setPayHelper((prev) => !prev);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          showNotification({
            title: "Not enough money",
            message: "You don't have money to perform this action",
            color: "red",
          });
        }
    }
  };

  return (
    <div className="addCampaign-container">
      <div className="form-container">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Campaign name</Form.Label>
            <Form.Control
              value={form.campaignName}
              onChange={handleChange}
              type="text"
              name="campaignName"
              placeholder="Type campaing name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Keywords</Form.Label>
            <Typeahead
              id="basic-typeahead-multiple"
              labelKey="label"
              multiple
              onChange={setMultiSelections}
              options={options}
              placeholder="Choose several states..."
              selected={form.keywords}
              inputProps={{
                required: !multiSelections.length,
              }}
            />
          </Form.Group>

          <Form.Label>Bid amount</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              value={form.bidAmount}
              onChange={handleChange}
              name="bidAmount"
              type="number"
              aria-label="Amount (to the nearest dollar)"
              min="1500"
              required
            />
            <InputGroup.Text>$</InputGroup.Text>
          </InputGroup>

          <Form.Label>Campaign Fund</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              value={form.campaignFund}
              onChange={handleChange}
              name="campaignFund"
              type="number"
              aria-label="Amount (to the nearest dollar)"
              required
            />
            <InputGroup.Text>$</InputGroup.Text>
          </InputGroup>

          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check
              onChange={handleChange}
              checked={form.status}
              name="status"
              type="switch"
              id="custom-switch"
              label="Status"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridCity">
            <Form.Label>Town</Form.Label>
            <Form.Select
              value={form.town}
              onChange={handleChange}
              name="town"
              aria-label="Default select example"
            >
              <option>Select Town</option>
              <option value="Cracow">Cracow</option>
              <option value="Warsaw">Warsaw</option>
              <option value="Wroclaw">Wroclaw</option>
            </Form.Select>
          </Form.Group>

          {form.town !== "Not entered" ? (
            <>
              <Form.Label>Radius</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  value={form.radius}
                  onChange={handleChange}
                  name="radius"
                  aria-label="Amount (to the nearest dollar)"
                />
                <InputGroup.Text>km</InputGroup.Text>
              </InputGroup>
            </>
          ) : null}

          <div className="button-container">
            {!isSaved ? (
              <Button variant="primary" type="submit" style={{ width: "80px" }}>
                Submit
              </Button>
            ) : (
              <Button variant="primary" type="submit" style={{ width: "80px" }}>
                Saved
              </Button>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddCampaign;
