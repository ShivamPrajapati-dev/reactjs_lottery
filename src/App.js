import React from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';
import EnterAmount from './enter_amount';
import ProceedToEnter from './proceed_to_enter';
import PickWinner from './pick_winner';
import 'bootstrap/dist/css/bootstrap.min.css';




 class App extends React.Component {

 constructor(props) {
   super(props);
   this.state = {
     manager:'',
     numberOfPlayers :[],
     balance:'',
     value:'',
     winner:''
   };
 }

 async componentDidMount() {
   console.log(lottery);
   const manager = await lottery.methods.manager().call();
   const numberOfPlayers = await lottery.methods.getPlayers().call();
   const balance = await web3.eth.getBalance(lottery.options.address);
   this.setState({manager,numberOfPlayers,balance});
 }
 value(amount){
   this.setState({value:amount});
   console.log(this.state.value);
 }

 onSubmit =async (event) =>{
   event.preventDefault();
  const accounts = await web3.eth.getAccounts();

  lottery.methods.enter().send({
    from:accounts[0],
    value:web3.utils.toWei(this.state.value,'ether')
  });
  const player = await lottery.methods.getPlayers().call();
  console.log(player[0]);
  this.componentDidMount();
}

selectWinner = async () => {
  const accounts = await web3.eth.getAccounts();
  await lottery.methods.pickWinner().send({from:accounts[0]});

  const winner = await lottery.methods.winner().call();
  this.setState({winner:winner});

}

render() {
  return (
    <div className="App">
      <h2>Lottery Contract</h2>
      <p>The manager of the contract is {this.state.manager}</p>
      <p>There are currently {this.state.numberOfPlayers[0]} players entered to win {web3.utils.fromWei(this.state.balance,'ether')} ether</p>
      <br />
      <h2>Want to try your luck? </h2>
      <p>Amount to enter </p>
      <EnterAmount value = {(amount) => {this.value(amount)}}/>
      <br />
      <ProceedToEnter onSubmit = {event=>this.onSubmit(event)}/>
      <br />
      <p>Time to pick a winner</p>
      <PickWinner selectWinner = {()=>{this.selectWinner()}}/>
      <br />
      <p>{this.state.winner}</p>
    </div>
  );
}
}

export default App;
