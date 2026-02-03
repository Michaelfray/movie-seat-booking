import React from "react";
import { useState } from "react";

const MovieCreate = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [poster, setPoster] = useState("");

  async function handleSubmit() {
    // 🔥 Validering – hindra tomma strängar
    if (!title.trim() || !poster.trim()) {
      alert("Title och poster får inte vara tomma.");
      return;
    }

    // 🔥 Validering – hindra felaktigt pris
    if (!price || isNaN(price) || Number(price) <= 0) {
      alert("Pris måste vara ett nummer större än 0.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          price: Number(price),
          poster: poster.trim(),
        }),
      });

      if (!response.ok) {
        alert("Something went wrong");
        return;
      }

      alert("Movie is added!");
      setTitle("");
      setPrice("");
      setPoster("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      style={{
        background: "#2c2c3a",
        padding: "20px",
        borderRadius: "10px",
        color: "white",
        maxWidth: "600px",
        margin: "20px auto",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <h3>Movie Post</h3>

      <label htmlFor="title">title</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="price">price</label>
      <input
        type="number"
        id="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <label htmlFor="poster">poster</label>
      <input
        type="text"
        id="poster"
        value={poster}
        onChange={(e) => setPoster(e.target.value)}
      />

      <button onClick={handleSubmit}>Skicka</button>
    </div>
  );
};

export default MovieCreate;
