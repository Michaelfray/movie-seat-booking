import { useState } from "react";

export default function SeatGrid({ handleCount }) {
  const rows = 6;
  const seatsPerRow = 8;

  const occupiedSeats = [
    "1-4",
    "1-5",
    "2-7",
    "2-8",
    "4-4",
    "4-5",
    "5-5",
    "5-6",
  ];

  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (rowIndex, seatIndex) => {
    const seatId = `${rowIndex}-${seatIndex}`;

    if (occupiedSeats.includes(seatId)) return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  return (
    <div className="seat-grid">
      {[...Array(rows)].map((_, rowIndex) => (
        <div key={rowIndex} className="row">
          {[...Array(seatsPerRow)].map((_, seatIndex) => {
            const seatId = `${rowIndex}-${seatIndex}`;
            const isSelected = selectedSeats.includes(seatId);
            const isOccupied = occupiedSeats.includes(seatId);

            return (
              <div
                key={seatIndex}
                className={`seat 
                ${isSelected ? "selected" : ""} 
                ${isOccupied ? "occupied" : ""}
              `}
                onClick={() => {
                  if (!isOccupied) {
                    handleSeatClick(rowIndex, seatIndex);
                    handleCount(!isSelected);
                  }
                }}
              ></div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
