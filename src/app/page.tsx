import Link from "next/link";
import ParticipateModalClient from "../components/ParticipateModalClient";

export default function HomePage() {
  return (
    <div className="full-page bg-dark text-secondary px-4 py-5 text-center">
      <div className="py-5">
        <h1 className="display-5 fw-bold text-white animate__animated animate__fadeInDown">
          Join the Decentralized Lottery
        </h1>
        <div className="col-lg-6 mx-auto">
          <p className="fs-5 mb-4 animate__animated animate__zoomIn">
            Participate in our decentralized lottery system where transparency
            and fairness are guaranteed. Connect your wallet and get started!
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center animate__animated animate__fadeInUp">
            <Link
              href="/wallet"
              className="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold"
            >
              Connect your wallet
            </Link>
            <ParticipateModalClient />
          </div>
        </div>
      </div>
    </div>
  );
}
