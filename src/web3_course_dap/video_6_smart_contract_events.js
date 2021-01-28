import Logger from "../utility/logger.js";
import {ACCOUNTS} from "../utility/accounts.js";
import {Transaction} from "@ethereumjs/tx";
import Common from "@ethereumjs/common";
import {get_testnet_web3, print_balances} from "../utility/testnet_uil.js";
import {dapp_token_contract_abi} from "./video_5_resources.js";

const logger = new Logger("video_6_smart_contract_events.js");

const web3_testnet = get_testnet_web3(),
  hex = web3_testnet.utils.toHex,
  wei = web3_testnet.utils.toWei,
  contract_address = "0xe86A0DB73e64F4fEcEf973b69C575c61BAf8292b",
  contract_abi = dapp_token_contract_abi,
  get_contract = () => new web3_testnet.eth.Contract(contract_abi, contract_address);


async function get_past_events() {
  const contract = get_contract();
  const events = await contract.getPastEvents('AllEvents', {
    fromBlock: 4184276,
    toBlock: 'latest'
  });
  logger.info("events", events);
}


async function interact_with_contract() {
  const contract = get_contract();
  const [account1, account2] = ACCOUNTS.map(a => a.address);
  await get_balance_of(account1);
  await get_balance_of(account2);
  logger.info("transferring from 1 to 2");
  await contract_transfer(ACCOUNTS[0], account2);
  logger.info("transferring from 1 to 2");
  await get_balance_of(account1);
  await get_balance_of(account2);

  async function get_balance_of(owner) {
    const balance = await call_method_with_args("balanceOf", owner);
    logger.info(`balance of: ${owner} - ${balance}`);
  }
  async function call_method_with_args(method, ...args) {
    const contract_method = eval(`contract.methods.${method}`);
    try {
      const returned = await contract_method(...args).call() ;
      logger.debug(`contract result: ${returned}`);
      return returned;
    } catch (e) {
      logger.error(`contract had error: ${e}`);
    }
  }
}

await get_past_events();
