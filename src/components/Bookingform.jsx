import { useState } from "react";
import Button from "./Button";

export default function ShowForm({ onCancel }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  function handleSubmit(e) {
    e.preventDefault(); // stoppar att sidan laddas om

    // här kan du skicka datan till JSON-server senare
    console.log("Booking sent:");
    console.log("Name:", name);
    console.log("Phone:", phone);

    alert("Bokningen är bekräftad! Tack för din reservation.");

    onCancel(); // stänger formuläret
  }

  return (
    <div className="form-overlay">
      <div className="form-container">
        <h2>Booking information</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Namn</label>
            <input
              type="text"
              value={name}
              placeholder="Skriv ditt namn"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Telefonnummer</label>
            <input
              type="text"
              value={phone}
              placeholder="070 123 45 67"
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="button-row">
            <Button type="submit">Skicka</Button>
            <Button onClick={onCancel}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
