"use client";
import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from "react";
import Web3 from "web3";
import contract from "../js/lottery";

interface LotteryContextType {
  displayPage: string;
  handleDisplayPage: (page: string) => void;
  currentPlayers: any[];
  handleCurrentPlayers: (players: any[]) => void;
  currentBalance: number;
  handleCurrentBalance: (balance: number) => void;
  selectedWallet: any;
  userAccount: string;
  handleConnect: (providerWithInfo: any) => void;
  errorMessage: string;
  clearError: () => void;
  setError: (error: string) => void;
}

const LotteryContext = createContext<LotteryContextType>({
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

const LotteryContextProvider = ({ children }: { children: ReactNode }) => {
  const [displayPage, setDisplayPage] = useState("HomePage");
  const [currentPlayers, setCurrentPlayers] = useState<any[]>([]);
  const [currentBalance, setBalance] = useState(0);

  const [selectedWallet, setSelectedWallet] = useState<any>(null);
  const [userAccount, setUserAccount] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const clearError = () => setErrorMessage("");
  const setError = (error: string) => setErrorMessage(error);

  const connectToWallet = async () => {
    try {
      if (typeof window !== "undefined" && window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        const manager = await contract.methods.manager().call();
        console.log(manager);
        const players = await contract.methods.getPlayers().call();
        setCurrentPlayers(players);
        const balance = await web3.eth.getBalance(contract.options.address);
        const balanceInEther = parseFloat(web3.utils.fromWei(balance, "ether"));
        setBalance(balanceInEther);
      } else {
        console.log("MetaMask is not installed");
      }
    } catch (error) {
      console.error("Error fetching data from the contract", error);
    }
  };

  const handleDisplayPage = (page: string) => {
    setDisplayPage(page);
  };

  const handleCurrentBalance = (balance: number) => {
    setBalance(balance);
  };

  const handleCurrentPlayers = (players: any[]) => {
    setCurrentPlayers(players);
  };

  useEffect(() => {
    connectToWallet();
  }, []);

  const handleConnect = async (providerWithInfo: any) => {
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

  const contextValues: LotteryContextType = {
    displayPage,
    handleDisplayPage,
    currentPlayers,
    handleCurrentPlayers,
    currentBalance,
    handleCurrentBalance,
    selectedWallet,
    userAccount,
    handleConnect,
    errorMessage,
    clearError,
    setError,
  };

  return (
    <LotteryContext.Provider value={contextValues}>
      {children}
    </LotteryContext.Provider>
  );
};

export { LotteryContext, LotteryContextProvider };
