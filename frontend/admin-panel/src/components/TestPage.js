import React from "react";
import { useParams } from "react-router-dom";
import "./TestPage.css";

function TestPage() {
  const { id } = useParams();

  const [testDetails, setTestDetails] = React.useState([]);

  return (
    <>
      <div className="test_page">
        <p className="test_id">test: {id}</p>
        <div className="test__users">
          <div className="users_card">
            <div className="users_card_row">
              <p className="users_card_part">Name: </p>
              <p className="users_card_part">Satya</p>
            </div>
            <div className="users_card_row">
              <p className="users_card_part">id: </p>
              <p className="users_card_part">id_12sfdalj8ewr9</p>
            </div>
            <div className="users_card_row">
              <p className="users_card_part">Status: </p>
              <p className="users_card_part">Started</p>
            </div>
          </div>
          <div className="users_card">
            <div className="users_card_row">
              <p className="users_card_part">Name: </p>
              <p className="users_card_part">Pepeti</p>
            </div>
            <div className="users_card_row">
              <p className="users_card_part">id: </p>
              <p className="users_card_part">id_12sfdalj8sdf9</p>
            </div>
            <div className="users_card_row">
              <p className="users_card_part">Status: </p>
              <p className="users_card_part">Started</p>
            </div>
          </div>
          <div className="users_card">
            <div className="users_card_row">
              <p className="users_card_part">Name: </p>
              <p className="users_card_part">Dheeraj</p>
            </div>
            <div className="users_card_row">
              <p className="users_card_part">id: </p>
              <p className="users_card_part">id_12sfdalj8asd9</p>
            </div>
            <div className="users_card_row">
              <p className="users_card_part">Status: </p>
              <p className="users_card_part">Started</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TestPage;
