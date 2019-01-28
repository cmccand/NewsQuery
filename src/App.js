import React, { Component } from 'react';
import './App.css';
import MainPage from './components/MainPage';
import history from './history';

class App extends Component {
  componentDidMount() {
    history.listen(() => this.forceUpdate());
  }

  render() {
    return (
      <div>
        <MainPage />
      </div>
    );
  }
}

export default App;
