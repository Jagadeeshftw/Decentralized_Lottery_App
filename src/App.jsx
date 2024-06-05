import "./App.css";
import React from "react";
import DisplayWallet from "./components/DisplayWallet";
import Web3 from "web3";
import contract from "./js/lottery.js";

const App = () => {

  const hello = async () => {
    // Check if Metamask is installed
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      // Request the user to connect accounts (Metamask will prompt)
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Get the connected accounts
      const accounts = await web3.eth.getAccounts();
      console.log('Connected accounts:', accounts);

      // Get the manager from the contract
      const manager = await contract.methods.manager().call();
      console.log('Manager Address:', manager);

    } else {
      console.log('MetaMask is not installed');
    }
  };

  // Call hello on component mount
  React.useEffect(() => {
    hello();
  }, []);

  return <DisplayWallet />;
};

export default App;
