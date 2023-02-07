import React from "react";
import "./App.css";

function App() {
  const testDetails = localStorage.getItem("testDetails");
  const [testForm, setTestForm] = React.useState({});
  const [refresh, setRefresh] = React.useState(false);

  const handleTestSubmit = () => {
    console.log(testForm);
    localStorage.setItem("testDetails", testForm);
    setTestForm({});
    Refresh();
  };

  const handleEndTest = () => {
    localStorage.removeItem("testDetails");
    Refresh();
  };

  const Refresh = () => {
    setRefresh(!refresh);
  };

  React.useEffect(() => {}, [refresh]);

  return (
    <div className="App">
      <div style={{ width: "250px" }}>Welcome to proctaring</div>
      <div>
        {testDetails === null && (
          <div className="testForm">
            <input
              type="text"
              placeholder="test id"
              value={testForm.testId}
              onChange={(e) => {
                setTestForm((old_state) => ({
                  ...old_state,
                  testId: e.target.value,
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
    </div>
  );
}

export default App;
