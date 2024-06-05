const path = require("path");
const fs = require("fs");
const solc = require("solc");

// Read the Solidity source code from the file
const lotteryPath = path.resolve(
  __dirname,
  "../",
  "../",
  "Contract",
  "Lottery.sol"
);

const source = fs.readFileSync(lotteryPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'Lottery.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['abi', 'evm.bytecode'],
      },
    },
  },
};

// Compile the contract
const output = JSON.parse(solc.compile(JSON.stringify(input)));

// Export the ABI and bytecode
const abi = output.contracts['Lottery.sol'].Lottery.abi;
const evm = output.contracts['Lottery.sol'].Lottery.evm;

module.exports = { abi, evm };
