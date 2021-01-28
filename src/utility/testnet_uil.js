import Web3 from "web3";
import {ADDRESSES} from "../addresses.js";
import Logger from "./logger.js";

const logger = new Logger("testnet_uil.js");

export function get_testnet_web3() {
  return new Web3(ADDRESSES.goerli);
}

export async function print_balances(web3, accounts) {
  const get_balance = async (web3, account) => await web3.eth.getBalance(account);
  for (const acc of accounts) {
    const balance = await get_balance(web3, acc);
    const balance_eth = web3.utils.fromWei(balance, 'ether');
    logger.debug(`account: ${acc} - balance (eth): ${balance_eth}`);
  }
}
