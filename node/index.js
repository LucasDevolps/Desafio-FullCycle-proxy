const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const config = {
  host: 'mysql',
  user: 'root',
  password: 'root',
  database: 'fullcycle'
};

const connection = mysql.createConnection(config);

// Criação da tabela 'people' se não existir
connection.query(`CREATE TABLE IF NOT EXISTS people (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY(id))`);

app.get('/', (req, res) => {
  const name = `Nome-${Math.floor(Math.random() * 1000)}`;
  connection.query(`INSERT INTO people(name) VALUES('${name}')`);

  connection.query('SELECT name FROM people', (err, result) => {
    if (err) throw err;

    let names = result.map(row => `<li>${row.name}</li>`).join('');
    res.send(`<h1>Full Cycle Rocks!</h1><ul>${names}</ul>`);
  });
});

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`);
});
