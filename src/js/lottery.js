import Web3 from "web3";
import abi from "../build/LotteryABI.json";
const web3 = new Web3(window.ethereum);

const contract = new web3.eth.Contract(
  abi,
  //   "0xF81413BeF8a63b41E1c262B729Df3E75548A8441"
  "0x38223BEA0BBcfC520530e442b333AC73779248f5"
);

export default contract;
