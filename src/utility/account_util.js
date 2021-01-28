import Logger from "./logger.js";

const logger = new Logger("account_util");

export async function check_balance(web3, account_address) {
  const balance = await web3.eth.getBalance(account_address);
  const balance_eth = web3.utils.fromWei(balance);
  logger.debug(`account: ${account_address}, balance: ${balance_eth}eth`);
  return balance_eth
}


