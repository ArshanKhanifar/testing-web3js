import Logger from "../utility/logger.js";
import Web3 from "web3";
import {ADDRESSES} from "../addresses.js";
import {ACCOUNTS} from "../utility/accounts.js";
import {Transaction} from "@ethereumjs/tx";
import Common from "@ethereumjs/common";
import {get_testnet_web3, print_balances} from "../utility/testnet_uil.js";

const logger = new Logger("video_4_deploying_smart_contracts.js");

const web3_testnet = get_testnet_web3();
const contract = "0x608060405234801561001057600080fd5b506040805190810160405280600c81526020017f48656c6c6f20576f726c642100000000000000000000000000000000000000008152506000908051906020019061005c929190610062565b50610107565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100a357805160ff19168380011785556100d1565b828001600101855582156100d1579182015b828111156100d05782518255916020019190600101906100b5565b5b5090506100de91906100e2565b5090565b61010491905b808211156101005760008160009055506001016100e8565b5090565b90565b6102f7806101166000396000f30060806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806350d8531514610051578063b07d7e39146100e1575b600080fd5b34801561005d57600080fd5b50610066610162565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100a657808201518184015260208101905061008b565b50505050905090810190601f1680156100d35780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156100ed57600080fd5b50610148600480360381019080803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290505050610204565b604051808215151515815260200191505060405180910390f35b606060008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156101fa5780601f106101cf576101008083540402835291602001916101fa565b820191906000526020600020905b8154815290600101906020018083116101dd57829003601f168201915b5050505050905090565b6000816000908051906020019061021c929190610226565b5060019050919050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061026757805160ff1916838001178555610295565b82800160010185558215610295579182015b82811115610294578251825591602001919060010190610279565b5b5090506102a291906102a6565b5090565b6102c891905b808211156102c45760008160009055506001016102ac565b5090565b905600a165627a7a72305820918b14c5cd361389e246ac32f8b90ac460814c77f12d5b169a656f38d47da95e0029";

async function deploy_contract(account1, contract) {
  const tx_count = await web3_testnet.eth.getTransactionCount(account1.address);
  // Smart Contract Data:
  logger.debug("account 1 tx count is: ", tx_count);
  // build the transaction
  const hex = web3_testnet.utils.toHex,
    wei = web3_testnet.utils.toWei;

  const tx_object = {
    nonce: hex(tx_count),
    gasLimit: hex(1e6), // this increased
    gasPrice: hex(wei('10', 'gwei')),
    data: contract
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
    logger.info("tx hash before completion: ", tx_hash);
  });
  logger.info("tx hash after completion:", tx_hash);
}

async function deploy_contract_from_account_one() {
  const accounts = ACCOUNTS.map(a => a.address);
  await print_balances(web3_testnet, accounts);
  logger.info("deploying contract");
  await deploy_contract(ACCOUNTS[0], contract);
  await print_balances(web3_testnet, accounts);
}

const contract_interface = [{"constant":true,"inputs":[],"name":"speak","outputs":[{"name":"itSays","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newSaying","type":"string"}],"name":"saySomethingElse","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

const helloworld_contract = new web3_testnet.eth.Contract(contract_interface);

async function remix_deploy() {
  var helloworld = helloworld_contract
    .deploy()
    .send({
     from: ACCOUNTS[0].address,
     gas: '4700000'
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
      console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
  })
}

async function docs_deploy() {
  helloworld_contract.deploy()
    .send({
      from: ACCOUNTS[0].address,
      gas: 1500000,
      //gasPrice: '30000000000000'
    }, function(error, transactionHash){
      logger.info("tx hash: ", transactionHash)
    })
    .on('error', function(error){
      logger.error("there was an error here: ", error)
    })
    .on('transactionHash', function(transactionHash){
      logger.info("tx hash 2: ", transactionHash)
    })
    .on('receipt', function(receipt){
      logger.info("receipt: ", receipt);
    })
    .on('confirmation', function(confirmationNumber, receipt){
      logger.info("confirmation: ", confirmationNumber, receipt);
    })
    .then(function(newContractInstance){
      logger.info("new contract address: ", newContractInstance.options.address);
    });
}

async function interact_with_contract() {
  const contract_abi = [
    {
      "constant": true,
      "inputs": [],
      "name": "speak",
      "outputs": [
        {
          "name": "itSays",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "newSaying",
          "type": "string"
        }
      ],
      "name": "saySomethingElse",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    }
  ];
  const contract_address = "0xF006d0AF0e29b6510347bd9782dB2D66Af337b4F";
  const contract = new web3_testnet.eth.Contract(contract_abi, contract_address);
  logger.info("calling speak");
  await call_method_with_args("speak");
  const what_says = "Arshan made me!";
  logger.info(`changing what it says: ${what_says}`);
  await call_method_with_args("saySomethingElse", what_says);
  logger.info("calling speak");
  await call_method_with_args("speak");

  async function call_method_with_args(method, ...args) {
    const contract_method = eval(`contract.methods.${method}`);
    const returned = await contract_method(...args).call() ;
    try {
      logger.info(`contract result: ${returned}`);
    } catch (e) {
      logger.error(`contract had error: ${e}`);
    }
  }
}

//await remix_deploy();

//await deploy_contract_from_account_one();

await interact_with_contract();


