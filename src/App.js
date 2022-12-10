import "./App.css";
import { useState, useRef } from "react";

function App() {
  const [squares, setSquares] = useState([]);
  const history = useRef([]);
  console.log("historico inicio", history.current);

  function createNewSquare(event) {
    const newSquare = [event.clientX, event.clientY, getRandomColor()];
    setSquares([...squares, newSquare]);
  }

  function undo() {
    if (squares.length >= 1) {
      history.current.push(squares[squares.length - 1]);
      setSquares([...squares].slice(0, squares.length - 1));
    }
  }

  function redo() {
    if (history.current.length >= 1) {
      const newSquare = history.current.pop();
      setSquares([...squares, newSquare]);
    }
  }
  function clear() {
    history.current = [];
    setSquares([]);
  }

  return (
    <div className="App">
      <body>
        <div className="menu-div">
          <h1>{squares.length}</h1>
          <button onClick={undo}>Undo</button>
          <button onClick={redo}>Redo</button>
          <button onClick={clear}>Clear</button>
        </div>

        <div
          className="screen"
          onClick={(event) => {
            createNewSquare(event);
          }}
          onContextMenu={(event) => {
            event.preventDefault();
            undo();
          }}
        >
          {/* <div className="circle"></div> */}
          {squares.map((square, index) => (
            <div
              className="circle"
              style={{
                left: square[0] - 50,
                top: square[1] - 50,
                backgroundColor: square[2],
              }}
            >
              <text
                style={{
                  textAlign: "center",
                  width: "100%",
                  height: "100%",
                  top: "50%",
                  position: "absolute",
                  color: "white",
                }}
              >
                {index}
              </text>
            </div>
          ))}
        </div>
      </body>
    </div>
  );
}

export default App;

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
