import React, { useState, useEffect, useRef, FC } from 'react';
import Image from 'next/image';
import blackBishop from 'public/images/black_bishop.png';
import whiteBishop from 'public/images/white_bishop.png';
import blackKing from 'public/images/black_king.png';
import whiteKing from 'public/images/white_king.png';
import blackKnight from 'public/images/black_knight.png';
import whiteKnight from 'public/images/white_knight.png';
import blackPawn from 'public/images/black_pawn.png';
import whitePawn from 'public/images/white_pawn.png';
import blackQueen from 'public/images/black_queen.png';
import whiteQueen from 'public/images/white_queen.png';
import blackRook from 'public/images/black_rook.png';
import whiteRook from 'public/images/white_rook.png';

import logo from 'public/images/black_king.png';

enum Colors {
	white = 'white',
	black = 'black',
}

class Board {
	cells: Cell[][] = [];

	public initCells() {
		for (let i = 0; i < 8; i++) {
			const row: Cell[] = [];

			for (let j = 0; j < 8; j++) {
				if ((i + j) % 2 !== 0) {
					row.push(new Cell(j, i, Colors.black, null, this));
				} else {
					row.push(new Cell(j, i, Colors.white, null, this));
				}
			}

			this.cells.push(row);
		}
	}

	public getCopyBoard(): Board {
		const newBoard = new Board();
		newBoard.cells = this.cells;
		return newBoard;
	}

	public highlightCells(selectedSell: Cell | null) {
		for (let i = 0; i < this.cells.length; i++) {
			const row = this.cells[i];
			for (let j = 0; j < row.length; j++) {
				const target = row[j];
				target.available = !!selectedSell?.figure?.canMove(target);
			}
		}
	}

	public getCell(x: number, y: number) {
		return this.cells[y][x];
	}

	private addPawns() {
		for (let i = 0; i < 8; i++) {
			new Pawn(Colors.black, this.getCell(i, 1));
			new Pawn(Colors.white, this.getCell(i, 6));
		}
	}

	private addKings() {
		new King(Colors.black, this.getCell(4, 0));
		new King(Colors.white, this.getCell(4, 7));
	}

	private addQueens() {
		new Queen(Colors.black, this.getCell(3, 0));
		new Queen(Colors.white, this.getCell(3, 7));
	}

	private addKningts() {
		new Knight(Colors.black, this.getCell(1, 0));
		new Knight(Colors.black, this.getCell(6, 0));
		new Knight(Colors.white, this.getCell(1, 7));
		new Knight(Colors.white, this.getCell(6, 7));
	}

	private addBishops() {
		new Bishop(Colors.black, this.getCell(2, 0));
		new Bishop(Colors.black, this.getCell(5, 0));
		new Bishop(Colors.white, this.getCell(2, 7));
		new Bishop(Colors.white, this.getCell(5, 7));
	}

	private addRooks() {
		new Rook(Colors.black, this.getCell(0, 0));
		new Rook(Colors.black, this.getCell(7, 0));
		new Rook(Colors.white, this.getCell(0, 7));
		new Rook(Colors.white, this.getCell(7, 7));
	}

	public addFigures() {
		this.addPawns();
		this.addKings();
		this.addQueens();
		this.addKningts();
		this.addBishops();
		this.addRooks();
	}
}

class Cell {
	readonly x: number;
	readonly y: number;
	readonly color: Colors;
	figure: Figure | null;
	board: Board;
	available: boolean;
	id: number;

	constructor(
		x: number,
		y: number,
		color: Colors,
		figure: Figure | null,
		board: Board
	) {
		this.x = x;
		this.y = y;
		this.color = color;
		this.figure = figure;
		this.board = board;
		this.available = false;
		this.id = Math.random();
	}

	isEmpty(): boolean {
		return this.figure === null;
	}

	isEnemy(target: Cell): boolean {
		if (target.figure) {
			return this.figure?.color !== target.figure.color;
		}

		return false;
	}

	isEmptyVertical(target: Cell): boolean {
		if (this.x !== target.x) {
			return false;
		}

		const min = Math.min(this.y, target.y);
		const max = Math.max(this.y, target.y);

		for (let y = min + 1; y < max; y++) {
			if (!this.board.getCell(this.x, y).isEmpty()) {
				return false;
			}
		}

		return true;
	}

	isEmptyHorizontal(target: Cell): boolean {
		if (this.y !== target.y) {
			return false;
		}

		const min = Math.min(this.x, target.x);
		const max = Math.max(this.x, target.x);

		for (let x = min + 1; x < max; x++) {
			if (!this.board.getCell(this.y, x).isEmpty()) {
				return false;
			}
		}

		return true;
	}

	isEmptyDiagonal(target: Cell): boolean {
		const absX = Math.abs(target.x - this.x);
		const absY = Math.abs(target.y - this.y);

		if (absX !== absY) return false;

		const dx = this.x < target.x ? 1 : -1;
		const dy = this.y < target.y ? 1 : -1;

		for (let i = 1; i < absY; i++) {
			if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty()) {
				return false;
			}
		}
		return true;
	}

	setFigure(figure: Figure) {
		this.figure = figure;
		this.figure.cell = this;
	}

	moveFigure(target: Cell) {
		if (this.figure && this.figure?.canMove(target)) {
			this.figure.moveFigure(target);

			target.setFigure(this.figure);
			this.figure = null;
		}
	}
}

enum FigureNames {
	figure = 'Фигура',
	king = 'Король',
	knight = 'Конь',
	pawn = 'Пешка',
	queen = 'Ферзь',
	rook = 'Ладья',
	bishop = 'Слон',
}

class Figure {
	color: Colors;
	logo: typeof logo | null;
	cell: Cell;
	name: FigureNames;
	id: number;

	constructor(color: Colors, cell: Cell) {
		this.color = color;
		this.cell = cell;
		this.cell.figure = this;
		this.logo = null;
		this.name = FigureNames.figure;
		this.id = Math.random();
	}

	canMove(target: Cell): boolean {
		if (target.figure?.color === this.color) return false;
		if (target.figure?.name === FigureNames.king) return false;
		return true;
	}

	moveFigure(target: Cell) {}
}

class King extends Figure {
	constructor(color: Colors, cell: Cell) {
		super(color, cell);
		this.logo = color === Colors.black ? blackKing : whiteKing;
		this.name = FigureNames.king;
	}

	canMove(target: Cell): boolean {
		if (!super.canMove(target)) return false;
		return false;
	}
}

class Knight extends Figure {
	constructor(color: Colors, cell: Cell) {
		super(color, cell);
		this.logo = color === Colors.black ? blackKnight : whiteKnight;
		this.name = FigureNames.knight;
	}

	canMove(target: Cell): boolean {
		if (!super.canMove(target)) return false;
		const dx = Math.abs(this.cell.x - target.x);
		const dy = Math.abs(this.cell.y - target.y);

		return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
	}
}

class Pawn extends Figure {
	isFirstStep: boolean = true;

	constructor(color: Colors, cell: Cell) {
		super(color, cell);
		this.logo = color === Colors.black ? blackPawn : whitePawn;
		this.name = FigureNames.pawn;
	}

	canMove(target: Cell): boolean {
		if (!super.canMove(target)) return false;

		const direction = this.cell.figure?.color === Colors.black ? 1 : -1;
		const firstStepDirection =
			this.cell.figure?.color === Colors.black ? 2 : -2;

		if (
			(target.y === this.cell.y + direction ||
				(this.isFirstStep && target.y === this.cell.y + firstStepDirection)) &&
			target.x === this.cell.x &&
			this.cell.board.getCell(target.x, target.y).isEmpty()
		) {
			return true;
		}

		if (
			target.y === this.cell.y + direction &&
			(target.x === this.cell.x + 1 || target.x === this.cell.x - 1) &&
			this.cell.isEnemy(target)
		) {
			return true;
		}

		return false;
	}

	moveFigure(target: Cell) {
		super.moveFigure(target);
		this.isFirstStep = false;
	}
}

class Queen extends Figure {
	constructor(color: Colors, cell: Cell) {
		super(color, cell);
		this.logo = color === Colors.black ? blackQueen : whiteQueen;
		this.name = FigureNames.queen;
	}

	canMove(target: Cell): boolean {
		if (!super.canMove(target)) return false;
		if (this.cell.isEmptyVertical(target)) return true;
		if (this.cell.isEmptyHorizontal(target)) return true;
		if (this.cell.isEmptyDiagonal(target)) return true;
		return false;
	}
}

class Rook extends Figure {
	constructor(color: Colors, cell: Cell) {
		super(color, cell);
		this.logo = color === Colors.black ? blackRook : whiteRook;
		this.name = FigureNames.rook;
	}

	canMove(target: Cell): boolean {
		if (!super.canMove(target)) return false;
		if (this.cell.isEmptyVertical(target)) return true;
		if (this.cell.isEmptyHorizontal(target)) return true;
		return false;
	}
}

class Bishop extends Figure {
	constructor(color: Colors, cell: Cell) {
		super(color, cell);
		this.logo = color === Colors.black ? blackBishop : whiteBishop;
		this.name = FigureNames.bishop;
	}

	canMove(target: Cell): boolean {
		if (!super.canMove(target)) return false;
		if (this.cell.isEmptyDiagonal(target)) return true;
		return false;
	}
}

class Player {
	color: Colors;

	constructor(color: Colors) {
		this.color = color;
	}
}

interface BoardProps {
	board: Board;
	setBoard: (board: Board) => void;
	currentPlayer: Player | null;
	swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({
	board,
	setBoard,
	currentPlayer,
	swapPlayer,
}) => {
	const [selectedSell, setSelectedSell] = useState<Cell | null>(null);
	const click = (cell) => {
		if (
			selectedSell &&
			selectedSell !== cell &&
			selectedSell.figure?.canMove(cell)
		) {
			selectedSell.moveFigure(cell);
			swapPlayer();
			setSelectedSell(null);
			updateBoard();
		} else {
			if (cell.figure?.color === currentPlayer.color) {
				setSelectedSell(cell);
			}
		}
	};

	useEffect(() => {
		highlightCells();
	}, [selectedSell]);

	const highlightCells = () => {
		board.highlightCells(selectedSell);
		updateBoard();
	};

	const updateBoard = () => {
		const newBoard = board.getCopyBoard();
		setBoard(newBoard);
	};

	return (
		<div className="board">
			{board.cells.map((row, index) => (
				<React.Fragment key={index}>
					{row.map((cell) => (
						<CellComponent
							click={click}
							cell={cell}
							key={cell.id}
							selected={
								cell.x === selectedSell?.x && cell.y === selectedSell?.y
							}
						/>
					))}
				</React.Fragment>
			))}
		</div>
	);
};

interface CellProps {
	cell: Cell;
	selected: boolean;
	click: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({ cell, selected, click }) => {
	return (
		<div
			className={['cell', cell.color, selected ? 'selected' : ''].join(' ')}
			onClick={() => click(cell)}
		>
			{cell.available && !cell.figure && <div className={'available'} />}
			{cell.available && cell.figure && <div className={'target'} />}
			{cell.figure?.logo && <Image src={cell.figure.logo} alt="" />}
		</div>
	);
};

const Chess = () => {
	const [board, setBoard] = useState(new Board());
	const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.white));
	const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.black));
	const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

	const restart = () => {
		const newBoard = new Board();
		newBoard.initCells();
		newBoard.addFigures();
		setBoard(newBoard);
	};

	const swapPlayer = () => {
		setCurrentPlayer(
			currentPlayer?.color === Colors.white ? blackPlayer : whitePlayer
		);
	};

	useEffect(() => {
		restart();
		setCurrentPlayer(whitePlayer);
	}, []);

	// Timer

	const [blackTime, setBlackTime] = useState(600);
	const [whiteTime, setWhiteTime] = useState(600);

	const timer = useRef<null | ReturnType<typeof setInterval>>(null);

	useEffect(() => {
		startTimer();
	}, [currentPlayer]);

	const startTimer = () => {
		if (timer.current) {
			clearInterval(timer.current);
		}

		const callback =
			currentPlayer?.color === Colors.white
				? decrementWhiteTimer
				: decrementBlackTimer;
		timer.current = setInterval(callback, 1000);
	};

	const decrementBlackTimer = () => {
		setBlackTime((prev) => prev - 1);
	};

	const decrementWhiteTimer = () => {
		setWhiteTime((prev) => prev - 1);
	};

	return (
		<div className="chess">

            <div className="first_player">
                <h1 className={currentPlayer?.color == "black" ? "active time" : "time"}>
                    {('0' + Math.floor((blackTime) / 60)).slice(1)}:{('0' + Math.floor((blackTime) % 60)).slice(-2)}
                </h1>
            </div>

			<BoardComponent
				board={board}
				setBoard={setBoard}
				currentPlayer={currentPlayer}
				swapPlayer={swapPlayer}
			/>

			<div className="second_player">
				<h1 className={currentPlayer?.color == "white" ? "active time" : "time"}>
					{('0' + Math.floor((whiteTime) / 60)).slice(1)}:{('0' + Math.floor((whiteTime) % 60)).slice(-2)}
				</h1>
			</div>	
				
		</div>
	);
};

export default Chess;
