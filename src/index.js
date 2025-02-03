import React, { useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';

function XoxGameComponent() {
    const [games, setGames] = useState(Array(9).fill(""));
    const [mark, setMark] = useState("X");
    const [message, setMessage] = useState("Hamle Sırası: X");
    const [isGameFinish, setIsGameFinish] = useState(false);
    const [gameMove, setGameMove] = useState([]);

    // `useCallback` ile `newGame` fonksiyonunu sarmalıyoruz.
    const newGame = useCallback(() => {
        setGames(Array(9).fill(""));
        setIsGameFinish(false);
        setMark("X");
        setMessage("Hamle Sırası: X");
        setGameMove([]);
    }, []);

    useEffect(() => {
        newGame();
    }, [newGame]);

    const markGame = (index) => {
        if (!isGameFinish && games[index] === "") {
            const newGames = [...games];
            newGames[index] = mark;
            setGames(newGames);
            setGameMove((prev) => [...prev, newGames]);

            if (isMoveFinish(newGames)) {
                setMessage("Oyun berabere");
                setIsGameFinish(true);
                return;
            }

            if (isGameOver(newGames)) {
                setMessage(`Oyunu ${mark} kazandı!`);
                setIsGameFinish(true);
                return;
            }

            const nextMark = mark === "X" ? "O" : "X";
            setMark(nextMark);
            setMessage(`Hamle Sırası: ${nextMark}`);
        }
    };

    const isGameOver = (newGames) => {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8], // Satırlar
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8], // Sütunlar
            [0, 4, 8],
            [2, 4, 6] // Çaprazlar
        ];
        return winPatterns.some(([a, b, c]) => newGames[a] !== "" && newGames[a] === newGames[b] && newGames[a] === newGames[c]);
    };

    const isMoveFinish = (newGames) => !newGames.includes("");

    const setThatGameMove = (game) => {
        setGames([...game]);
    };

    return ( <
        div className = 'container text-center' >
        <
        h1 > XOX Oyunu < /h1> <
        h2 className = 'alert alert-warning' > { message } < /h2> <
        button onClick = { newGame }
        className = 'btn btn-outline-primary w-100' >
        Yeni Oyun <
        /button> <
        div className = 'row mt-2' > {
            games.map((game, index) => ( <
                div key = { index }
                className = "col-md-4 box"
                onClick = {
                    () => markGame(index) } > { game } <
                /div>
            ))
        } <
        /div> <
        hr / > {
            gameMove.map((game, index) => ( <
                button onClick = {
                    () => setThatGameMove(game) }
                className = 'btn btn-primary mx-2 mt-2'
                key = { index } > { index + 1 }.Hamle <
                /button>
            ))
        } <
        /div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( < XoxGameComponent / > );

reportWebVitals();