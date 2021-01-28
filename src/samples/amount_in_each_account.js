import {ADDRESSES} from "../addresses.js";
import Web3 from "web3";
import {ACCOUNTS} from "../utility/accounts.js";
import Time from "../utility/time.js";

const web3 = new Web3(ADDRESSES.goerli);

main();

async function getBalance(privateKey) {
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  const balance_wei = await web3.eth.getBalance(account.address);
  const balance = web3.utils.fromWei(balance_wei);
  console.log(`Account ${account.address} balance: ${balance}eth`);
}


async function main() {
  for (const account of ACCOUNTS) {
    await getBalance(account.privateKey);
  }
}
