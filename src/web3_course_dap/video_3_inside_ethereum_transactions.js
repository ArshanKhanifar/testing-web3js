import Logger from "../utility/logger.js";
import Web3 from "web3";
import {ADDRESSES} from "../addresses.js";
import {ACCOUNTS} from "../utility/accounts.js";
import {Transaction} from "@ethereumjs/tx";
import Common from "@ethereumjs/common";

const logger = new Logger("video_3_inside_ethereum_transactions.js");

const web3_ganache = new Web3(ADDRESSES.ganache);
const web3_testnet = new Web3(ADDRESSES.goerli);

const get_balance = async (web3, account) => await web3.eth.getBalance(account);

async function print_balances_ganache() {
  const account1 = "0x8b782e260a0A8eA4C7F9Ca374D78016ea40C976b";
  const account2 = "0xE6a5750eb823bEc8B079Aba0b7bC849D4244C53A";
  return print_balances(web3_ganache, [account1, account2]);
}

async function print_balances(web3, accounts) {
  for (const acc of accounts) {
    const balance = await get_balance(web3, acc);
    const balance_eth = web3.utils.fromWei(balance, 'ether');
    logger.debug(`account: ${acc} - balance (eth): ${balance_eth}`);
  }
}

async function unlocked_example() {
  logger.debug("Balances before");
  await print_balances(web3_ganache);
  logger.debug("sending transaction");
  await web3_ganache.eth.sendTransaction({ // turns out this await matters!
    from: account1,
    to: account2,
    value: web3_ganache.utils.toWei('1', 'ether')
  });
  logger.debug("Balances after");
  await print_balances(web3_ganache);
}

async function unlock_with_geth() {
  // there's a way to unlock your account
  web3_ganache.eth.personal.unlockAccount(account1);
}

async function transfer(account1, account2, money) {
  const tx_count = await web3_testnet.eth.getTransactionCount(account1.address);
  logger.debug("account 1 tx count is: ", tx_count);
  // build the transaction
  logger.debug(account1, account2, money);
  const hex = web3_testnet.utils.toHex,
    wei = web3_testnet.utils.toWei;
  const tx_object = {
    nonce: hex(tx_count),
    to: account2.address,
    value: hex(wei(`${money}`, 'ether')),
    gasLimit: hex(21000),
    gasPrice: hex(wei('10', 'gwei'))
  };
  // sign the transaction

  const private_key = Buffer.from(account1.privateKey.substr(2), 'hex');
  const common = new Common.default({ chain: 'goerli'});
  const tx = Transaction.fromTxData(tx_object, { common });
  const signed_tx = tx.sign(private_key);
  const serialized_tx = signed_tx.serialize();
  const raw = '0x' + serialized_tx.toString('hex');

  // broadcast the transaction
  const tx_hash = await web3_testnet.eth.sendSignedTransaction(raw, (err, tx_hash) => {
    logger.info("tx hash inside callback", tx_hash);
  });
  logger.info("tx hash outside callback", tx_hash);
}

async function transfer_with_security() {
  const accounts = ACCOUNTS.map(a => a.address);
  await print_balances(web3_testnet, accounts);
  logger.info("transferring from account 1 to 2");
  await transfer(...ACCOUNTS, 0.5);
  await print_balances(web3_testnet, accounts);
}

await transfer_with_security();


