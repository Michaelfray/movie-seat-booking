import "./App.css";
import SeatGrid from "./components/SeatGrid";
import { useEffect, useState } from "react";
import Movie from "./components/MovieClass";
import ShowForm from "./components/Showform";
import Button from "./components/Button";

function App() {
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(100);
  const [movies, setMovies] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const total = count * price;

  useEffect(() => {
    fetch("http://localhost:3001/movies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.map((d) => new Movie(d.id, d.title, d.price, d.poster)));
        setPrice(data[0].price);
      });
  }, []);

  function handleCount(selected) {
    if (selected) {
      setCount((c) => c + 1);
    } else {
      setCount((c) => c - 1);
    }
  }

  return (
    <>
      <div className="movie-container">
        <label htmlFor="movie">Pick a movie:</label>
        <select
          name="movie"
          id="movie"
          defaultValue={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        >
          {movies.map((movie) => (
            <option key={movie.id} value={movie.price}>
              {movie.title} ({movie.price} kr)
            </option>
          ))}
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
        <SeatGrid handleCount={handleCount} />
      </div>

      <p className="text">
        You have selected <span id="count">{count}</span> seats for a price of $
        <span id="total">{total}</span>
      </p>

      <Button onClick={() => setShowForm(true)}>Boka</Button>

      {showForm && <ShowForm onCancel={() => setShowForm(false)} />}
    </>
  );
}

export default App;
