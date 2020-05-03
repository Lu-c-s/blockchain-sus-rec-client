import React from "react";
import LoginPage from "./pages/LoginPage";
import PatientPage from "./pages/PatientPage";
import ProviderPage from "./pages/ProviderPage";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">      
      <BrowserRouter>
        <Switch>
          <Route path="/patient">
            <PatientPage />
          </Route>
          <Route path="/provider">
            <ProviderPage  />
          </Route>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
