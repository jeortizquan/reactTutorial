import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*class Square extends React.Component {
  render() {
    return (
      <button
        className="square"
        onClick={()=> this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}*/

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
    {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={()=> this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}{this.renderSquare(1)}{this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}{this.renderSquare(4)}{this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}{this.renderSquare(7)}{this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map( (step, move) => {
      const desc = move ?
      'Go to move #' + move :
      'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

class Main extends React.Component {
    render() {
      return (
        <div className="main">
          <h1 style={{flexBasis: '100%', height: '0'}}>Tic Tac Toe met React</h1>
          <br />
          <Game />
          <ShoppingList name="metJSX" />
        </div>
      )
    }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>Winkelmandje Lijst met {this.props.name}</h1>
        <ul>
          <li>Groene</li>
          <li>Thee</li>
          <li>Extract</li>
        </ul>
      </div>
    );
  }
}

class ShoppingListR extends React.Component {
  render() {
    return (
      /*#__PURE__*/
  React.createElement(
    "div",
    {
      className: "shopping-list"
    },
    /*#__PURE__*/ React.createElement(
      "h1",
      null,
      "Shopping List for ",
      this.props.name
    ),
    /*#__PURE__*/ React.createElement(
      "ul",
      null,
      /*#__PURE__*/ React.createElement("li", null, "Instagram"),
      /*#__PURE__*/ React.createElement("li", null, "WhatsApp"),
      /*#__PURE__*/ React.createElement("li", null, "Oculus")
    )
  )
    );
  }
}

// ========================================

ReactDOM.render(
  <Main name="George"/>,
  document.getElementById('root')
);
