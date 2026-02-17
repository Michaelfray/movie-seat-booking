# Movie Seat Booking

En React-baserad applikation för bokning av biostolar med dynamiskt sätesval, prisberäkning, bokningsformulär och Admin-panel med full CRUD.

Byggd med React, Vite och JSON Server.

---

## Teknik

- React (useState, useEffect)
- Vite
- Fetch API
- JSON Server
- ESLint
- Git & GitHub Pages

---

# Development Log

## Dag 1–2 – Projektstart

Jag startade projektet direkt i React med Vite eftersom jag tidigare pluggat React och ville fortsätta utveckla den kunskapen. React är dessutom ett populärt ramverk inom frontend, vilket gjorde det relevant att använda.

Första dagarna gick åt till att:

- Skapa projektet
- Strukturera `App.jsx`
- Skapa components-mapp
- Koppla CSS
- Starta utvecklingsservern

I början låg mycket logik i `App.jsx`, men det blev snabbt rörigt.

---

## Dag 3–4 – SeatGrid & Säteslogik

Jag byggde `SeatGrid` dynamiskt (6 rader, 8 säten per rad).

Jag implementerade:

- `useState` för selectedSeats
- array för occupiedSeats
- toggle-logik vid klick
- spärr för occupied seats

Jag stötte på en dubbelräkningsbugg i count-logiken. Det löstes genom att justera hur state uppdaterades och säkerställa att beräkningen baserades på aktuell state.

Detta var första gången jag verkligen förstod hur känsligt state kan vara om det inte hanteras korrekt.

---

## Dag 5 – Prisberäkning & Strukturering

Jag implementerade dynamisk prisberäkning:

```js
const total = count * price;

Först funderade jag på att lägga total i state, men insåg att det räcker som ett beräknat värde. Det gjorde koden renare.

Jag flyttade även biograf-logiken från App.jsx till en separat Cinema.jsx.

Strukturen blev:

App – övergripande vy

Cinema – biografens logik

SeatGrid – säteslogik

Det gjorde projektet mer lättläst.

Dag 6–7 – JSON Server & Fetch

Jag installerade JSON Server och skapade en db.json med:

/movies

/bookings

Jag implementerade fetch() i useEffect() för att hämta filmer.

Jag fick ett undefined-fel eftersom jag försökte läsa data innan fetch var klar. Det löstes genom att hantera laddningsflödet bättre.

Här förstod jag tydligare skillnaden mellan:

React state (temporär data i frontend)

Backend persistence (sparad data i JSON Server)

Dag 8–9 – BookingForm & Validering

Jag skapade först ett ShowForm som senare blev BookingForm.

Jag implementerade:

controlled inputs

validering (inga tomma fält)

kontroll av siffror/bokstäver

preventDefault()

POST till /bookings

I början skickades tomma värden till databasen. Det löstes genom tydligare frontend-validering innan POST.

Jag gjorde även formuläret till en modal för bättre struktur och användarupplevelse.

Dag 10–14 – Admin & CRUD

Admin-delen byggdes stegvis.

Jag skapade Admin.jsx och lade till en toggle mellan Cinema och Admin.

READ (GET)

Hämtade filmer

Renderade som cards

Förbättrade layout från column till flex-wrap grid

DELETE

Implementerade DELETE-request

UI uppdaterades inte direkt

Löste det genom att uppdatera state lokalt med filter()

CREATE

Byggde formulär med POST

Upptäckte att UI inte uppdaterades utan refresh

Förstod att state måste uppdateras lokalt

UPDATE

Implementerade PUT med förifyllt formulär

Uppdaterade lokalt state istället för att ladda om sidan

Denna del utvecklade min förståelse mest, särskilt kring state-synkning.

Problem jag stötte på

Dubbelräkning i seat count

total uppdaterades fel

undefined-fel vid fetch

Delete uppdaterade inte UI

height: 100vh påverkade layout

GitHub Pages base-path problem

De flesta problemen löstes genom refaktorering och tydligare separation mellan komponenter.

Val av ramverk, bibliotek och struktur

Jag valde React eftersom:

Jag tidigare studerat det

Projektet innehåller flera delar (seat-logik, formulär, CRUD)

Komponentbaserad struktur gör projekt mer hanterbara

Jag använde:

React hooks (useState, useEffect)

Fetch API istället för externa bibliotek för att hålla lösningen enkel

JSON Server för att simulera ett REST-API

Strukturmässigt delade jag upp projektet i flera komponenter för att ge varje del ett tydligt ansvar.

Det gjorde felsökning enklare, särskilt när state-problem uppstod i Admin-delen.

Slutreflektion

Projektet började som en enkel seat-booking-lösning men utvecklades till en mer strukturerad React-applikation med API-integration och Admin-panel.

Det som utvecklade mig mest var:

Skillnaden mellan state och persistence

CRUD utan refresh

Komponentstruktur

Deploy-problematik

Jag upplever att jag gått från att främst fokusera på funktion till att tänka mer på struktur och dataflöde.