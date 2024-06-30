"use client";
import { useContext, useEffect } from "react";
import { useSyncProviders } from "../../hooks/useSyncProviders";
import { LotteryContext } from "../../store/Lottery-context";
import Link from "next/link";
import { BackgroundGradientAnimation } from "../../components/ui/background-gradient-animation";
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
    <BackgroundGradientAnimation>
      <div className="absolute insert-0 DisplayWallet z-50 px-4 py-3 text-center">
        <h2 className="title text-2xl font-bold animate__animated animate__zoomIn">
          Wallets Detected:
        </h2>
        <p className="title text-lg animate__animated animate__zoomIn">
          To participate in the decentralized lottery, please connect your
          MetaMask wallet by clicking the button below.
        </p>
        <div className="providers">
          {providers.length > 0 ? (
            providers.map((provider) => (
              <button
                type="button"
                className="custom-button flex justify-center items-center flex-col"
                key={provider.info.uuid}
                onClick={() => {
                  handleConnect(provider);
                }}
              >
                <img
                  src={provider.info.icon}
                  alt={provider.info.name}
                  className="text-center"
                />
                <div>{provider.info.name}</div>
              </button>
            ))
          ) : (
            <div className="title text-2xl font-bold animate__animated animate__zoomIn">
              No Announced Wallet Providers
            </div>
          )}
        </div>
        <hr className=" text-white bg-white font-extrabold" />
        <h2 className="title text-2xl font-bold animate__animated animate__zoomIn">
          {userAccount ? "" : "No"} Wallet Selected
        </h2>
        <div className="providers">
          {userAccount && (
            <>
              <button className="custom-button pointer-events-none flex justify-center items-center gap-3">
                <img
                  src={selectedWallet?.info.icon}
                  alt={selectedWallet?.info.name}
                />
                <div>
                  <div>{selectedWallet?.info.name}</div>
                  <div>({formatAddress(userAccount)})</div>
                </div>
              </button>
              <Link
                href="/home"
                type="button"
                className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 mt-4"
                style={{ width: "15rem" }}
                onClick={() => handleDisplayPage("WelcomePage")}
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className=" relative inline-flex h-full w-full items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                  Let's get started
                </span>
              </Link>
            </>
          )}
        </div>
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
    </BackgroundGradientAnimation>
  );
};

export default DisplayWallet;
