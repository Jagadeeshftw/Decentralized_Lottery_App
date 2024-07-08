import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const LockModule = buildModule("LotteryModule", (m) => {
  const lottery = m.contract("Lottery");
  return { lottery };
});

export default LockModule;
