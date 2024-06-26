require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { abi, evm } = require("./compile.cjs");
const { Web3 } = require("web3");

let accounts;

const mnemonicPhrase = process.env.MNEMONIC; // 12 word mnemonic

let provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonicPhrase,
  },
  providerOrUrl: process.env.INFURA_URL,
});

const deploy = async () => {
  const web3 = new Web3(provider);

  accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy the Contract at Account ", accounts[0]);

  //initialize contract
  const myContract = new web3.eth.Contract(abi);

  //create contract deployer
  const deployer = await myContract.deploy({
    data: evm.bytecode.object,
  });

  //send transaction to the network
  txReceipt = await deployer.send({ from: accounts[0], gas: "1000000" });
  console.log(abi);
  console.log("Contract deployed to ", txReceipt.options.address);
  provider.engine.stop();
};

deploy();
