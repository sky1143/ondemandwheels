const socketIo = require('socket.io')
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');
const { where } = require('sequelize');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: "*",
            methods: ['GET', 'POST']
        }
    });


    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on('join', async (data) => {
            console.log("received data from the frontend", data)

            if (!data || !data.userId || !data.userType) {
                console.log("invalid data received in 'join event", data);
                return;
            }

            const { userId, userType } = data;

            console.log(`User ${userId} joined as ${userType}`);
            console.log(`Socket ID: ${socket.id}`)

            //  Updating the User's Socket ID in the Database

            try {
                let result;

                if (userType === 'user') {
                    const user = await userModel.findByPk(userId);
                    if (!user) {
                        console.log(`User with ID${userId} not found`);
                        return
                    }


                    result = await userModel.update(
                        { socketId: socket.id },
                        { where: { id: userId } }
                    );
                } else if (userType === 'captain') {
                    const captain = await captainModel.findByPk(userId);
                    if (!captain) {
                        console.log(`Captaing with ID ${userId} not found`);
                        return;
                    }

                    result = await captainModel.update(
                        { socketId: socket.id },
                        { where: { id: userId } }
                    );
                }
                console.log("update Result", result);

                if (result[0] === 0) {
                    console.log(` No rows updated for ${userType} with ID ${userId}`)
                } else {
                    console.log(`Socket Id updated for ${userType} with ID ${userId}`)
                }

                // console.log(`socket ID updated for ${userType} with ID ${userId}`)
                // console.log(  `Id is  ${userId}:`)
            } catch (error) {
                console.error(' ❌ Error updating socket ID:', error);


            }

        });

        // Handling Client Disconnection

        socket.on('disconnect', async () => {
            console.log(`Client disconnected: ${socket.id}`);

            try {
                await userModel.update({ socketId: null },
                    { where: { socketId: socket.id } }
                );
                await captainModel.update({ socketId: null },
                    { where: { socketId: socket.id } }
                );

                console.log('Socket Id cleared for disconnected user')
            } catch (error) {
                console.error('Error clearing socket ID:', error);
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



// const socketIo = require('socket.io');
// const userModel = require('./models/user.model');
// const captainModel = require('./models/captain.model');

// let io;
// function initializeSocket (server) {

//     io = socketIo(server, {
//         cors: {
//             orgin : "*" ,
//             method : ["GET","PUT"]
//         }
//     })

//     io.on('connection' , (socket) =>  {
//         console.log(`Client is connected ${socket}`)

//         socket.on('join' , async (data) => {
//             console.log('Receieved data in the frontend',data)

//             if(!data || !data.userType || !data.userId) {
//                 console.log(`Socket id is not find`)
//             }
//         })
//     }) 



// }
 

// exports.module = { initializeSocket}


