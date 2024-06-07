import { createContext } from "react";

import { useState, useEffect } from "react";
import Web3 from "web3";
import contract from "../js/lottery";

const LotteryContext = createContext({
  displayPage: "HomePage",
  handleDisplayPage: () => {},
  currentPlayers: [],
  handleCurrentPlayers: () => {},
  currentBalance: 0,
  handleCurrentBalance: () => {},
  selectedWallet: null,
  userAccount: "",
  handleConnect: () => {},
  errorMessage: "",
  clearError: () => {},
  setError: () => {},
});

const LotteryContextProvider = ({ children }) => {
  const [displayPage, setDisplayPage] = useState("HomePage");
  const [currentPlayers, setCurrentPlayers] = useState([]);
  const [currentBalance, setBalance] = useState(0);

  const [selectedWallet, setSelectedWallet] = useState(null);
  const [userAccount, setUserAccount] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const clearError = () => setErrorMessage("");
  const setError = (error) => setErrorMessage(error);

  const connectToWallet = async () => {
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
        console.log("the current players " + currentPlayers);
        console.log("the current balance " + currentBalance);
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

  const handleCurrentBalance = (balance) => {
    setBalance(balance);
  };

  const handleCurrentPlayers = (players) => {
    setCurrentPlayers(players);
  };

  // Call connectToWallet on component mount
  useEffect(() => {
    connectToWallet();
  }, []);


  const handleConnect = async (providerWithInfo) => {
    try {
      const accounts = await providerWithInfo.provider.request({
        method: "eth_requestAccounts",
      });

      setSelectedWallet(providerWithInfo);
      setUserAccount(accounts?.[0]);
    } catch (error) {
      console.error(error);
      setError(`Code: ${error.code} \nError Message: ${error.message}`);
    }
  };

  const contextValues = {
    displayPage: displayPage,
    handleDisplayPage: handleDisplayPage,
    currentPlayers: currentPlayers,
    handleCurrentPlayers: handleCurrentPlayers,
    currentBalance: currentBalance,
    handleCurrentBalance: handleCurrentBalance,
    selectedWallet: selectedWallet,
    userAccount: userAccount,
    handleConnect: handleConnect,
    errorMessage: errorMessage,
    clearError: clearError,
    setError: setError,
  };

  return (
    <LotteryContext.Provider value={contextValues}>
      {children}
    </LotteryContext.Provider>
  );
};

export { LotteryContext, LotteryContextProvider };
