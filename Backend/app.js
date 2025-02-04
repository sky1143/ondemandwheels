const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require('./db/db');
const userRoutes = require('./routes/user.routes')



app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true}));

//sync database before starting the server
sequelize.sync()
      .then(() =>console.log("Database synced"))
      .catch(err => console.error("Database sync error",err));


app.get("/", (req,res) => {
    res.send('hello world');
});

app.use('/users', userRoutes);

module.exports = app;

