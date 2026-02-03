import React from "react";

export default function MovieDelete({ id, onDelete }) {
  async function handleDelete() {
    try {
      const response = await fetch(`http://localhost:3001/movies/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        alert("Failed to delete the movie.");
        return;
      }

      // Notify parent component that the movie was deleted
      if (onDelete) onDelete(id);
    } catch (error) {
      console.log("Delete error:", error);
    }
  }

  return (
    <button onClick={handleDelete} style={{ marginTop: "10px" }}>
      Delete
    </button>
  );
}
