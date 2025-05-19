const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');
const aplikacja = express();
const port = process.env.PORT || 3000;

dotenv.config();

const autor = "Mikołaj Kosmala";
const dataStartu = new Date().toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw' });
console.log(`Autor: ${autor}`);
console.log(`Data uruchomienia: ${dataStartu}`);
console.log(`Aplikacja nasłuchuje na porcie: ${port}`);

aplikacja.use(express.static('public'));
aplikacja.use(express.json());

const kodyKrajow = {
  Polska: "PL",
  Niemcy: "DE",
  Francja: "FR"
};

aplikacja.post('/api/pogoda', async (req, res) => {
  const { kraj, miasto } = req.body;
  const kodKraju = kodyKrajow[kraj];
  const kluczApi = process.env.API;

  try {
    const odpowiedz = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${miasto},${kodKraju}&units=metric&appid=${kluczApi}`
    );
    res.json(odpowiedz.data);
  } catch (err) {
    res.status(500).json({ blad: 'Nie udało się pobrać danych pogodowych' });
  }
});

aplikacja.listen(port);
