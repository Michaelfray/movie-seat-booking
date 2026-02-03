import React, { useState } from "react";
import MovieList from "./MovieList";
import MovieCreate from "./MovieCreate";
import MovieEdit from "./MovieEdit";

const Admin = () => {
  const [view, setView] = useState(null);
  // null = visa ingenting först

  return (
    <div style={{ textAlign: "center", padding: "20px", color: "white" }}>
      <h2>Admin Panel</h2>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setView("list")}>List Movies</button>
        <button onClick={() => setView("create")}>Add Movie</button>
        <button onClick={() => setView("edit")}>Edit Movie</button>
      </div>

      {/* Visa rätt komponent baserat på "view" */}
      {view === "list" && <MovieList />}
      {view === "create" && <MovieCreate />}
      {view === "edit" && <MovieEdit />}
    </div>
  );
};

export default Admin;
