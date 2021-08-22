import logo from './logo.svg';
import './App.css';
import {Component} from 'react';
import { evaluate } from 'mathjs';

const CONTAINS_DECIMAL = /\./
const LAST_DIGIT_IS_OPERATOR = /\++\/+\*+-+$/
const LAST_DIGIT_IS_MINUS = /-$/


function App() {
  return (
    <div className="App">
      <Bits/>
    </div>
  );
}

class Bits extends Component {

    numberArr = [
        {value:7, id:"seven"},
        {value:8, id:"eight"},
        {value:9, id:"nine"},
        {value:4, id:"four"},
        {value:5, id:"five"},
        {value:6, id:"six"},
        {value:1, id:"one"},
        {value:2, id:"two"},
        {value:3, id:"three"}
    ];

    constructor(props) {
        super(props);
        this.state = {
            text: '0',
            evaluated: false,
            decimaled: false,
            operatored: false,
            opIndex: 0
        }
        this.clickOne = this.clickOne.bind(this);
        this.clickTwo = this.clickTwo.bind(this);
        this.clickThree = this.clickThree.bind(this);
        this.clickClear = this.clickClear.bind(this);
        this.numberClick = this.numberClick.bind(this);
        this.addClick = this.addClick.bind(this);
        this.equalsClick = this.equalsClick.bind(this);
        this.divideClick = this.divideClick.bind(this);
        this.subtractClick = this.subtractClick.bind(this);
        this.multiplyClick = this.multiplyClick.bind(this);
        this.decimalClick = this.decimalClick.bind(this);
        this.operatorClick = this.operatorClick.bind(this);
    }

    async clickOne() {
        await this.setState((state) => ({
            text: state.text.concat('1')
        }))
    }

    async clickTwo() {
        await this.setState((state) => ({
            text: state.text.concat('2')
        }))
    }

    async clickThree() {
        await this.setState((state) => ({
            text: state.text.concat('3')
        }))
    }

    clickClear() {
        this.setState((state) => ({
            text: '0',
            decimaled: false,
            operatored: false
        }))
    }

    clickAll() {
        document.getElementById('one').click();
        document.getElementById('two').click();
        document.getElementById('three').click();
        console.log(document.getElementById('display').innerText);
        document.getElementById('result').innerText = document.getElementById('display').innerText;
    }

    numberClick(e) {
        if (this.state.text === '0') {
            this.setState((state) => ({
                text: e.target.value,
                operatored: false
            }))
        } else {
            this.setState((state) => ({
                text: state.text.concat(e.target.value),
                operatored: false
            }))
        }

    }

    equalsClick() {
        this.setState((state) => ({
            text: evaluate(state.text).toString(),
            evaluated: true,
            operatored: false,
            decimaled: false
        }))
    }

    operatorClick(e) {
        if (LAST_DIGIT_IS_MINUS.test(this.state.text) && this.state.operatored) {
            this.setState((state) => ({
                text: state.text.slice(0,-2).concat(e.target.value),
                decimaled: false
            }))
        } else {
            if (e.target.value === '-') {
                this.setState((state) => ({
                    text: state.text.concat('-'),
                    decimaled: false
                }))
            } else if (this.state.operatored) {
                this.setState((state) => ({
                    text: state.text.slice(0, state.opIndex).concat(e.target.value.concat(state.text.slice(state.opIndex+1))),
                    opIndex: state.text.length+1,
                    operatored: true,
                    decimaled: false
                }))
            } else {
                this.setState((state) => ({
                    text: state.text.concat(e.target.value),
                    opIndex: state.text.length,
                    operatored: true,
                    decimaled: false
                }), function () {
                    console.log('operator inserted at', this.state.opIndex, this.state.text[this.state.opIndex])
                })
            }
        }

    }

    addClick() {
        if (!LAST_DIGIT_IS_OPERATOR.test(this.state.text)){
            this.setState((state) => ({
                text: state.text.concat('+'),
                decimaled: false
            }))
        } else {
            this.setState((state) => ({
                text: state.text.slice(0, -1).concat('+'),
                decimaled: false
            }))
        }
    }

    subtractClick() {
        this.setState((state) => ({
            text: state.text.concat('-'),
            decimaled: false
        }))
    }

    multiplyClick() {
        if (!LAST_DIGIT_IS_OPERATOR.test(this.state.text)){
            this.setState((state) => ({
                text: state.text.concat('*'),
                decimaled: false
            }))

        } else {
            this.setState((state) => ({
                text: state.text.slice(0, -1).concat('*'),
                decimaled: false
            }))
        }
    }

    divideClick() {
        if (!LAST_DIGIT_IS_OPERATOR.test(this.state.text)){
            this.setState((state) => ({
                text: state.text.concat('/'),
                decimaled: false
            }))
        } else {
            this.setState((state) => ({
                text: state.text.slice(0, -1).concat('/'),
                decimaled: false
            }))
        }
    }

    decimalClick() {
        if (!this.state.decimaled) {
            this.setState((state) => ({
                text: state.text.concat('.'),
                decimaled: true
            }))
        }
    }

    render() {
    return (
        <div>
          <p id='display'>
            {this.state.text}
          </p>
            {/*<button*/}
            {/*    id='one'*/}
            {/*    onClick={this.clickOne}*/}
            {/*>*/}
            {/*    One*/}
            {/*</button>*/}
            {/*<button*/}
            {/*    id='two'*/}
            {/*    onClick={this.clickTwo}*/}
            {/*>*/}
            {/*    Two*/}
            {/*</button>*/}
            {/*<button*/}
            {/*    id='three'*/}
            {/*    onClick={this.clickThree}*/}
            {/*>*/}
            {/*    Three*/}
            {/*</button>*/}
            {/*<br/>*/}
            <button
                id='clear'
                onClick={this.clickClear}
            >
                Clear
            </button>
            {/*<button*/}
            {/*    id='all'*/}
            {/*    onClick={this.clickAll}*/}
            {/*>*/}
            {/*    Press the buttons*/}
            {/*</button>*/}
            <p id='result'/>

            <div className='number-button-container'>
                <button className="number-button" color="primary" id="seven" value="7" onClick={this.numberClick}>7</button>
                <button className="number-button" color="primary" id="eight" value="8" onClick={this.numberClick}>8</button>
                <button className="number-button" color="primary" id="nine" value="9" onClick={this.numberClick}>9</button>
                <button className="number-button" color="primary" id="four" value="4" onClick={this.numberClick}>4</button>
                <button className="number-button" color="primary" id="five" value="5" onClick={this.numberClick}>5</button>
                <button className="number-button" color="primary" id="six" value="6" onClick={this.numberClick}>6</button>
                <button className="number-button" color="primary" id="one" value="1" onClick={this.numberClick}>1</button>
                <button className="number-button" color="primary" id="two" value="2" onClick={this.numberClick}>2</button>
                <button className="number-button" color="primary" id="three" value="3" onClick={this.numberClick}>3</button>
                <button color='primary' className='zero-button' id='zero' value='0' onClick={this.numberClick}
                >0</button>
                <button
                    color='primary'
                    className='dec-button'
                    id='decimal'
                    onClick={this.decimalClick}
                >.</button>
                <button id='equals' onClick={this.equalsClick}>=</button>
                <button id='add' value='+' onClick={this.operatorClick}>+</button>
                <button id='subtract' value='-' onClick={this.operatorClick}>-</button>
                <button id='multiply' value='*' onClick={this.operatorClick}>*</button>
                <button id='divide' value='/' onClick={this.operatorClick}>/</button>
            </div>

        </div>
    );
  }
}

class Buttons extends Component {
    numberArr = [
        {value:7, id:"seven"},
        {value:8, id:"eight"},
        {value:9, id:"nine"},
        {value:4, id:"four"},
        {value:5, id:"five"},
        {value:6, id:"six"},
        {value:1, id:"one"},
        {value:2, id:"two"},
        {value:3, id:"three"}
    ];


    render() {
        return (
            <div className='number-button-container'>
                {this.numberArr.map(ele => {
                    return (
                        <button
                            key={Math.floor(Math.random()*100000)}
                            className='number-button'
                            color='primary'
                            id={ele.id}
                            onClick={this.props.numberClick}
                            value={ele.value}
                        >{ele.value}</button>
                    )
                })}
                <div className='zero-button-container'>
                    <button
                        color='primary'
                        className='zero-button'
                        id='zero'
                        onClick={this.handleClickZero}
                    >0</button>
                </div>
                <button
                    color='primary'
                    className='dec-button'
                    id='decimal'
                    onClick={this.handleClickDecimal}
                >.</button>
            </div>
        );
    }
}

export default App;
