import React from "react";
import { BASE_URL } from "../constants";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Table,
  ModalFooter,
  Input,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function HomePage({ Refresh }) {
  let userStored = localStorage.getItem("userInfo");
  userStored = JSON.parse(userStored);
  // console.log(userStored.email);

  const [login, setLogin] = React.useState(true);
  const [loginDetails, setLoginDetails] = React.useState({});
  const [signUpDetails, setSignUpDetails] = React.useState({});
  const [testsRecords, setTestRecords] = React.useState([]);
  const [testInfo, setTestInfo] = React.useState({});
  const [model, setModel] = React.useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log(loginDetails);

    axios
      .post(BASE_URL + "users/login/", {
        email: loginDetails["email"],
        password: loginDetails["password"],
      })
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          alert("login succesful");
          const obj = {};
          obj.email = loginDetails.email;
          obj.userId = response.data.userId;
          obj.isAdmin = response.data.isAdmin;
          localStorage.setItem("userInfo", JSON.stringify(obj));
          setLoginDetails({ email: "", password: "" });
          Refresh();
        }
      })
      .catch(function (error) {
        alert("please check your credentials");
        console.log(error);
      });
  };

  const handleSignUp = () => {
    // console.log(signUpDetails);
    axios
      .post(BASE_URL + "/register/", {
        email: signUpDetails.email,
        name: signUpDetails.name,
        phone_number: signUpDetails.phone_number,
      })
      .then((res) => {
        // console.log(res);
        alert("registration successful");
        setLogin(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    Refresh();
  };

  const toggleModel = () => {
    setModel(!model);
  };

  const createTest = () => {
    const url = BASE_URL + "tests/create";

    axios
      .post(url, {
        name: testInfo["name"],
        code: testInfo["testCode"],
        startTime: testInfo["startTime"],
        endTime: testInfo["endTime"],
      })
      .then((res) => {
        alert("test creation successful");
        Refresh();
      })
      .catch((err) => {
        console.log(err);
        alert("error in creation of test");
      });
    console.log(testInfo);
  };

  const goToTestPage = (id) => {
    console.log(id);
    navigate(`/tests/${id}`);
  };

  React.useEffect(() => {
    const url = BASE_URL + "tests/allTests";

    axios
      .get(url)
      .then((response) => {
        console.log(response.data.tests);
        setTestRecords(response.data.tests);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div>
        {userStored === null && (
          <div>
            {login === true ? (
              <div className="login__box">
                <form className="login__form">
                  <h3>Login</h3>
                  <input
                    type="email"
                    placeholder="email"
                    value={loginDetails.email}
                    onChange={(e) => {
                      setLoginDetails((old_state) => ({
                        ...old_state,
                        email: e.target.value,
                      }));
                    }}
                  />
                  <input
                    type="password"
                    placeholder="password"
                    value={loginDetails.password}
                    onChange={(e) => {
                      setLoginDetails((old_state) => ({
                        ...old_state,
                        password: e.target.value,
                      }));
                    }}
                  />

                  <button
                    className="submit__button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogin();
                    }}
                  >
                    Submit
                  </button>
                  <p
                    className="form__link"
                    onClick={(e) => {
                      e.preventDefault();
                      setLogin(false);
                    }}
                  >
                    Register Instead
                  </p>
                </form>
              </div>
            ) : (
              <div className="signup__box">
                <form className="signUp__form">
                  <input
                    type="name"
                    placeholder="name"
                    value={signUpDetails.name}
                    onChange={(e) => {
                      setSignUpDetails((old_state) => ({
                        ...old_state,
                        name: e.target.value,
                      }));
                    }}
                  />
                  <input
                    type="email"
                    placeholder="email"
                    value={signUpDetails.email}
                    onChange={(e) => {
                      setSignUpDetails((old_state) => ({
                        ...old_state,
                        email: e.target.value,
                      }));
                    }}
                  />
                  <input
                    type="password"
                    placeholder="password"
                    value={signUpDetails.password}
                    onChange={(e) => {
                      setSignUpDetails((old_state) => ({
                        ...old_state,
                        password: e.target.value,
                      }));
                    }}
                  />

                  <button
                    className="submit__button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSignUp();
                    }}
                  >
                    Submit
                  </button>
                  <p
                    className="form__link"
                    onClick={(e) => {
                      e.preventDefault();
                      setLogin(true);
                    }}
                  >
                    Login Instead
                  </p>
                </form>
              </div>
            )}
          </div>
        )}
        {userStored != null && (
          <div>
            <h1>Hi {userStored.email}</h1>
            <h2>Home</h2>
            <Table
              className="testRecords_table"
              style={{ width: "80%", margin: "auto" }}
            >
              <thead>
                <tr>
                  <th>Test Id</th>
                  <th>Test Name</th>
                  <th>Test code</th>
                  <th>Test StartTime</th>
                  <th>Test End TIme</th>
                </tr>
              </thead>
              <tbody>
                {testsRecords.map((each, ind) => {
                  return (
                    <tr
                      key={each._id}
                      onClick={(e) => {
                        e.preventDefault();
                        goToTestPage(each._id);
                      }}
                    >
                      <td>{each._id}</td>
                      <td>{each.name}</td>
                      <td>{each.testCode}</td>
                      <td>{each.startTime}</td>
                      <td>{each.endTime}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <div
              onClick={(e) => {
                e.preventDefault();
                toggleModel();
              }}
            >
              Add new Test
            </div>
            <p
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
              style={{ position: "absolute", left: "2px", bottom: "10px" }}
            >
              logout
            </p>
          </div>
        )}
      </div>

      <Modal isOpen={model} toggle={toggleModel} backdrop={true}>
        <ModalBody>
          <div className="">
            <div className="">
              <p>Test name</p>
              <Input
                placeholder="please enter the Test Name"
                type="text"
                value={testInfo.name}
                onChange={(e) => {
                  setTestInfo((old_state) => ({
                    ...old_state,
                    name: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="">
              <p>Test Code</p>
              <Input
                placeholder="please enter a unique test code"
                type="text"
                value={testInfo.testCode}
                onChange={(e) => {
                  setTestInfo((old_state) => ({
                    ...old_state,
                    testCode: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="">
              <p>Start Time</p>
              <Input
                placeholder="please enter the Start Time"
                type="datetime-local"
                value={testInfo.startTime}
                onChange={(e) => {
                  setTestInfo((old_state) => ({
                    ...old_state,
                    startTime: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="">
              <p>End Time</p>
              <Input
                placeholder="please enter the End Time"
                type="datetime-local"
                value={testInfo.endTime}
                onChange={(e) => {
                  setTestInfo((old_state) => ({
                    ...old_state,
                    endTime: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              marginTop: "10px",
            }}
          >
            <Button
              className="button_styled"
              onClick={() => toggleModel()}
              color="danger"
            >
              close
            </Button>
            <Button
              className="button_styled"
              onClick={() => {
                createTest();
              }}
              color="primary"
            >
              Add friend
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default HomePage;
