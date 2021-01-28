import Logger from "../utility/logger.js";
import {get_testnet_web3} from "../utility/testnet_uil.js";
import {dapp_token_contract_abi} from "./video_5_resources.js";

const logger = new Logger("video_8_web3_utilities.js");

const web3_testnet = get_testnet_web3(),
  hex = web3_testnet.utils.toHex,
  wei = web3_testnet.utils.toWei,
  contract_address = "0xe86A0DB73e64F4fEcEf973b69C575c61BAf8292b",
  contract_abi = dapp_token_contract_abi,
  get_contract = () => new web3_testnet.eth.Contract(contract_abi, contract_address);

async function get_gas_price() {
  const gas_price = await  web3_testnet.eth.getGasPrice();
  logger.debug("gas price: ", gas_price);
}

//await get_gas_price();

// random stuff
function hashingAndRandomStuff() {
  // hash stuff!
  const hash_my_name = web3_testnet.utils.sha3("arshan");
  logger.debug("hash of my name", hash_my_name);

  const hash_keccak256 = web3_testnet.utils.keccak256("arshan");
  logger.debug("hash of my name keccak256", hash_keccak256);

  const hash_solidity = web3_testnet.utils.soliditySha3("arshan");
  logger.debug("solididty my name", hash_solidity);
  // solidity does hashing a bit different, it gets used when you call functions: function call gets hashed using the
  // solidity hash...
  logger.debug("random hex", web3_testnet.utils.randomHex(2));
  logger.debug("random hex", web3_testnet.utils.randomHex(10));
  logger.debug("random hex", web3_testnet.utils.randomHex(32));
}

function underscore() {
  // the underscore library!!!!
  const _ = web3_testnet.utils._;
  _.each({
    key1: 'value1',
    key2: 'value2'
  }, (v, k) => {
    logger.debug("underscore", v, k);
  });
}



