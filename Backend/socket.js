const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: "*",
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log(`✅ Client connected: ${socket.id}`);

        socket.on('join', async (data) => {
            console.log("🔄 Received join event from frontend:", data);

            if (!data || !data.userId || !data.userType) {
                console.log("⚠️ Invalid data received in 'join' event:", data);
                return;
            }

            const { userId, userType } = data;

            console.log(`✅ User ${userId} joined as ${userType}`);
            console.log(`💾 Storing Socket ID: ${socket.id}`);

            try {
                let result;

                if (userType === 'user') {
                    const user = await userModel.findByPk(userId);
                    console.log(`🟢 Updating socket ID for User ${userId}`);
                    if (!user) {
                        console.log(`🚫 User with ID ${userId} not found`);
                        return;
                    }

                    result = await userModel.update(
                        { socketId: socket.id },
                        { where: { id: userId } }
                    );
                } else if (userType === 'captain') {
                    console.log(`🔵 Updating socket ID for Captain ${userId}`);
                    const captain = await captainModel.findByPk(userId);
                    if (!captain) {
                        console.log(`🚫 Captain with ID ${userId} not found`);
                        return;
                    }

                    result = await captainModel.update(
                        { socketId: socket.id },
                        { where: { id: userId } }
                    );
                }

                if (result[0] === 0) {
                    console.log(`⚠️ No rows updated for ${userType} with ID ${userId}`);
                } else {
                    console.log(`✅ Socket ID updated for ${userType} with ID ${userId}`);
                }

            } catch (error) {
                console.error('❌ Error updating socket ID:', error);
            }
        });

       

        // Handling Client Disconnection
        socket.on('disconnect', async () => {
            console.log(`❌ Client disconnected: ${socket.id}`);

            try {
                await userModel.update({ socketId: null },
                    { where: { socketId: socket.id } }
                );
                await captainModel.update({ socketId: null },
                    { where: { socketId: socket.id } }
                );

                console.log('🗑️ Socket ID cleared for disconnected user/captain');
            } catch (error) {
                console.error('❌ Error clearing socket ID:', error);
            }
        });
    });
}



function sendMessageToSocketId(socketId, message) {
    if (io) {
        io.to(socketId).emit('message', message);
    } else {
        console.log('Socket is not initialized.');
    }
}


module.exports = { initializeSocket, sendMessageToSocketId };




