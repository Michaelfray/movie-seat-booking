Development Log – Movie Seat Booking
Projektets start

Jag valde att starta projektet direkt i React med Vite eftersom jag tidigare studerat React och ville fortsätta utveckla den kunskapen i ett mer komplett projekt. Eftersom uppgiften innehåller flera delar – säteslogik, dynamisk prisberäkning, formulär och en Admin-del med CRUD – kändes det naturligt att arbeta komponentbaserat från början istället för att skriva allt i ren JavaScript.

De första dagarna gick åt till att sätta upp projektet, strukturera App.jsx, skapa en components-mapp och få grundläggande rendering att fungera. I början låg mycket logik direkt i App.jsx, men det blev snabbt tydligt att det inte var hållbart i längden.

Säteslogik och prisberäkning

Nästa steg var att bygga SeatGrid dynamiskt (6 rader, 8 säten per rad). Här implementerade jag state för valda säten, en lista för upptagna säten samt klicklogik som togglar ett säte mellan valt och ledigt. När jag började testa märkte jag att count ibland räknades fel. Det visade sig bero på hur state uppdaterades, vilket blev en tidig insikt kring hur noggrant man måste hantera state i React.

Den dynamiska prisberäkningen implementerades genom att multiplicera antal valda säten med filmens pris. Först funderade jag på att lägga totalen i state, men insåg att det räcker som ett beräknat värde. Det gjorde koden enklare och mer logisk.

För att förbättra strukturen flyttade jag biograf-logiken till en separat Cinema.jsx, vilket gav en tydligare uppdelning där App ansvarar för övergripande vy, Cinema för biografens logik och SeatGrid för säteshanteringen.

JSON Server och dataflöde

Jag installerade JSON Server och skapade en db.json med endpoints för /movies och /bookings. När jag implementerade fetch() i useEffect() uppstod ett undefined-fel eftersom jag försökte läsa data innan den laddats. Det var först frustrerande, men efter felsökning förstod jag att det handlade om render-flödet i React.

Här blev skillnaden mellan React state (temporär frontend-data) och backend persistence tydlig för mig. Det var en viktig insikt som påverkade hur jag tänkte kring resten av projektet.

BookingForm och validering

Jag byggde först ett enklare formulär som senare utvecklades till BookingForm. Jag implementerade controlled inputs, validering för tomma fält samt kontroll av siffror och bokstäver innan POST till /bookings.

När jag testade såg jag att tomma värden faktiskt hamnade i db.json. Det gjorde att jag förstod vikten av frontend-validering på riktigt, inte bara teoretiskt. Jag refaktorerade även formuläret till en modal, vilket gjorde strukturen tydligare och gränssnittet mer användarvänligt.

Admin och CRUD

Admin-delen byggdes stegvis och var den mest lärorika delen av projektet. Jag skapade en separat Admin.jsx och lade till en toggle mellan Cinema och Admin i App-komponenten.

READ-delen implementerades med en GET-request som renderade filmer som kort. Layouten förbättrades från en enkel vertikal lista till ett flex-wrap grid för att kännas mer som en riktig adminvy.

När jag implementerade DELETE fungerade anropet mot servern, men UI:t uppdaterades inte. Det var frustrerande eftersom det såg ut som att inget hände. Efter felsökning insåg jag att jag behövde uppdatera state lokalt med filter() istället för att enbart förlita mig på backend-responsen. Det var en tydlig aha-upplevelse kring hur frontend och backend samverkar.

CREATE och UPDATE följde samma mönster – anropen fungerade mot servern, men det krävdes lokal state-uppdatering för att förändringen skulle synas direkt i gränssnittet. Här började jag känna att jag verkligen förstod dataflödet i en React-applikation.

Problem och lösningar

Under projektets gång stötte jag på flera problem, bland annat dubbelräkning i seat count, undefined-fel vid fetch, state som inte synkades korrekt i Admin samt layoutproblem på grund av global CSS. Vid deploy uppstod även problem med Vite base-path och insikten att GitHub Pages endast serverar statisk frontend.

De flesta problemen löstes genom refaktorering och tydligare separation mellan komponenter.

Val av ramverk, bibliotek och struktur

Jag valde React eftersom jag redan studerat det och ville arbeta vidare med det i ett mer praktiskt sammanhang. Projektets omfattning gjorde att ett komponentbaserat ramverk kändes mer rimligt än att skriva allt i Vanilla JavaScript.

Jag använde React hooks (useState, useEffect) för state- och datahantering, Fetch API för API-anrop och JSON Server för att simulera ett REST-API utan att behöva bygga en egen backend. Jag valde att inte lägga till fler externa bibliotek eftersom projektets omfattning inte krävde det.

Strukturen delades upp i separata komponenter för att varje del skulle ha ett tydligt ansvar: App för övergripande struktur, Cinema för biografvyn, SeatGrid för säteslogik, BookingForm för formulär och Admin med separata CRUD-komponenter. Denna uppdelning gjorde felsökning enklare och koden mer överskådlig.

Slutreflektion

Projektet började som en relativt enkel seat-booking-lösning men utvecklades till en mer strukturerad React-applikation med API-integration och Admin-panel. I början låg fokus främst på att få funktionaliteten att fungera. Mot slutet märkte jag att jag i större utsträckning tänkte på struktur, ansvarsfördelning och dataflöde.

Admin-delen utvecklade mig mest, särskilt kring hur state och backend måste synkroniseras korrekt för att gränssnittet ska uppdateras utan refresh. Sammantaget upplever jag att projektet har gett mig en bättre förståelse för hur en mindre frontend-applikation byggs upp på ett mer hållbart sätt.
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