const assert = require("assert");
const { Web3 } = require("web3");
const { abi, evm } = require("../src/js/compile.cjs");
const ganache = require("ganache");

const web3 = new Web3(ganache.provider({ port: 8545 }));

let accounts;

let txReceipt;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  //initialize contract
  const myContract = new web3.eth.Contract(abi);

  //create contract deployer
  const deployer = myContract.deploy({
    data: evm.bytecode.object, //bytecode must start with 0x
  });

  //send transaction to the network
  txReceipt = await deployer.send({ from: accounts[0], gas: "5000000" });
});

describe("Lottery", () => {
  it("deploy the contract", () => {
    //print deployed contract address
    assert.ok(txReceipt.options.address);
  });

  it("Allow one account to enter", async () => {
    //print deployed contract address
    await txReceipt.methods
      .enter()
      .send({ from: accounts[1], value: web3.utils.toWei("0.02", "ether") });

    const players = await txReceipt.methods
      .getPlayers()
      .call({ from: accounts[0] });
    assert.equal(players[0], accounts[1]);
    assert.equal(1, players.length);
  });

  it("Allow Multiple accounts to enter", async () => {
    //print deployed contract address
    await txReceipt.methods
      .enter()
      .send({ from: accounts[1], value: web3.utils.toWei("0.02", "ether") });
    await txReceipt.methods
      .enter()
      .send({ from: accounts[2], value: web3.utils.toWei("0.02", "ether") });
    const players = await txReceipt.methods
      .getPlayers()
      .call({ from: accounts[0] });
    assert.equal(players[0], accounts[1]);
    assert.equal(players[1], accounts[2]);
    assert.equal(2, players.length);
  });

  it("Require the minimal amount of ether to enter", async () => {
    try {
      await txReceipt.methods.enter().send({
        from: accounts[1],
        value: web3.utils.toWei("0.0001", "ether"),
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("Only the manager should pick the winner", async () => {
    try {
      await txReceipt.methods.pickWinner().send({
        from: accounts[1],
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("Enter the lottery and pick the winner", async () => {
    await txReceipt.methods
      .enter()
      .send({ from: accounts[1], value: web3.utils.toWei("1", "ether") });

    const initialBalance = await web3.eth.getBalance(accounts[1]);

    await txReceipt.methods.pickWinner().send({
      from: accounts[0],
    });

    const finalBalance = await web3.eth.getBalance(accounts[1]);

    assert(finalBalance > web3.utils.toWei("99.8", "ether"));

    const players = await txReceipt.methods
      .getPlayers()
      .call({ from: accounts[0] });

    assert.equal(0, players.length);
  });
});
