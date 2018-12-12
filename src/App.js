import React from 'react';
import Cell from "./Cell\\Cell"
import "./App.css"
import Board from "./Board"
class App extends React.Component {
  render() {
    return (
        <div className="App">
            <h1>Welcom! This game is Line</h1>
            <Board/>
        </div>
    );
  }
}

export default App;
