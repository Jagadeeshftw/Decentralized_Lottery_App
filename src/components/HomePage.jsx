import React from 'react';

const HomePage = ({ displayPage }) => {
  return (
    <div
      className="bg-dark text-secondary px-4 py-5 text-center"
      style={{ height: "100vh" }}
    >
      <div className="py-5">
        <h1 className="display-5 fw-bold text-white">
          Join the Decentralized Lottery
        </h1>
        <div className="col-lg-6 mx-auto">
          <p className="fs-5 mb-4">
            Participate in our decentralized lottery system where transparency
            and fairness are guaranteed. Connect your wallet and get started!
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button
              type="button"
              className="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold"
              onClick={() =>displayPage("Wallet")}
            >
              Connect your wallet
            </button>
            <button
              type="button"
              className="btn btn-outline-light btn-lg px-4"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              How to Participate
            </button>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
          <div className="modal-content bg-dark text-secondary">
            <div className="modal-header">
              <h5 className="modal-title display-7 fw-bold text-white" id="exampleModalLabel">
                How to Participate
              </h5>
              <button
                type="button"
                className="btn-close bg-light"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h5 className="text-white">Introduction</h5>
              <p>
                Welcome to our decentralized lottery system. By participating, you have a fair and equal chance to win the entire pool of collected funds. Here’s how it works:
              </p>
              
              <h5 className="text-white">How to Enter</h5>
              <p>
                To join the lottery, simply connect your wallet and send at least 0.01 ether. This amount will be added to the lottery pool, and your address will be entered into the draw.
              </p>
              
              <h5 className="text-white">Picking the Winner</h5>
              <p>
                Only the manager (the person who deployed the contract) has the authority to pick the winner. The winner is selected randomly, ensuring fairness and transparency. The entire pool is then transferred to the winner’s address.
              </p>
              
              <h5 className="text-white">Rules</h5>
              <ul>
                <li>The minimum entry fee is 0.01 ether.</li>
                <li>Only the manager can pick the winner.</li>
                <li>The winner is chosen randomly using a combination of block data and participant addresses.</li>
                <li>All transactions are recorded on the blockchain and are immutable.</li>
              </ul>

              <h5 className="text-white">Get Started</h5>
              <p>
                Ready to try your luck? Connect your wallet and join the lottery now. Good luck!
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-light"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
