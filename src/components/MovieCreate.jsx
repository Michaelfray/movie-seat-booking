import React, { useState } from "react";

const MovieCreate = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [poster, setPoster] = useState("");

  async function handleSubmit() {
    if (!title.trim() || !poster.trim()) {
      alert("Title and poster cannot be empty.");
      return;
    }

    if (!price || isNaN(price) || Number(price) <= 0) {
      alert("Price must be a number greater than 0.");
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

      alert("Movie added!");
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
        padding: "30px",
        borderRadius: "12px",
        color: "white",
        width: "400px",
        margin: "20px auto",
        textAlign: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
      }}
    >
      <h2 style={{ marginBottom: "25px", fontSize: "24px" }}>Movie Post</h2>

      {/* TITLE */}
      <label
        style={{ display: "block", textAlign: "left", marginBottom: "5px" }}
      >
        Title
      </label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: "none",
          marginBottom: "15px",
        }}
      />

      {/* PRICE */}
      <label
        style={{ display: "block", textAlign: "left", marginBottom: "5px" }}
      >
        Price
      </label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: "none",
          marginBottom: "15px",
        }}
      />

      {/* POSTER */}
      <label
        style={{ display: "block", textAlign: "left", marginBottom: "5px" }}
      >
        Poster URL
      </label>
      <input
        type="text"
        value={poster}
        onChange={(e) => setPoster(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: "none",
          marginBottom: "20px",
        }}
      />

      <button
        onClick={handleSubmit}
        style={{
          width: "100%",
          padding: "12px",
          background: "white",
          color: "#242333",
          borderRadius: "8px",
          fontWeight: "bold",
          cursor: "pointer",
          border: "none",
          fontSize: "16px",
        }}
      >
        Skicka
      </button>
    </div>
  );
};

export default MovieCreate;
