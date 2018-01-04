import React, { Component } from 'react'

/**
|--------------------------------------------------
| 不需要这个
|--------------------------------------------------
class Square extends Component {
    constructor() {
        super();
        this.state = {
            value: null,
        };
    }

    render() {
        return (
            <button className="square" onClick={() => { this.props.onClick() }}>
                {this.props.value}
            </button>
        );
    }
}
*/

// 用简单的函数即可
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class                    Board extends Component {
    /* 
    constructor() {
        super();
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }
     */
    
    
    /* 这里调用的话需要添加this */
    _calculateWinner(squares) {
        return calculateWinner(squares)
    }

    _handleClick(i) {
        // 浅拷贝 不可变?
        /**
        |--------------------------------------------------
        | 为什么不可变性在React当中非常重要
在上一节内容当中，我们通过使用 .slice() 方法对已有的数组数据进行了浅拷贝，以此来防止对已有数据的改变。接下来我们稍微了解一下为什么这样的操作是一种非常重要的概念。
改变应用数据的方式一般分为两种。第一种是直接修改已有的变量的值。第二种则是将已有的变量替换为一个新的变量。
直接修改数据
var player = {score: 1, name: 'Jeff'};
player.score = 2;
// Now player is {score: 2, name: 'Jeff'}
替换修改数据
var player = {score: 1, name: 'Jeff'};

var newPlayer = Object.assign({}, player, {score: 2});
// Now player is unchanged, but newPlayer is {score: 2, name: 'Jeff'}

// 或者使用最新的对象分隔符语法，你可以这么写：
// var newPlayer = {...player, score: 2};
两种方式的结果是一样的，但是第二种并没有改变之前已有的数据。通过这样的方式，我们可以得到以下几点好处：
很轻松地实现 撤销/重做以及时间旅行
运用不可变性原则可以让我们很容易实现一些复杂的功能。例如我们在这个教程中会实现的，通过点击列表中的某一项直接返回当某一步棋时的状态。不改变已有的数据内容可以让我们在需要的时候随时切换回历史数据。
记录变化
在我们直接修改一个对象的内容之后，是很难判断它哪里发生了改变的。我们想要判断一个对象的改变，必须拿当前的对象和改变之前的对象相互比较，遍历整个对象树，比较每一个值，这样的操作复杂度是非常高的。
而运用不可变性原则之后则要轻松得多。因为我们每次都是返回一个新的对象，所以只要判断这个对象被替换了，那么其中数据肯定是改变了的。
在 React 当中判定何时重新渲染
运用不可变性原则给 React 带来最大的好处是，既然我们现在可以很方便地判断对象数据是否发生改变了，那么也就很好决定何时根据数据的改变重新渲染组件。尤其是当我们编写的都属于 **纯组件 pure components **的时候，这种好处的效果更为明显。
了解更多有关 shouldComponentUpdate() 以及如何编写 pure components 的内容，你可以查阅 性能优化 这一篇。
        |--------------------------------------------------
        */
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    
    // 继续状态提升
    renderSquare(i) {
        // return <Square value={this.state.squares[i]} onClick={() => this._handleClick(i)} />;
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
    }
    
    

    render() {

        /* 

        <div className="status">{status}</div>
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        */

        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}




export default class Game extends Component {

    constructor() {
        super();
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            stepNumber: 0,
        };
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) ? false : true,
        });
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {
        // 这里需要做的就是 Redux需要做的东西 (React中一旦state发生改变就会去搞 state在constructor中构建)
        // 另外如果用react-router的话 就可以不用自己写# hash的代码 更加好的是 还能提供brower模式 这个怎么实现还不清楚
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Move #' + move :
                'Game start';
            return (
                <li key={move}>
                    <a href="#JavaScript" onClick={() => this.jumpTo(move)}>{desc}</a>
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


/* 全局的 */
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