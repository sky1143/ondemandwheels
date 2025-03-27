import React, { createContext, useEffect } from 'react'
import { io } from 'socket.io-client'

export const SocketContext = createContext(null);

const socket = io(`${import.meta.env.VITE_BASE_URL}`);

const SocketProvider = ({ children }) => {
    useEffect(() => {
        socket.on('connect', () => {    
            console.log('✅ Connected to server');

            const userId = localStorage.getItem("userId");
            const captainId = localStorage.getItem("captainId");

            console.log("captainId from localStorage:", captainId);
            if (userId) {
                console.log(`🟢 Sending join event for User: userId= ${userId}`);
                socket.emit("join", { userId, userType: "user" });
            } 

            if (captainId) {
                console.log(`🔵 Sending join event for Captain: captainId= ${captainId}`);
                socket.emit("join", { userId: captainId, userType: "captain" });  // ✅ CORRECT
            } 
            

            if (!userId && !captainId) {
                console.log("⚠️ No userId or captainId found in localStorage, skipping socket connection");
            }
        });

        socket.on('disconnect', () => {
            console.log('❌ Disconnected from server');
        });

    }, []);

    // const sendMessage = (eventName, message) => {
    //     console.log(`📩 Sending message: ${eventName}`, message);
    //     socket.emit(eventName, message);
    // }

    // const receiveMessage = (eventName, callback) => {
    //     socket.on(eventName, callback);
    // }

    return (
        <SocketContext.Provider value={{ socket  }}>
            {children}
        </SocketContext.Provider>
    );
}

export default SocketProvider;




// import React, { createContext, useEffect } from 'react';
// import { io } from 'socket.io-client';

// export const SocketContext = createContext(null);

// const socket = io(`${import.meta.env.VITE_BASE_URL}`);

// const SocketProvider = ({ children }) => {
//     useEffect(() => {
//         socket.on('connect', () => {    
//             console.log('✅ Connected to server');
//         });

//         socket.on('disconnect', () => {
//             console.log('❌ Disconnected from server');
//         });

       
//     }, []);

//     return (
//         <SocketContext.Provider value={{ socket }}>
//             {children}
//         </SocketContext.Provider>
//     );
// };

// export default SocketProvider;
