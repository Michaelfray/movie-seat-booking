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
