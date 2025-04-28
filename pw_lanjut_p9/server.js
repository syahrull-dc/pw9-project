const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Koneksi database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',   
  database: 'db_mahasiswa'
});

db.connect(err => {
  if (err) throw err;
  console.log('Terhubung ke database');
});

app.post('/submit', (req, res) => {
  const { nama, prodi } = req.body;
  const sql = 'INSERT INTO mahasiswa (nama, prodi) VALUES (?, ?)';
  db.query(sql, [nama, prodi], (err, result) => {
    if (err) throw err;
    res.json({ message: `Halo ${nama}, prodi kamu adalah ${prodi}.` });
  });
});

app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});
