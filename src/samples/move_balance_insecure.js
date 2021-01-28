import {ADDRESSES} from "../addresses.js";
import Web3 from "web3";

export async function moveBalanceInsecure(blockchain, account1, account2, amount) {
  const web3 = new Web3(blockchain);

  async function getBalances() {
    for (const account of [account1, account2]) {
      const balance = await web3.eth.getBalance(account);
      const balance_eth = web3.utils.fromWei(balance, "ether");
      console.log(`account: ${account} balance: ${balance_eth}`)
    }
  }

  async function sendFromTo(amount) {
    const result = await web3.eth.sendTransaction({
      from: account1,
      to: account2,
      value: web3.utils.toWei(amount.toString(), "ether")
    });
    console.log(`result: ${JSON.stringify(result, null, 2)}`)
  }

  await getBalances();
  try {
    await sendFromTo(amount);
  } catch (e) {
    console.log("Error sending funds: \n", e.toString());
  }

  await getBalances();
}