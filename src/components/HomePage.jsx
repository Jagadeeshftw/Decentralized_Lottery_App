import React from 'react';

const HomePage = ({ displayWallet }) => {
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
              onClick={displayWallet}
            >
              Connect your wallet
            </button>
            <button
              type="button"
              className="btn btn-outline-light btn-lg px-4"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Learn More
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
                Learn More
              </h5>
              <button
                type="button"
                className="btn-close bg-light"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                The decentralized lottery system ensures fairness and transparency
                by leveraging blockchain technology. Every participant has an
                equal chance of winning, and all transactions are recorded on the
                blockchain, making them immutable and verifiable.
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
