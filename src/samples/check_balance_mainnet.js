import Web3 from "web3";
import {ADDRESSES} from "../addresses.js";
import {check_balance} from "../utility/account_util.js";
import Logger from "../utility/logger.js";

const account_address = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const web3 = new Web3(ADDRESSES.mainnet);
const logger = new Logger("check_balance_mainnet");
const balance = check_balance(web3, account_address);
logger.info("balance is: ", balance);



