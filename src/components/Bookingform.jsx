import { useEffect, useState } from "react";
import Button from "./Button";

export default function ShowForm({ onCancel }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    console.log(name);
  }, [name]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (name === "") {
      alert("Du måste ange namn");
      return;
    }

    if (phone === "") {
      alert("Du måste ange nummer");
      return;
    }

    if (/\d/.test(name)) {
      alert("Namnet får inte innehålla siffror");
      return;
    }

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

    console.log("Booking sent:");
    console.log("Name:", name);
    console.log("Phone:", phone);

    alert("Bokningen är bekräftad! Tack för din reservation.");

    onCancel();
  }

  return (
    <div
      style={{
        background: "rgba(0,0,0,0.6)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          background: "white",
          color: "black",
          padding: "25px",
          borderRadius: "12px",
          width: "320px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          boxShadow: "0 0 20px rgba(0,0,0,0.4)",
          zIndex: 1000,
        }}
      >
        <h2 style={{ marginTop: 0 }}>Booking information</h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <div className="form-group">
            <label>Namn</label>
            <input
              type="text"
              value={name}
              placeholder="Skriv ditt namn"
              onChange={(e) => setName(e.target.value)}
              style={{ padding: "8px" }}
            />
          </div>

          <div className="form-group">
            <label>Telefonnummer</label>
            <input
              type="text"
              value={phone}
              placeholder="070 123 45 67"
              onChange={(e) => setPhone(e.target.value)}
              style={{ padding: "8px" }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <Button type="submit">Skicka</Button>
            <Button
              onClick={onCancel}
              type="button"
              style={{ background: "lightgray" }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
