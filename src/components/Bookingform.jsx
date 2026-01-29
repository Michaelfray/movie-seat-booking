import { useEffect, useState } from "react";
import Button from "./Button";

export default function ShowForm({ onCancel }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    console.log(name);
  }, [name]);

  async function handleSubmit(e) {
    e.preventDefault(); // stoppar att sidan laddas om
    if (name === "") {
      alert("Du måste ange namn");
      return;
    }

    if (phone === "") {
      alert("Du måste ange nummer");
      return;
    }

    // Name label can not contain numbers
    if (/\d/.test(name)) {
      alert("Namnet får inte innehålla siffror");
      return;
    }

    // Phonenumber can not contain letters
    if (/[a-zA-Z]/.test(phone)) {
      alert("Numret får inte innehålla bokstäver");
      return;
    }

    const newCustomer = { name, phone };
    try {
      await fetch("http://localhost:3001/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCustomer),
      });
    } catch (error) {
      console.log(error);
    }

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
              //  required //
            />
          </div>

          <div className="form-group">
            <label>Telefonnummer</label>
            <input
              type="text"
              value={phone}
              placeholder="070 123 45 67"
              onChange={(e) => setPhone(e.target.value)}
              // required //
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
