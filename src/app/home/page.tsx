"use client";
import React, { useState, useContext, useEffect } from "react";
import lottery from "../icon.png";
import { LotteryContext } from "../../store/Lottery-context";
import contract from "../../js/lottery";
import Web3 from "web3";
import Image from "next/image";
import { BackgroundBeams } from "../../components/ui/background-beams";

const WelcomePage = () => {
  const {
    currentBalance,
    currentPlayers,
    userAccount,
    handleCurrentPlayers,
    handleCurrentBalance,
  } = useContext(LotteryContext);
  const [ethAddress, setEthAddress] = useState(userAccount);
  const [participationAmount, setParticipationAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [winnerMessage, setWinnerMessage] = useState("");

  useEffect(() => {
    setEthAddress(userAccount);
  }, [userAccount]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000); // Hide message after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (winnerMessage) {
      const timer = setTimeout(() => {
        setWinnerMessage("");
      }, 5000); // Hide message after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [winnerMessage]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    try {
      const web3 = new Web3(window.ethereum);
      await contract.methods.enter().send({
        from: ethAddress,
        value: web3.utils.toWei(participationAmount, "ether"),
        gas: 1000000,
      });
      setSuccessMessage("You have entered into the lottery successfully!");
      // Get current players
      const players = await contract.methods.getPlayers().call();
      handleCurrentPlayers(players);
      // Get current balance
      const balance = await web3.eth.getBalance(contract.options.address);
      handleCurrentBalance(parseFloat(web3.utils.fromWei(balance, "ether")));
    } catch (error) {
      console.error("Transaction failed", error);
      setSuccessMessage("Transaction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const pickWinner = async (event) => {
    event.preventDefault();
    setLoading(true);
    setWinnerMessage("");
    try {
      const web3 = new Web3(window.ethereum);
      await contract.methods.pickWinner().send({
        from: ethAddress,
        gas: 1000000,
      });
      const winner = await contract.methods.getLastWinner().call();
      setWinnerMessage(`The winner is: ${winner}`);
      // Update players and balance after picking a winner
      const players = await contract.methods.getPlayers().call();
      handleCurrentPlayers(players);
      const balance = await web3.eth.getBalance(contract.options.address);
      handleCurrentBalance(parseFloat(web3.utils.fromWei(balance, "ether")));
    } catch (error) {
      console.error("Failed to pick a winner", error);
      setWinnerMessage("Failed to pick a winner. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="hero bg-dark text-secondary py-5 px-5 text-center min-h-full max-w-full ">
      <div className="container z-50">
        <div className="row d-flex justify-content-between">
          <div className="col-lg-7 order-1 d-flex flex-column justify-content-center">
            <h4 className="text-2xl sm:text-5xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold animate__animated animate__fadeInDown">
              Welcome to the Decentralized Lottery
            </h4>
            <p className="animate__animated animate__zoomIn mt-6">
              Your wallet is connected! Confirm your Ethereum address and enter
              the lottery by providing the entry fee below. The minimum entry
              fee is 0.001 ETH. Stay tuned for updates on the total participants
              and current prize pool. Currently, this lottery supports only
              Sepolia Ethereum.
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex py-2 animate__animated animate__zoomIn sm:flex-row flex-col"
            >
              <div className="form-floating" style={{ flex: "5" }}>
                <input
                  type="text"
                  className="form-control"
                  value={ethAddress}
                  onChange={(e) => setEthAddress(e.target.value)}
                  id="floatingAddress"
                  placeholder="ETH Address"
                />
                <label htmlFor="floatingAddress">ETH Address</label>
              </div>

              <div className="form-floating" style={{ flex: "3" }}>
                <input
                  type="text"
                  className="form-control"
                  value={participationAmount}
                  id="floatingFee"
                  onChange={(e) => setParticipationAmount(e.target.value)}
                  placeholder="Entry Fee (ETH)"
                />
                <label htmlFor="floatingFee">Entry Fee (ETH)</label>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Processing..." : "Enter"}
              </button>
            </form>

            {successMessage && (
              <div className="alert alert-info" role="alert">
                {successMessage}
              </div>
            )}

            <div className="row mt-0 animate__animated animate__fadeInUp">
              <div className="col-lg-6 col-6">
                <div className="stats-item text-center w-100 h-100">
                  <span>{currentPlayers.length}</span>
                  <p>Total Participants</p>
                </div>
              </div>
              <div className="col-lg-6 col-6">
                <div className="stats-item text-center w-100 h-100 flex flex-col">
                  <span className="block">{currentBalance} ETH</span>
                  <p>Current Prize Pool</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5 order-2 d-flex flex-column align-items-center justify-content-center">
            <Image
              src={lottery}
              alt=""
              width={600}
              height={350}
              className="animate__animated animate__fadeInDown"
            />
            <button
              disabled={loading}
              className="cta-btn animate__animated animate__fadeInUp"
              onClick={pickWinner}
            >
              {loading ? "Picking Winner..." : "Pick Winner"}
            </button>
            {winnerMessage && (
              <div className="alert alert-success mt-3" role="alert">
                {winnerMessage}
              </div>
            )}
          </div>
        </div>
      </div>
      <BackgroundBeams />
    </section>
  );
};

export default WelcomePage;
