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
        '*': ['*'],
      },
    },
  },
};

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  'Lottery.sol'
].Lottery;

