import { useState } from "react";
import { useSyncProviders } from "../hooks/useSyncProviders";
const DisplayWallet = ({ displayPage }) => {
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [userAccount, setUserAccount] = useState("");
  const providers = useSyncProviders();

  const [errorMessage, setErrorMessage] = useState("");
  const clearError = () => setErrorMessage("");
  const setError = (error) => setErrorMessage(error);
  const isError = !!errorMessage;

  // Display a readable user address.
  const formatAddress = (addr) => {
    const upperAfterLastTwo = addr.slice(0, 2) + addr.slice(2);
    return `${upperAfterLastTwo.substring(
      0,
      5
    )}...${upperAfterLastTwo.substring(39)}`;
  };

  const handleConnect = async (providerWithInfo) => {
    try {
      const accounts = await providerWithInfo.provider.request({
        method: "eth_requestAccounts",
      });

      setSelectedWallet(providerWithInfo);
      setUserAccount(accounts?.[0]);
    } catch (error) {
      console.error(error);
      setError(`Code: ${error.code} \nError Message: ${error.message}`);
    }
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
              onClick={() => handleConnect(provider)}
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
          <button
            type="button"
            className="btn btn-outline-light btn-lg px-4 mt-4"
            style={{ width: "15rem" }}
            onClick={() => displayPage("WelcomePage")}
          >
            Let's get started
          </button>
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
