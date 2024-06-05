import Web3 from "web3";
import {abi, evm} from "./compile.cjs"
const web3 = new Web3(window.ethereum);


const contract = new web3.eth.Contract(
  abi,
  //   "0xF81413BeF8a63b41E1c262B729Df3E75548A8441"
  "0xB984CB3a1cfB4DBdd9D16202c4213628D4F4E97E"
);

export default contract;
