import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import PatientPage from "./pages/PatientPage";
import ProviderPage from "./pages/ProviderPage";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

const USER_TYPE = {
  PATIENT: true,
  PROVIDER: false
};

function App() {
  const [user, setUser] = useState(USER_TYPE.PATIENT);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/patient">
            <PatientPage />
          </Route>
          <Route path="/provider">
            <ProviderPage />
          </Route>
          <Route path="/">
            <LoginPage setUserType={user => setUser(user)} currentUser={user} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
