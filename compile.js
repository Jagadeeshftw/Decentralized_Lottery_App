const path = require("path");
const fs = require("fs");
const solc = require("solc");

// Read the Solidity source code from the file
const lotteryPath = path.resolve(__dirname, "Contract", "Lottery.sol");
const source = fs.readFileSync(lotteryPath, "utf-8");

// Compile the Solidity source code
const input = {
  language: "Solidity",
  sources: {
    "Lottery.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const compiledOutput = JSON.parse(solc.compile(JSON.stringify(input)));

const compiledContract = compiledOutput.contracts["Lottery.sol"]["Lottery"];
const ABI = compiledContract.abi;
const BYTECODE = compiledContract.evm.bytecode.object;

module.exports = {ABI, BYTECODE};
