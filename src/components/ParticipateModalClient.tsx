"use client";
import { useState, useEffect, useRef } from "react";
import { IoIosClose } from "react-icons/io";

const ParticipateModalClient = () => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  return (
    <>
      <button
        onClick={toggleModal}
        className="custom-button"
        data-modal-toggle="default-modal"
      >
        How to Participate
      </button>

      <div
        id="default-modal"
        tabIndex={-1}
        aria-hidden={!showModal}
        className={`absolute left-0 right-0 -bottom-36 flex justify-center items-center z-50 ${showModal ? "" : "hidden"}`}
      >
        <div
          ref={modalRef}
          className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full max-w-7xl"
        >
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              How to Participate
            </h3>
            <button
              type="button"
              className="bg-transparent"
              data-modal-hide="default-modal"
              onClick={toggleModal}
            >
              <IoIosClose className="w-8 h-8 bg-transparent" />
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-4 md:p-5 space-y-4">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              <span className="font-bold ">How to Enter</span>: To join the
              lottery, simply connect your wallet and send at least 0.01 ether.
              This amount will be added to the lottery pool, and your address
              will be entered into the draw.
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              <span className="font-bold ">Picking the Winner</span>: Only the
              manager (the person who deployed the contract) has the authority
              to pick the winner. The winner is selected randomly, ensuring
              fairness and transparency. The entire pool is then transferred to
              the winner’s address.
            </p>
            <div className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              <span className="font-bold ">Rules</span>:{" "}
              <ul>
                <li>1. The minimum entry fee is 0.01 ether.</li>
                <li>2. Only the manager can pick the winner.</li>
                <li>
                  3. The winner is chosen randomly using a combination of block
                  data and participant addresses.
                </li>
                <li>
                  4. All transactions are recorded on the blockchain and are
                  immutable.
                </li>
              </ul>
            </div>
          </div>

          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              data-modal-hide="default-modal"
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={toggleModal}
            >
              I accept
            </button>
            <button
              data-modal-hide="default-modal"
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={toggleModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParticipateModalClient;
