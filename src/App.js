import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header'
import Trades from './Components/trades';
import { search } from './utils'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      trades: null,
      t1: "",
      t2: "",
      t1_a: "",
      t2_a: "",
      date: "",
      loading: false
    }
  }

  search = async () => {
    this.setState({ loading: true });
    const res = await search(`http://localhost:8000/api/trades/specific/?t1=${this.state.t1}&t2=${this.state.t1_a}&t1_a=${this.state.t2}&t2_a=${this.state.t2_a}&date=${this.state.date}`);
    const trades = res;
    this.setState({ trades, loading: false })
  };

  // only filters the list when 'Enter' is pressed in any box, removes most typing lag that was there when search was being called live
  hanldeKeyPress = async e => {
    if (e.charCode === 13) {
      const { name, value } = e.target
      this.setState({
        [name]: value
      }, function () {
        this.search();
      })
    }
  }

  componentDidMount() {
    this.search()
  }

  get renderTrades() {
    let trades;
    if (this.state.trades) {
      trades = <Trades trades={this.state.trades} />
    }
    return trades;
  }

  render() {
    return (
      <div>
        <Header title="NHL Trade Tracker" />
        <div class="mx-auto">

          <table class="table table-striped table-bordered table-hover">
            <thead class="thead-dark">
              <tr class="text-center">
                <th scope="col" >Team 1</th>
                <th scope="col">Team1 Assets Acquired</th>
                <th scope="col">Team 2</th>
                <th scope="col">Team 2 Assets Acquired</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-center">
                <th><input type="text" name="t1" onKeyPress={e => this.hanldeKeyPress(e)} /></th>
                <th><input type="text" name="t2" onKeyPress={e => this.hanldeKeyPress(e)} /></th>
                <th><input type="text" name="t1_a" onKeyPress={e => this.hanldeKeyPress(e)} /></th>
                <th><input type="text" name="t2_a" onKeyPress={e => this.hanldeKeyPress(e)} /></th>
                <th><input type="text" name="date" onKeyPress={e => this.hanldeKeyPress(e)} /></th>
              </tr>
              {this.renderTrades}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
