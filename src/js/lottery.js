"use client";
import Web3 from "web3";
import abi from "../build/LotteryABI.json";

let contract = undefined;
if (typeof window !== "undefined" && window.ethereum) {
  const web3 = new Web3(window.ethereum);

  contract = new web3.eth.Contract(
    abi,
    //   "0xF81413BeF8a63b41E1c262B729Df3E75548A8441"
    //"0x38223BEA0BBcfC520530e442b333AC73779248f5"
    "0xBE1809D4b709A506cf857Bf7A47A98184246D278"
  );
}

export default contract;
