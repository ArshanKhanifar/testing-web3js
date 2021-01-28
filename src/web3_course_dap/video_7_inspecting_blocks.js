import Logger from "../utility/logger.js";
import {get_testnet_web3} from "../utility/testnet_uil.js";
import {dapp_token_contract_abi} from "./video_5_resources.js";

const logger = new Logger("video_6_smart_contract_events.js");

const web3_testnet = get_testnet_web3(),
  hex = web3_testnet.utils.toHex,
  wei = web3_testnet.utils.toWei,
  contract_address = "0xe86A0DB73e64F4fEcEf973b69C575c61BAf8292b",
  contract_abi = dapp_token_contract_abi,
  get_contract = () => new web3_testnet.eth.Contract(contract_abi, contract_address);

const latest_block_number = await web3_testnet.eth.getBlockNumber();
logger.debug("block", latest_block_number);

const block = await web3_testnet.eth.getBlock("latest");
//logger.debug("block", block);
logger.debug("hash", block.hash);
logger.debug("number", block.number);

async function show_last_10() {
  for (let i = 0; i < 10; i++) {
    const block = await web3_testnet.eth.getBlock(latest_block_number - i);
    console.log(`block: ${block.number} - ${block.hash}`);
  }
}

const transaction = await web3_testnet.eth.getTransactionFromBlock(latest_block_number, 2);
logger.debug("transaction", transaction);

