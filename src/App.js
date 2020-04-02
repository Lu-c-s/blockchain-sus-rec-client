import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

const USER_TYPE = {
  PATIENT: true,
  PROVIDER: false
};

function App() {
  const [user, setUser] = useState(USER_TYPE.PATIENT);

  return (
    <div className="App">
      <LoginPage setUserType={user => setUser(user)} currentUser={user} />
    </div>
  );
}

export default App;
