"use client";
import React, { useState, useContext, useEffect } from "react";
import lottery from "../icon.png";
import { LotteryContext } from "../../store/Lottery-context";
import contract from "../../js/lottery";
import Web3 from "web3";

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
      console.log("the current players " + currentPlayers);
      console.log("the current balance " + currentBalance);
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

  return (
    <section
      className="hero section bg-dark text-secondary px-0 py-5 text-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="container">
        <div className="row d-flex justify-content-between">
          <div className="col-lg-7 order-2 order-lg-1 d-flex flex-column justify-content-center">
            <h4 className="display-6 fw-bold text-white">
              Welcome to the Decentralized Lottery
            </h4>
            <p>
              Your wallet is connected! Confirm your Ethereum address and enter
              the lottery by providing the entry fee below. The minimum entry
              fee is 0.001 ETH. Stay tuned for updates on the total participants
              and current prize pool.
            </p>
            <form onSubmit={handleSubmit} className="d-flex  py-2 m-0">
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

            <div className="row mt-0">
              <div className="col-lg-6 col-6">
                <div className="stats-item text-center w-100 h-100">
                  <span>{currentPlayers.length}</span>
                  <p>Total Participants</p>
                </div>
              </div>
              <div className="col-lg-6 col-6">
                <div className="stats-item text-center w-100 h-100">
                  <span>{currentBalance} ETH</span>
                  <p>Current Prize Pool</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5 order-1 order-lg-2 hero-img">
            <img
              src={lottery.src}
              className="img-fluid"
              style={{ width: "100%" }}
              alt=""
            />

            <a className="cta-btn" href="#">
              Pick Winner
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomePage;
