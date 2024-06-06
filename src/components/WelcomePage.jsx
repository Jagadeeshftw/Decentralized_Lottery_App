import React from "react";
import lottery from "../assets/Lottery-machine.png";
const WelcomePage = ({ currentBalance, currentPlayers }) => {
  return (
    <section
      className="hero section bg-dark text-secondary px-4 py-5 text-center"
      style={{ minHeight: "100vh" }}
    >
      <div class="container">
        <div class="row gy-4 d-flex justify-content-between">
          <div class="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
            <h2 className="display-5 fw-bold text-white" data-aos="fade-up">
              Welcome to the Decentralized Lottery
            </h2>
            <p data-aos="fade-up" data-aos-delay="100">
              Participate in our decentralized lottery system where transparency
              and fairness are guaranteed. Connect your wallet and get started!
            </p>

            <form
              action="#"
              class="form-search d-flex align-items-stretch mb-3"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <input
                type="text"
                class="form-control"
                placeholder="ETH Address"
              />
              <button type="submit" class="btn btn-primary">
                Enter
              </button>
            </form>

            <div class="row gy-4" data-aos="fade-up" data-aos-delay="300">
              <div class="col-lg-6 col-6">
                <div class="stats-item text-center w-100 h-100">
                  <span
                    data-purecounter-start="0"
                    data-purecounter-end="232"
                    data-purecounter-duration="0"
                    class="purecounter"
                  >
                    {currentPlayers.length}
                  </span>
                  <p>Total Participants</p>
                </div>
              </div>

              <div class="col-lg-6 col-6">
                <div class="stats-item text-center w-100 h-100">
                  <span
                    data-purecounter-start="0"
                    data-purecounter-end="521"
                    data-purecounter-duration="0"
                    class="purecounter"
                  >
                    {currentBalance} ETH
                  </span>
                  <p>Current Prize Pool</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-out">
            <div class="row">
              <div className="col-12">
                <img
                  src={lottery}
                  class="img-fluid"
                  style={{ width: "100%" }}
                  alt=""
                />
                <a class="cta-btn" href="#">Pick Winner</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomePage;
