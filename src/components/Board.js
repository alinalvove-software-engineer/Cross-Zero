import React, { useState } from "react";
import Square from "./Square";

function calculateWinner (squares) {
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,5,8],
        [2,4,6],
    ];
    
    for (let [a, b, c] of lines) {
        if (
            squares[a] && // если клетка не пустая
            squares[a] === squares[b] &&
            squares[a] === squares[c]
         ) {
            return squares[a]; // возвращает Х или О
        }
    }
    return null; //победителя нет 
}



function Board() {
    const [squares, setSquares] = useState (Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState (true);
    
    //передаем переменную в calculateWinner 
    const winner = calculateWinner(squares);
    const status = winner 
    ? `Победитель: ${winner}`
    : `Ходит: ${xIsNext ? "X" : "O"}`;

    function handleClick(i) {
        if (squares[i] || winner) return; // если клетка уже заполнена или есть победитель - выход 

        //создаём копию массива (иммутабельность)
        const newSquares = squares.slice(); // копия массива 
        newSquares[i] = xIsNext ? "X" : "O";
        
        setSquares (newSquares); //обновляем state 
        setXIsNext (!xIsNext);  //меняем очередь хода 
    }

// функции отрисовки одной клетки 
function renderSquare(i) {
    return (
        <Square
            value={squares[i]}             //берём из массива 
            onClick={() => handleClick(i)} //при клике вызывает handleClick 
        />
    )
} 
//функции для сброса игры 
function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }
  

return (
    <div>
    <div className="status">{status}</div>
        <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        </div>
        <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        </div>
        <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
        </div>
<button className="reset-button" onClick={resetGame}>
    Сыграть снова 
</button>

    </div>
);  // конец return (JSX)
}   // сдесь закрывается функция Board 

export default Board;  // поле и логика 