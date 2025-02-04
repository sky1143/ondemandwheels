const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

// Debugging logs to check if environment variables are loaded correctly
// console.log("DB_USER:", process.env.DB_USER);
// console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "Loaded" : "NOT LOADED");
// console.log("DB_NAME:", process.env.DB_NAME);
// console.log("DB_HOST:", process.env.DB_HOST);
// console.log("DB_PORT:", process.env.DB_PORT);

const sequelize = new Sequelize(
    process.env.DB_NAME,  // Database name
    process.env.DB_USER,  // Username
    process.env.DB_PASSWORD,  // Password
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        logging: false,
    }
);

sequelize.authenticate()
    .then(() => console.log('Postgres connected'))
    .catch(err => console.error('Postgres connection error:', err));

module.exports = sequelize;
