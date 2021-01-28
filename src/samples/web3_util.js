import Web3 from "web3";
import {ADDRESSES} from "../addresses.js";

const logger = new Logger("web3_util.js");

export function getWeb3(blockchain=ADDRESSES.goerli) {
  const web3 = new Web3(blockchain);
  return web3
}
