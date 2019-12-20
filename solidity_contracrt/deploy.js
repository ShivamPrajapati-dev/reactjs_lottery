const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider('tourist beach focus try west govern hope fame purpose ice pistol true',
'https://rinkeby.infura.io/v3/409e89a262eb4d5bb18ca780c8cfa5da');

const web3 = new Web3(provider);

const deploy = async () => {

   const accounts = await  web3.eth.getAccounts();

   console.log('deploying from account ',accounts[0]);

   const result = await new web3.eth.Contract(JSON.parse(interface))
   .deploy({data: bytecode})
   .send({gas: '1000000', from:accounts[0]});
   console.log(result);
   console.log(interface);
   console.log('deployed to ',result.options.address);

};

deploy();
