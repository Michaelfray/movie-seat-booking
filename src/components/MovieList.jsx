import { useEffect, useState } from "react";
import MovieDelete from "./MovieDelete";

export default function MovieList() {
  const [movies, setMovies] = useState([]);

  // Fetch movies from API
  useEffect(() => {
    fetch("http://localhost:3001/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "20px 0", // ⭐ FIX: no auto-centering, keeps layout clean
        color: "white",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Alla filmer</h2>

      {movies.length === 0 && <p>Inga filmer hittades...</p>}

      {movies.map((movie) => (
        <div
          key={movie.id}
          style={{
            background: "#2c2c3a",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        >
          <h3>{movie.title}</h3>
          <p>Pris: {movie.price} kr</p>

          <MovieDelete
            id={movie.id}
            onDelete={(deletedId) =>
              setMovies((prev) => prev.filter((m) => m.id !== deletedId))
            }
          />
        </div>
      ))}
    </div>
  );
}
