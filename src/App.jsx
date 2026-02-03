import "./App.css";
import SeatGrid from "./components/SeatGrid";
import { useEffect, useState } from "react";
import Movie from "./components/MovieClass";
import ShowForm from "./components/Bookingform";
import Button from "./components/Button";
import Admin from "./components/Admin";
import Cinema from "./components/Cinema";

function App() {
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(100);
  const [movies, setMovies] = useState([]);

  const [showAdmin, setShowAdmin] = useState(false);

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
      <button onClick={() => setShowAdmin(!showAdmin)}>
        {showAdmin ? "home" : "admin"}
      </button>
      {showAdmin ? (
        <Admin />
      ) : (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Cinema
            count={count}
            setCount={setCount}
            price={price}
            setPrice={setPrice}
            movies={movies}
            setMovies={setMovies}
            handleCount={handleCount}
            total={total}
          />
        </div>
      )}
    </>
  );
}

export default App;
