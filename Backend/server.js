require('dotenv').config();

if (!process.env.PORT) {
    console.error("⚠️  ERROR: PORT is not loaded from .env file");
}

const { initializeSocket } = require('./socket');

const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;

console.log(`Using port: ${port}`); // Debugging

const server = http.createServer(app);

initializeSocket(server);
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




