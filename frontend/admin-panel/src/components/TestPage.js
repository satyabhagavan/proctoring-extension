import React from "react";
import { useParams } from "react-router-dom";
import "./TestPage.css";
import { BASE_URL } from "../constants";
import axios from "axios";

function TestPage() {
  const { id } = useParams();

  const url = BASE_URL + `/tests/info/${id}`;

  const [testDetails, setTestDetails] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        console.log(res.data.UsersInfo);
        setTestDetails(res.data.UsersInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, url]);

  return (
    <>
      <div className="test_page">
        <p className="test_id">test: {id}</p>
        <div className="test__users">
          {testDetails.map((each) => {
            return (
              <div className="users_card" key={each.userId}>
                <div className="users_card_row">
                  <p className="users_card_part">Name: </p>
                  <p className="users_card_part">{each.name}</p>
                </div>
                <div className="users_card_row">
                  <p className="users_card_part">id: </p>
                  <p className="users_card_part">{each.userId}</p>
                </div>
                <div className="users_card_row">
                  <p className="users_card_part">Status: </p>
                  <p className="users_card_part">{each.status}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default TestPage;
