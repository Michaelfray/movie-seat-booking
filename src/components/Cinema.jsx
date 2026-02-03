import React, { useState } from "react";
import ShowForm from "./Bookingform";
import SeatGrid from "./SeatGrid";
import Button from "./Button";

const Cinema = ({ count, price, setPrice, movies, handleCount, total }) => {
  const [showForm, setShowForm] = useState(false);

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
      {showForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(6, 6, 6, 0.6)", // mörk overlay
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
          }}
        >
          <ShowForm onCancel={() => setShowForm(false)} />
        </div>
      )}
    </>
  );
};

export default Cinema;
