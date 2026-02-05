import { useEffect, useState } from "react";

export default function MovieEdit() {
  const [movies, setMovies] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [poster, setPoster] = useState("");

  // Fetch all movies from the API
  useEffect(() => {
    fetch("http://localhost:3001/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  // When selecting a movie → load its current data into the form
  function handleSelectMovie(id) {
    setSelectedId(id);
    const movie = movies.find((m) => m.id === Number(id));

    if (movie) {
      setTitle(movie.title);
      setPrice(movie.price);
      setPoster(movie.poster);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();

    if (!selectedId) {
      alert("You must select a movie to update.");
      return;
    }

    const updatedMovie = {
      title,
      price: Number(price),
      poster,
    };

    try {
      await fetch(`http://localhost:3001/movies/${selectedId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedMovie),
      });

      alert("Movie updated successfully!");
    } catch (error) {
      alert("Something went wrong while updating the movie.");
      console.error(error);
    }
  }

  return (
    <div
      style={{
        background: "#2c2c3a",
        padding: "20px",
        borderRadius: "12px",
        width: "420px",
        margin: "0 auto",
        color: "white",
        textAlign: "center",
      }}
    >
      <h3>Edit Movie</h3>

      {/* Dropdown to choose which movie to edit */}
      <label style={{ display: "block", marginBottom: "10px" }}>
        Choose a movie:
      </label>

      <select
        value={selectedId}
        onChange={(e) => handleSelectMovie(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          marginBottom: "20px",
        }}
      >
        <option value="">-- select movie --</option>
        {movies.map((movie) => (
          <option key={movie.id} value={movie.id}>
            {movie.title}
          </option>
        ))}
      </select>

      {/* Movie edit form */}
      <form onSubmit={handleUpdate}>
        <label>Title</label>
        <input
          type="text"
          value={title}
          placeholder="New title"
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <label>Price</label>
        <input
          type="number"
          value={price}
          placeholder="New price"
          onChange={(e) => setPrice(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <label>Poster URL</label>
        <input
          type="text"
          value={poster}
          placeholder="Poster image URL"
          onChange={(e) => setPoster(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "white",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Save changes
        </button>
      </form>
    </div>
  );
}
