import React, {Component} from "react";
import "./App.css";

function Square(props) {
	return (
		<button className={props.winner ? 'winner square' : 'square'} onClick={props.onClick}>
			{props.value}
		</button>
	);
}

class Board extends React.Component {
	renderSquare(row, col) {
		return (
			<Square
				value={this.props.squares[row][col]}
				//winner={(this.props.winners && this.props.winners.indexOf(i) !== -1)}
				onClick={() => this.props.onClick(row, col)}
			/>
		);
	}

	render() {
		return (
			<div>
				<div className="board-row">
					{this.renderSquare(0,0)}
					{this.renderSquare(0,1)}
					{this.renderSquare(0,2)}
				</div>
				<div className="board-row">
					{this.renderSquare(1,0)}
					{this.renderSquare(1,1)}
					{this.renderSquare(1,2)}
				</div>
				<div className="board-row">
					{this.renderSquare(2,0)}
					{this.renderSquare(2,1)}
					{this.renderSquare(2,2)}
				</div>
			</div>
		);
	}
}

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			history: [
				{
					squares: {
						0: Array(3).fill(null),
						1: Array(3).fill(null),
						2: Array(3).fill(null),
					}
				}
			],
			reverse: false,
			stepNumber: 0,
			xIsNext: true,
			selected: 0,
		};
	}

	handleClick(row, col) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = JSON.parse(JSON.stringify(current.squares));
		if (calculateWinner(squares) || squares[row][col]) {
			return;
		}
		squares[row][col] = this.state.xIsNext ? "X" : "O";
		this.setState({
			history: history.concat([
				{
					squares: squares
				}
			]),
			winners: [],
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext
		});
	}

	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) === 0
		});
	}

	handleReverse() {
		this.setState({
			reverse: !this.state.reverse
		});
	}

	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares);
		const state = this.state.stepNumber;
		const lastStep = this.state.history[this.state.history.length - 1];

		const moves = history.map((step, move) => {
			const desc = move ?
				'Go to move #' + move :
				'Go to game start';
			return (
				<li key={move}>
					<button className={state === move ? 'bold' : ''} onClick={() => this.jumpTo(move)}>{desc}</button>
				</li>
			);
		});

		let status;
		if (winner) {
			this.setState.winners = winner;
			status = "Winner: " + current.squares[winner[0]];
		} else {
			status = "Next player: " + (this.state.xIsNext ? "X" : "O");
			if (lastStep.squares.indexOf(null) === -1) {
				status = 'Result being a draw';
			}
		}

		if (this.state.reverse) {
			moves.reverse();
		}
		return (
			<div className="game">
				<div className="game-board">
					<Board
						squares={current.squares}
						winners={winner}
						onClick={(row, col) => this.handleClick(row, col)}
					/>
				</div>
				<div className="game-info">
					<div>{status}</div>
					<ol>{moves}</ol>
					<button onClick={() => this.handleReverse()}>Reverse</button>
				</div>
			</div>
		);
	}
}

function calculateWinner(squares) {
	let winners = [];
	for (let row in squares) {
		data = squares[row];
		if (data[0] === data[1] && data[0] === data[2]) {
			return [];
		}
	}

	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return [a, b, c];
		}
	}
	return null;
}

export default Game;