const miasta = {
    Polska: ["Warszawa", "Kraków", "Gdańsk"],
    Niemcy: ["Berlin", "Monachium", "Hamburg"],
    Francja: ["Paryż", "Lyon", "Marsylia"]
  };
  
  const selectKraj = document.getElementById("kraj");
  const selectMiasto = document.getElementById("miasto");
  const wynikPogody = document.getElementById("wynik-pogody");
  
  Object.keys(miasta).forEach(kraj => {
    const opcja = document.createElement("option");
    opcja.value = kraj;
    opcja.textContent = kraj;
    selectKraj.appendChild(opcja);
  });
  
  function aktualizujMiasta() {
    const wybranyKraj = selectKraj.value;
    selectMiasto.innerHTML = "";
    miasta[wybranyKraj].forEach(miasto => {
      const opcja = document.createElement("option");
      opcja.value = miasto;
      opcja.textContent = miasto;
      selectMiasto.appendChild(opcja);
    });
  }
  
  async function pobierzPogode() {
    const kraj = selectKraj.value;
    const miasto = selectMiasto.value;
  
    const odpowiedz = await fetch("/api/pogoda", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kraj, miasto })
    });
  
    const dane = await odpowiedz.json();
  
    if (dane.main) {
      wynikPogody.innerHTML = `
        <h3>${miasto}, ${kraj}</h3>
        <p>Temperatura: ${dane.main.temp}°C</p>
        <p>Opis: ${dane.weather[0].description}</p>
        <p>Wilgotność: ${dane.main.humidity}%</p>
        <p>Wiatr: ${dane.wind.speed} m/s</p>
      `;
    } else {
      wynikPogody.textContent = "Nie udało się pobrać danych pogodowych.";
    }
  }
  
  aktualizujMiasta();
  