import React, { useState, useContext, useEffect } from "react";
import lottery from "../assets/Lottery-machine.png";
import { LotteryContext } from "../store/Lottery-context";

const WelcomePage = () => {
  const { currentBalance, currentPlayers, userAccount } =
    useContext(LotteryContext);
  const [ethAddress, setEthAddress] = useState(userAccount);

  useEffect(() => {
    setEthAddress(userAccount);
  }, [userAccount]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add functionality for entering the lottery with ethAddress
    console.log("Entering the lottery with address:", ethAddress);
  };

  return (
    <section
      className="hero section bg-dark text-secondary px-4 py-5 text-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="container">
        <div className="row gy-4 d-flex justify-content-between">
          <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
            <h2 className="display-5 fw-bold text-white">
              Welcome to the Decentralized Lottery
            </h2>
            <p>
              Your wallet is connected! Enter the lottery by confirming your
              Ethereum address below. Stay tuned for updates on the total
              participants and current prize pool.
            </p>

            <form
              onSubmit={handleSubmit}
              className="form-search d-flex align-items-stretch mb-3"
            >
              <input
                type="text"
                className="form-control"
                value={ethAddress}
                onChange={(e) => setEthAddress(e.target.value)}
                placeholder="ETH Address"
              />
              <button type="submit" className="btn btn-primary">
                Enter
              </button>
            </form>

            <div className="row gy-4">
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

          <div className="col-lg-6 order-1 order-lg-2 hero-img">
            <img
              src={lottery}
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
