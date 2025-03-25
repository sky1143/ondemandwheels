
import React, { createContext, useEffect } from 'react'
import { io } from 'socket.io-client'


export const SocketContext = createContext(null);

const socket = io(`${import.meta.env.VITE_BASE_URL}`)


const SocketProvider = ({ children }) => {
    useEffect(() => {
        socket.on('connect', () => {    
            console.log('Connected to server');

            const userId = localStorage.getItem("userId");
            const userType = 'user';

            if(userId) {
                console.log(` Sending join event : userId= ${userId}, userType= ${userType  }`);
                socket.emit("join", {userId, userType})
            } else {
                console.log("User Id is missing in localStorage")
            }

        });

        socket.on('disconnect', () => {
            console.log('Disconnect from server');
        });

    }, []);

    const sendMessage = (eventName, message) => {

        console.log(`Sending message: ${message} to ${eventName}`)
        socket.emit(eventName, message);
    }

    const recieveMessage = (eventName, callback) => {
        socket.on(eventName, callback);
    }

    return (
        <SocketContext.Provider value={{
            sendMessage,
            recieveMessage
        }}>
            {children}
        </SocketContext.Provider>
    )

}


export default SocketProvider;