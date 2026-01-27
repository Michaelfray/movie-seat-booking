import "./App.css";
import SeatGrid from "./components/SeatGrid";
import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(100);
  const total = count * price;

  useEffect(() => {
    console.log(total);
  }, [total]);

  function handleCount(selected) {
    if (selected) {
      setCount((currentCount) => currentCount + 1);
    } else {
      setCount((currentCount) => currentCount - 1);
    }
  }

  return (
    <>
      <div className="movie-container">
        <label htmlFor="movie">Pick a movie:</label>
        <select
          name="movie"
          id="movie"
          // defaultValue="100"
          onChange={(e) => setPrice(Number(e.target.value))}
        >
          <option value="100">Fast and furious 6 (100 kr)</option>
          <option value="50">The mummy returns (50 kr)</option>
          <option value="70">Jumanji: Welcome to the Jungle (70 kr)</option>
          <option value="40">Rampage (40 kr)</option>
        </select>
      </div>

      <ul className="showcase">
        <li>
          <div className="seat"></div>
          <small>N/A</small>
        </li>
        <li>
          <div className="seat selected"></div>
          <small>Selected</small>
        </li>
        <li>
          <div className="seat occupied"></div>
          <small>Occupied</small>
        </li>
      </ul>

      <div className="container">
        <div className="screen"></div>

        {/* <div className="row">
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
        </div>

        <div className="row">
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat occupied"></div>
          <div className="seat occupied"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
        </div>

        <div className="row">
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat occupied"></div>
          <div className="seat occupied"></div>
        </div>

        <div className="row">
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
        </div>

        <div className="row">
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat occupied"></div>
          <div className="seat occupied"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
        </div>

        <div className="row">
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat occupied"></div>
          <div className="seat occupied"></div>
          <div className="seat occupied"></div>
          <div className="seat"></div>
        </div> */}
        <SeatGrid handleCount={handleCount} />
      </div>

      <p className="text">
        You have selected <span id="count">{count}</span> seats for a price of $
        <span id="total">{total}</span>
      </p>
    </>
  );
}

export default App;
