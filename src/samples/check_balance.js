// following this: https://www.youtube.com/watch?v=t3wM5903ty0
// My account is on the goerli blockchain

import Logger from "../utility/logger.js";

const logger = new Logger("check_balance.js");

import {ADDRESSES} from "../addresses.js";
import Web3 from "web3";
import {ACCOUNTS} from "../utility/accounts.js";

const web3 = new Web3(ADDRESSES.goerli);

check_my_balance();

async function check_my_balance() {
  const balance = await web3.eth.getBalance(ACCOUNTS[0].address);
  const balance_eth = web3.utils.fromWei(balance);
  logger.info("my balance: ", balance_eth);
}
