import { Modal, Button } from "react-bootstrap";

const ParticipateModal = (props) => {
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="modal-participate"
      contentClassName="bg-dark text-secondary"
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="modal-participate"
          className="display-7 fw-bold text-white"
        >
          How to Participate
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 className="text-white">Introduction</h5>
        <p>
          Welcome to our decentralized lottery system. By participating, you
          have a fair and equal chance to win the entire pool of collected
          funds. Here’s how it works:
        </p>

        <h5 className="text-white">How to Enter</h5>
        <p>
          To join the lottery, simply connect your wallet and send at least 0.01
          ether. This amount will be added to the lottery pool, and your address
          will be entered into the draw.
        </p>

        <h5 className="text-white">Picking the Winner</h5>
        <p>
          Only the manager (the person who deployed the contract) has the
          authority to pick the winner. The winner is selected randomly,
          ensuring fairness and transparency. The entire pool is then
          transferred to the winner’s address.
        </p>

        <h5 className="text-white">Rules</h5>
        <ul>
          <li>The minimum entry fee is 0.01 ether.</li>
          <li>Only the manager can pick the winner.</li>
          <li>
            The winner is chosen randomly using a combination of block data and
            participant addresses.
          </li>
          <li>
            All transactions are recorded on the blockchain and are immutable.
          </li>
        </ul>

        <h5 className="text-white">Get Started</h5>
        <p>
          Ready to try your luck? Connect your wallet and join the lottery now.
          Good luck!
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-light" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ParticipateModal;
