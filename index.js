// index.js
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const port = 7000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(userRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection made successfully');
  })
  .catch((err) => console.error('Unable to connect to the database:', err));

app.listen(port, () => {
  console.log(`Server starts at http://localhost:${port}`);
});
