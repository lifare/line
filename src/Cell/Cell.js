import React, {Component} from 'react';
import  cell from './cell.svg';
import cellChoose from './addCell.svg'
import "./Cell.css"
import Checker from "../Checkers/Checker";

class Cell extends React.Component {
    render() {
        let props = this.props;
        return <div><img className="Cell"  src={props.chooseCell ? cellChoose : cell} alt='cell' onClick={function (){props.changeCurCell(props.number)}} />
                <Checker color={this.props.color} changeCurCell={props.changeCurCell} number={props.number}/>
        </div>
    }
}

export default Cell;
