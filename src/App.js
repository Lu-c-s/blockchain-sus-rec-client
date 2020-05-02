import React, { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import PatientPage from "./pages/PatientPage";
import ProviderPage from "./pages/ProviderPage";
import Web3 from "web3";
import Patient from "./abis/Patient.json";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  const [account, setAccount] = useState(null);
  const [patientData, setPatientData] = useState(null) 

  useEffect(() => {
    (async function loadAllData() {
      await loadWeb3();      
    })();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  
  return (
    <div className="App">      
      <BrowserRouter>
        <Switch>
          <Route path="/patient">
            <PatientPage patientData={patientData}/>
          </Route>
          <Route path="/provider">
            <ProviderPage  account={account} />
          </Route>
          <Route path="/">
            <LoginPage 
               patientData={patientData}
               setPatientData={data => setPatientData(data)}
               account={account} 
               setAccount={acc => setAccount(acc)}/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
