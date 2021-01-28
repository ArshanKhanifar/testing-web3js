// following this: https://www.youtube.com/watch?v=tu92jcqdn6s
// contract details on etherscan: https://goerli.etherscan.io/address/0x087D6273310CD4c12F914E25392Cec3fe90fb687

import {ADDRESSES} from "../addresses.js";
import Web3 from "web3";
import {ACCOUNTS} from "../utility/accounts.js";


const web3 = new Web3(ADDRESSES.goerli);
const contract_abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"address","name":"heir","type":"address"}],"name":"depositClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"nDays","type":"uint256"},{"indexed":false,"internalType":"address","name":"heir","type":"address"}],"name":"depositMade","type":"event"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_days","type":"uint256"},{"internalType":"address payable","name":"_heir","type":"address"}],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"status","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address payable","name":"_withdraw","type":"address"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const contract_address = "0x087D6273310CD4c12F914E25392Cec3fe90fb687";

const contract = new web3.eth.Contract(contract_abi, contract_address);

const accountHolderAddress = '0x17ba4e8131edc880ad6a32fc384d02bd9f6ddec4';

//await check_balance_of(accountHolderAddress);
check_balance_of(accountHolderAddress);

async function check_balance_of(address) {
  console.log(`checking balance of: ${address}`);
  const status = await contract.methods.status(address).call();
  const balance = status[0];
  const balance_eth = web3.utils.fromWei(balance);
  console.log("balance eth: ", balance_eth);
}

async function depositIntoContract(balance) {
  const amount_wei = web3.utils.toWei(balance.toString(), "ether");
  console.log(contract.methods);
  const [num_days, my_addr] = [12, ACCOUNTS[0].address];
  await check_my_balance();
  contract.methods.deposit(num_days, my_addr).call((err, result) => {
    console.log("err", err);
    console.log("result", result);
  });
  await check_my_balance();
}

async function check_my_balance() {
  const balance = await web3.eth.getBalance(ACCOUNTS[0].address);
  const balance_eth = web3.utils.fromWei(balance);
  console.log("my balance: ", balance_eth);
}

