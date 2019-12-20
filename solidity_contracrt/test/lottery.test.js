const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require('../compile');

let accounts;
let lottery;

beforeEach( async() => {

accounts = await web3.eth.getAccounts();

lottery = await new web3.eth.Contract(JSON.parse(interface))
.deploy({ data:bytecode })
.send({ from:accounts[0], gas:'1000000'});

});


describe('Lottery contract', () => {

  it('deploy contract', () => {
    assert.ok(lottery.options.address);
  });

  it('add one account',async () => {

    await lottery.methods.enter().send({
      from:accounts[0],
      value:web3.utils.toWei('0.02','ether')
    });

    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    });

   assert.equal(accounts[0],players[0]);
   assert.equal(1,players.length);

  });

  it('minimum amount of money', async () => {

  try{
   await lottery.methods.enter().send({
     from: address[0],
     value:0
   });
   assert(false);
 }catch(err){
   assert(err);
 }
  });

  it('only manager can select winner', async () => {

    try{

      await lottery.methods.pickWinner().send({
        from: accounts[1]
      });
      assert(false);
    }catch(err){
      assert(err);
    }

  });

  it('verify that a player wins', async () => {

    await lottery.methods.enter().send({
      from:accounts[0],
      value:web3.utils.toWei('2','ether')
    });

    const initialBalance = await web3.eth.getBalance(accounts[0]);
    await lottery.methods.pickWinner().send({from:accounts[0]});
    const finalBalance = await web3.eth.getBalance(accounts[0]);
    const difference = finalBalance - initialBalance;

    assert(difference > web3.utils.toWei('1.8','ether'));

  });


});
