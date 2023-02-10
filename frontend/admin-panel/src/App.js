import "./App.css";
import HomePage from "./components/HomePage";
import TestPage from "./components/TestPage";
import UserPage from "./components/UserPage";

import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";

export default function App() {
  const [refresh, setRefresh] = React.useState(false);

  const Refresh = () => {
    setRefresh(!refresh);
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage Refresh={Refresh} />} />
          <Route path="tests/:id" element={<TestPage />} />
          <Route path="tests/:id/user/:email" element={<UserPage />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Page Not Found</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
