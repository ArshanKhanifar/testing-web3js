import {ADDRESSES} from "./addresses.js";
import Web3 from "web3";

const web3 = new Web3(ADDRESSES.goerli);




console.log(web3.eth.accounts.create());
