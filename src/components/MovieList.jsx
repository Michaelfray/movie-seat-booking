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
        maxWidth: "1000px",
        margin: "20px auto",
        color: "white",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Alla filmer</h2>

      {movies.length === 0 && <p>Inga filmer hittades...</p>}

      {/* ⭐ GRID / FLEX WRAPPER */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            style={{
              background: "#2c2c3a",
              padding: "15px",
              borderRadius: "8px",
              width: "250px", // ⭐ fixerar kortbredd för snygg grid
              textAlign: "left",
            }}
          >
            {/* ⭐ POSTER-BILD */}
            <img
              src={movie.poster}
              alt={movie.title}
              style={{
                width: "100%",
                height: "330px",
                objectFit: "cover",
                borderRadius: "6px",
                marginBottom: "10px",
              }}
            />

            <h3>{movie.title}</h3>
            <p>Pris: {movie.price} kr</p>

            {/* ⭐ DELETE-KNAPP */}
            <MovieDelete
              id={movie.id}
              onDelete={(deletedId) =>
                setMovies((prev) => prev.filter((m) => m.id !== deletedId))
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
