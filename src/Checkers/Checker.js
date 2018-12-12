import React, {Component} from 'react';
import blue from './img/blue.svg';
import yellow from './img/yellow.svg';
import red from './img/red.svg';
import green from './img/green.svg';
import "./Checker.css"

class Checker extends React.Component {
    Ways = [blue, yellow, red, green]
    NamesColors =["blue", "yellow", "red", "green"]
    Index;
    render() {
        let props = this.props
        switch (props.color) {
            case this.NamesColors[0]:
                this.Index = 0;
                break;
            case this.NamesColors[1]:
                this.Index = 1;
                break;
            case this.NamesColors[2]:
                this.Index = 2;
                break;
            case this.NamesColors[3]:
                this.Index = 3;
                break;
            default:
                this.Index = "";
                break;
        }
        if (this.Index === "")
            return null;
        return  <img className="Checker" src={this.Ways[this.Index]} alt={this.NamesColors[this.Index]} onClick={function(){props.changeCurCell(props.number)}}/>;
    }
}

export default Checker;
