import "./App.css";
import { useContext } from "react";
import DisplayWallet from "./components/DisplayWallet";
import { LotteryContext } from "./store/Lottery-context.jsx";
import HomePage from "./components/HomePage.jsx";
import WelcomePage from "./components/WelcomePage.jsx";

const App = () => {
  const { displayPage } = useContext(LotteryContext);
  return (
    <>
      {displayPage === "HomePage" ? (
        <HomePage />
      ) : displayPage === "Wallet" ? (
        <DisplayWallet />
      ) : (
        <WelcomePage />
      )}
    </>
  );
};

export default App;
