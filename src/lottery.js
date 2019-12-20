import web3 from './web3';

const address = 'DEPLOYED_CONTRACT_ADDRESS';

const abi = 'YOUR_ABI_OF_DEPLOYED_CONYRACT'

export default new web3.eth.Contract(abi, address);
