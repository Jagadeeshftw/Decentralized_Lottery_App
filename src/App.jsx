import "./App.css";
import React, { useState, useEffect } from "react";
import DisplayWallet from "./components/DisplayWallet";
import Web3 from "web3";
import contract from "./js/lottery.js";
import HomePage from "./components/HomePage.jsx";
import WelcomePage from "./components/WelcomePage.jsx";

const App = () => {
  const [displayPage, setDisplayPage] = useState("HomePage");
  const [currentPlayers, setCurrentPlayers] = useState([]);
  const [currentBalance, setBalance] = useState(0);

  const hello = async () => {
    try {
      // Check if Metamask is installed
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);

        // Get the connected accounts
        const accounts = await web3.eth.getAccounts();
        console.log("Connected accounts:", accounts);

        // Get the manager from the contract
        const manager = await contract.methods.manager().call();

        // Get current players
        const players = await contract.methods.getPlayers().call();
        setCurrentPlayers(players);
       console.log("the current players " + currentPlayers)
       console.log("the current balance " + currentBalance)
        // Get current balance
        const balance = await web3.eth.getBalance(contract.options.address);
        setBalance(web3.utils.fromWei(balance, "ether"));

        console.log("Manager Address:", manager); 
      } else {
        console.log("MetaMask is not installed");
      }
    } catch (error) {
      console.error("Error fetching data from the contract", error);
    }
  };

  const handleDisplayPage = (page) => {
    setDisplayPage(page);
  };

  // Call hello on component mount
  useEffect(() => {
    hello();
  }, []);

  return (
    <>
      {displayPage === "HomePage" ? (
        <HomePage displayPage={handleDisplayPage} />
      ) : displayPage === "Wallet" ? (
        <DisplayWallet displayPage={handleDisplayPage} />
      ) : (
        <WelcomePage currentBalance={currentBalance} currentPlayers={currentPlayers} />
      )}
    </>
  );
};

export default App;
