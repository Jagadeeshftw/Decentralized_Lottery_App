"use client";
import { useContext, useEffect } from "react";
import { useSyncProviders } from "../../hooks/useSyncProviders";
import { LotteryContext } from "../../store/Lottery-context";
import Link from "next/link";
const DisplayWallet = () => {
  const providers = useSyncProviders();

  const {
    handleDisplayPage,
    handleConnect,
    selectedWallet,
    userAccount,
    errorMessage,
    clearError,
  } = useContext(LotteryContext);

  useEffect(() => {}, [providers]);

  const isError = !!errorMessage;

  const formatAddress = (addr) => {
    const upperAfterLastTwo = addr.slice(0, 2) + addr.slice(2);
    return `${upperAfterLastTwo.substring(
      0,
      5
    )}...${upperAfterLastTwo.substring(39)}`;
  };

  return (
    <div
      className="DisplayWallet bg-dark text-secondary px-4 py-5 text-center"
      style={{ height: "100vh" }}
    >
      <h2>Wallets Detected:</h2>
      <div className="providers">
        {providers.length > 0 ? (
          providers.map((provider) => (
            <button
              type="button"
              className="btn btn-outline-light btn-lg px-4 mt-4"
              key={provider.info.uuid}
              onClick={() => {
                handleConnect(provider);
              }}
            >
              <img src={provider.info.icon} alt={provider.info.name} />
              <div>{provider.info.name}</div>
            </button>
          ))
        ) : (
          <div>No Announced Wallet Providers</div>
        )}
      </div>
      <hr />
      <h2>{userAccount ? "" : "No"} Wallet Selected</h2>
      {userAccount && (
        <>
          <div className="selectedWallet mt-4">
            <img
              src={selectedWallet?.info.icon}
              alt={selectedWallet?.info.name}
            />
            <div>{selectedWallet?.info.name}</div>
            <div>({formatAddress(userAccount)})</div>
          </div>
          <Link
            href="/home"
            type="button"
            className="btn btn-outline-light btn-lg px-4 mt-4"
            style={{ width: "15rem" }}
            onClick={() => handleDisplayPage("WelcomePage")}
          >
            Let's get started
          </Link>
        </>
      )}
      <div
        className="mmError"
        style={isError ? { backgroundColor: "brown" } : {}}
      >
        {isError && (
          <div onClick={clearError}>
            <strong>Error:</strong> {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayWallet;
