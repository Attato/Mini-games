import React, { useState, useEffect, FC } from 'react'
import Image from 'next/image'
import blackBishop from 'public/images/black_bishop.png'
import whiteBishop from 'public/images/white_bishop.png'
import blackKing from 'public/images/black_king.png'
import whiteKing from 'public/images/white_king.png'
import blackKnight from 'public/images/black_knight.png'
import whiteKnight from 'public/images/white_knight.png'
import blackPawn from 'public/images/black_pawn.png'
import whitePawn from 'public/images/white_pawn.png'
import blackQueen from 'public/images/black_queen.png'
import whiteQueen from 'public/images/white_queen.png'
import blackRook from 'public/images/black_rook.png'
import whiteRook from 'public/images/white_rook.png'

import logo from 'public/images/black_king.png'

enum Colors {
    white = "white",
    black = "black"
}

class Board { 
    cells: Cell[][] = []

    public initCells() {

        for (let i = 0; i < 8; i++) {

            const row: Cell[] = []

            for (let j = 0; j < 8; j++) {
                
                if ((i + j) % 2 !== 0) {
                    row.push(new Cell(j, i, Colors.black, null, this))       
                } else {
                    row.push(new Cell(j, i, Colors.white, null, this))
                }
            }

            this.cells.push(row);
        }
    }

    public getCell(x: number, y: number) {
        return this.cells[y][x]
    }

    private addPawns () {
        for (let i = 0; i < 8; i++) {
            new Pawn(Colors.black, this.getCell(i, 1))
            new Pawn(Colors.white, this.getCell(i, 6))
        }
    }
 
    private addKings () {   
        new King(Colors.black, this.getCell(4, 0))
        new King(Colors.white, this.getCell(4, 7))
    }
    
    private addQueens () {
        new Queen(Colors.black, this.getCell(3, 0))
        new Queen(Colors.white, this.getCell(3, 7))
    }

    private addKningts () {
        new Knight(Colors.black, this.getCell(1, 0))
        new Knight(Colors.black, this.getCell(6, 0))
        new Knight(Colors.white, this.getCell(1, 7))
        new Knight(Colors.white, this.getCell(6, 7))
    }

    private addBishops () {
        new Bishop(Colors.black, this.getCell(2, 0))
        new Bishop(Colors.black, this.getCell(5, 0))
        new Bishop(Colors.white, this.getCell(2, 7))
        new Bishop(Colors.white, this.getCell(5, 7))
    }

    private addRooks () {
        new Rook(Colors.black, this.getCell(0, 0))
        new Rook(Colors.black, this.getCell(7, 0))
        new Rook(Colors.white, this.getCell(0, 7))
        new Rook(Colors.white, this.getCell(7, 7))
    }


    public addFigures() {
        this.addPawns()
        this.addKings()
        this.addQueens()
        this.addKningts()
        this.addBishops()
        this.addRooks()
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

    constructor(x: number, y: number, color: Colors, figure: Figure | null, board: Board) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.board = board;
        this.available = false;
        this.id = Math.random()
    }
}

enum FigureNames {
    figure = "Фигура",
    king = "Король",
    knight = "Конь",
    pawn = "Пешка",
    queen = "Ферзь",
    rook = "Ладья",
    bishop = "Слон"
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
        this.id = Math.random()
    }

    canMove(target: Cell): boolean {
        return true;
    }

    moveFigure(target: Cell) {

    }
}

class King extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.black ? blackKing : whiteKing;
        this.name = FigureNames.king;
    }
}

class Knight extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.black ? blackKnight : whiteKnight;
        this.name = FigureNames.knight;
    }    
}

class Pawn extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.black ? blackPawn : whitePawn;
        this.name = FigureNames.pawn;
    }    
}

class Queen extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.black ? blackQueen : whiteQueen;
        this.name = FigureNames.queen;
    }    
}

class Rook extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.black ? blackRook : whiteRook;
        this.name = FigureNames.rook;
    }    
}

class Bishop extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.black ? blackBishop : whiteBishop;
        this.name = FigureNames.bishop;
    }
}

interface BoardProps { 
    board: Board;
    setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard}) => {

    return (
        <div className="board">
            {board.cells.map((row, index) => 
                <React.Fragment key={index}>
                    {
                        row.map(cell => <CellComponent cell={cell} key={cell.id}/>)
                    }
                </React.Fragment>
            )}
        </div>
    );
} 

interface CellProps { 
    cell: Cell;
}

const CellComponent: FC<CellProps> = ({cell}) => {
    return (
        <div className={["cell", cell.color].join(' ')}>
            {cell.figure?.logo && <Image src={cell.figure.logo} alt=""/>}
        </div>
    );
} 

const Chess = () => {

    const [board, setBoard] = useState(new Board())
    
    const restart = () => {      
        const newBoard = new Board();
        newBoard.initCells()
        newBoard.addFigures()
        setBoard(newBoard)
    }
    
    useEffect(() => {
        restart();
    }, [])

    return (
        <div className="chess">
            <BoardComponent board={board} setBoard={setBoard}></BoardComponent>
        </div>
    );
}

export default Chess