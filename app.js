// const express = require('express');
// const fs = require('fs');
// const { Pool } = require('pg');
import express from 'express';
import fs from 'fs';
import pkg from 'pg';
const { Pool } = pkg;
  
const app = express();
app.use(express.static('./'));
const PORT = 3000;

const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'galaxy_atlas',
  password: 'password',
  port: '5432',
});

// ROUTES ----------------------------------------------------------------------
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/planets', async (req, res) => {
  try {
    const queryResult = await pool.query('SELECT * FROM planets');

    const planets = queryResult.rows;
    let planetsHTML = '';

    planets.forEach(planet => {
      // console.log(planet);
      planetsHTML += `
      <hr class="thick-hr">
      <div class="mx-4 my-2">
        <h2>Planet ${planet.name}</h2>
        <img class="my-2" src="images/planets/${planet.image}" alt="">
        <h6>${planet.description}</h6>
        <p>Atmosphere: ${planet.atmosphere}</p>
        <p>Average Temperature: ${planet.average_temp} degrees celcius</p>
        <p>Mass: ${planet.mass} x Earth Mass</p>
        <p>Moons: ${planet.moons}</p>
        <p>Distance: ${planet.distance_from_star}</p>
        <p>Flora: none</p>
        <p>Fauna: none</p>
      </div>
      
      <hr class="thick-hr">
      `;
    });
    console.log(planetsHTML);

    // Read the content of paintings.html and append episodeHTML
    // fs.readFile(__dirname + '/base.html', 'utf8', (err, data) => {
    //   if (err) {
    //     console.error('Error reading file', err);
    //     res.status(500).send('read file Internal Server Error');
    //     return;
    //   }

    //   const modifiedHTML = data.replace('</body>', episodeHTML + '</body>');
    //   res.send(modifiedHTML);
    // });
  } catch(error) {
    res.status(500).send('wawuoeeua Internal Server Error');
  }
});
// END ROUTES ----------------------------------------------------------------------

app.listen(PORT, (error) =>{ 
  if(!error) 
    console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
  else 
    console.log("Error occurred, server can't start", error); 
  }
);