const Web3 = require('web3');
//const web3 = new Web3("wss://eth-mainnet.ws.alchemyapi.io/ws/demo");
//const blockchain_url = "http://127.0.0.1:7545";
const goerli_url = "https://rpc.goerli.mudit.blog/";

const web3 = new Web3(goerli_url);

web3.eth.getBlockNumber().then(console.log); // -> 4099979

/*
{
  address: '0x3a000A3C5c7b344f20f590844b9cD3621ee40332',
  privateKey: '0x944795f604d4b85ba1db91a85019217edca3f26854d73b82b7fa24034433b064',
  signTransaction: [Function: signTransaction],
  sign: [Function: sign],
  encrypt: [Function: encrypt]
}
 */



mainGoerli().then()

async function mainGoerli() {
  const myKey = '0x944795f604d4b85ba1db91a85019217edca3f26854d73b82b7fa24034433b064';
  const myAccount = web3.eth.accounts.privateKeyToAccount(myKey);
  console.log("my account", myAccount);
  const balance = await web3.eth.getBalance(myAccount.address)
  const balance_eth = web3.utils.fromWei(balance );
  console.log("my balance: " + balance_eth)
}

function main() {

  let moneyAddress = "ee101d28cf526787f94aae5d44204a2b41ac951bc494355f035c8ab67238e8b6";
  let moneyAccount = web3.eth.accounts.privateKeyToAccount(moneyAddress);
}


//moneyAccount.signTransaction({
//
//})

function getBalanceForAccount(account)  {
  web3.eth.getBalance(address).then(b => {
    console.log("balance", b);
    let balance_eth = web3.utils.fromWei(b);
    console.log("balance in eth: " + balance_eth);
  });
}
