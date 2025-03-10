const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const sequelize = require('./db/db');
const userRoutes = require('./routes/user.routes')
const captainRoutes = require('./routes/captain.routes');
const mapRoutes = require('./routes/maps.routes')



app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

//sync database before starting the server
sequelize.sync()
      .then(() =>console.log("Database synced"))
      .catch(err => console.error("Database sync error",err));


app.get("/", (req,res) => {
    res.send('hello world');
});

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps',mapRoutes)


module.exports = app;

