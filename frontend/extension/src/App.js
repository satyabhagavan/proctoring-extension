import React from "react";
import "./App.css";
import axios from "axios";
import Camera from "./Camera";

function App() {
  const testDetails = localStorage.getItem("testDetails");
  const [testForm, setTestForm] = React.useState({});
  const BASE_URL = "http://localhost:5000";

  const handleTestSubmit = () => {
    console.log(testForm);
    const url = BASE_URL + "/users/takeTest";

    axios
      .post(url, {
        name: testForm.name,
        email: testForm.email,
        testCode: testForm.testCode,
      })
      .then((res) => {
        console.log(res);
        alert(res.data.message);
        localStorage.setItem("testDetails", JSON.stringify(testForm));
        Refresh();
      })
      .catch((err) => {
        console.log(err);
        Refresh();
      });
    setTestForm({});
  };

  const handleEndTest = () => {
    // localStorage.removeItem("testDetails");
    let testInfo = localStorage.getItem("testDetails");
    testInfo = JSON.parse(testInfo);

    const url = BASE_URL + "/users/endTest";
    axios
      .post(url, {
        email: testInfo.email,
        testCode: testInfo.testCode,
      })
      .then((res) => {
        console.log(res);
        alert(res.data.message);
        Refresh();

        localStorage.removeItem("testDetails");
      });
  };

  const Refresh = () => {
    window.location.reload();
  };

  return (
    <div className="App">
      <div style={{ width: "250px" }}>Welcome to proctaring</div>
      {/*
      <div>
        {testDetails === null && (
          <div className="testForm">
            <input
              type="text"
              placeholder="test code"
              value={testForm.testCode}
              onChange={(e) => {
                setTestForm((old_state) => ({
                  ...old_state,
                  testCode: e.target.value,
                }));
              }}
            ></input>
            <input
              type="text"
              placeholder="name"
              value={testForm.name}
              onChange={(e) => {
                setTestForm((old_state) => ({
                  ...old_state,
                  name: e.target.value,
                }));
              }}
            ></input>
            <input
              type="email"
              placeholder="email"
              value={testForm.email}
              onChange={(e) => {
                setTestForm((old_state) => ({
                  ...old_state,
                  email: e.target.value,
                }));
              }}
            ></input>
            <div
              onClick={(e) => {
                e.preventDefault();
                handleTestSubmit();
              }}
              className="button"
            >
              Submit
            </div>
          </div>
        )}
      </div>
      <div>
        {testDetails !== null && (
          <div className="testArea">
            <h2>Test is running</h2>
            <div
              onClick={(e) => {
                e.preventDefault();
                handleEndTest();
              }}
              className="button"
            >
              End Test
            </div>
          </div>
        )}
      </div>
      */}
      <Camera />
    </div>
  );
}

export default App;
