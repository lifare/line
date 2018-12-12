import React, {Component} from 'react';
import Cell from "./Cell/Cell";
import Point from './Point'
import './Board.css'

class Board extends React.Component {

    score = 0;
    height = 9;
    width = 9;
    constructor(props){
        super(props);
        this.changeCurCell = this.changeCurCell.bind(this);
    }

    choseCell = (freeCell) =>{
        if (freeCell.length === 0)
            return NaN;
        let rand = Math.floor(Math.random() * freeCell.length);
        return freeCell[rand];
    }

    chooseColor = () =>{
        let rand = Math.floor(Math.random() * this.state.Color.length);
        return this.state.Color[rand];
    }

    getFreeCell = (board) => {
        let arr = [];
        for (let i = 0; i < 81; i++) {
            if (board[i] === "cell")
                arr.push(i);
        }
        return arr;
    }

    makeMove = (board) => {
        let newBoard = board.slice();
        for (let i = 0; i < 3; i++)
        {
            let index = this.choseCell(this.getFreeCell(newBoard));
            if (isNaN(index))
            {
                alert("GAME OVER WITH SCORE: " + this.score);
                this.score = 0;
                this.setState ({
                    score: 0,
                    gameEnd:false,
                    newTurn:true,
                    Color:["blue", "yellow", "red", "green"],
                    board: this.initialBoard(),
                    curCell:undefined
                });
            }
            let color = this.chooseColor();
            newBoard[index] = color
            let line = this.find_line(new Point(index % this.width, Math.trunc(index / this.height)), newBoard);
            if(line.length === 2)
                this.delete_line(newBoard, line[0], line[1]);
        }
        this.setState({
            board: newBoard,
            curCell:undefined
        })
    }

    initialBoard = () => {
        let arr = [];
        for (let i = 0; i < this.width*this.height; i++)
            arr[i] = "cell"
        return arr;
    }

    state ={
        gameEnd:false,
        newTurn:true,
        Color:["blue", "yellow", "red", "green"],
        board: this.initialBoard(),
        curCell:undefined
    }
    inBounds(point) {
        return point.X >= 0 && point.X < this.height && point.Y >= 0 && point.Y < this.width;
    }

    get_next(point) {
        let res = []
        for (let dx = -1; dx < 2; dx++) {
            for (let dy = -1; dy < 2; dy++) {
                if ((dx === 0 && dy === 0) || (dx !== 0 && dy !== 0))
                    continue;
                let next_point = point.checkPoint(this, dx, dy);
                if (next_point !== undefined)
                    res.push(next_point)
            }
        }
        return res
    }
    hasPoint(arr, point){
        return arr.filter((e) => e.eq(point)).length !==0;
    }
    find_way(point_start, point_end) {
        let visited = [];
        visited.unshift(point_start);
        let queue_point = [];
        queue_point.unshift(point_start);
        while (queue_point.length !== 0) {
            let cur_point = queue_point.shift();
            let next_points = this.get_next(cur_point);
            next_points.forEach((point)=> {
                if (!this.hasPoint(visited, point)) {
                    visited.unshift(point)
                    queue_point.unshift(point)
                }
            })
            if (this.hasPoint(visited, point_end))
                break;
        }
        return this.hasPoint(visited, point_end);
    }
    find_line(point, map) {
        let res = []
        let cur_element = map[point.X +point.Y*this.height]
        let i = point.X;
        let j = point.Y;
        let end_right;
        let end_left;
        let end_up;
        let end_down;
        for (let x = 0; x< this.width; x++)
            if (this.inBounds(new Point(i + x, j)) && cur_element === map[i + x+j*this.height])
                end_right = new Point(i + x, j);
            else
                break;
        for (let x = 0; x< this.width; x++)
            if (this.inBounds(new Point(i - x, j)) && cur_element === map[i - x +this.height*j])
                end_left = new Point(i - x, j)
            else
                break;
        for (let y = 0; y< this.height; y++)
            if (this.inBounds(new Point(i, j + y)) && cur_element === map[i +(j + y)*this.height])
                end_up = new Point(i, j + y)
            else
                break;
        for (let y = 0; y< this.height; y++)
            if (this.inBounds(new Point(i, j - y)) && cur_element === map[i+(j - y)*this.height])
                end_down = new Point(i, j - y)
            else
                break;
        if (Math.abs(end_left.X - end_right.X) + 1 >= 5) {
            res.push(end_left);
            res.push(end_right);
        }
        if (Math.abs(end_down.Y - end_up.Y) + 1 >= 5) {
            res.push(end_down);
            res.push(end_up);
        }
        return res
    }

    delete_line(map, start, end) {
        for (let i = start.X; i < end.X + 1; i++) {
            for (let j = start.Y; j < end.Y + 1; j++) {
                map[i + this.height * j]='cell'
                this.score += i*3 + j*2;
            }
        }
    }

    changeCurCell = (i) => {
        if (this.state.board[i] !== 'cell') {
            this.setState({
                curCell: i
            });
        }
        else {
            if (this.state.curCell !== undefined){
                let curCell = this.state.curCell;
                let fromCell = new Point(curCell % this.width, Math.trunc(curCell / this.width));
                let toCell = new Point(i % this.width, Math.trunc(i / this.width));
                if(this.find_way(fromCell, toCell)){
                    let newBoard = this.state.board.slice();
                    let color = newBoard[this.state.curCell];
                    newBoard[this.state.curCell] = 'cell';
                    newBoard[i] = color;
                    let line = this.find_line(toCell, newBoard);
                    if(line.length === 2)
                        this.delete_line(newBoard, line[0], line[1]);
                    this.makeMove(newBoard);
                }
            }
        }
    };

    render() {
        if (this.state.newTurn){
            this.makeMove(this.state.board);
            this.setState({
                newTurn: false
            });
        }
        let arr= this.state.board.map((e, i) => <li key={i} className="BoardPart"><Cell color={e} chooseCell={this.state.curCell===i} number={i} changeCurCell={this.changeCurCell}/> </li>);
        return (
            <div>
                <p>Score:  {this.score} </p>
                <ul className="Board">
                    {arr}
                </ul>
                <p>Rule:
                    You must collect a line vertically or horizontally, consisting of 5 or more circles. It is forbidden to walk around the dioganal. After each move in the random mete, 3 new circles appear. The game will end when the field is filled.
                </p>
            </div>
        )
    };

}

export default Board;
