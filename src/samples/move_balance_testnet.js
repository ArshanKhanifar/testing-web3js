import {ADDRESSES} from "../addresses.js";
import {moveBalanceInsecure} from "./move_balance_insecure.js";
import {ACCOUNTS} from "../utility/accounts.js";
import {getWeb3} from "./web3_util.js";
const account1 = ACCOUNTS[0].address;
const account2 = ACCOUNTS[1].address;

const web3 = getWeb3();

await main();

async function main() {
  const account = ACCOUNTS[0];
  const result = await web3.eth.personal.unlockAccount(account.address, account.privateKey, 4, (err) => {
    console.log("error?", err);
  });
  console.log(`unlocking result\n${result}`);
  moveBalanceInsecure(ADDRESSES.goerli, account1, account2, 0.1);
}



