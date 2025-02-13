import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainProtectWrapper = ({ children }) => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { captain, setCaptain } = useContext(CaptainDataContext)
    const [isloading, setIsloading] = useState(true)

    useEffect(() => {
        if (!token) {
            navigate('/captain-login');
            return; // Prevent further execution
        }

        const fetchCaptainProfile = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    setCaptain(response.data.captain);
                    setIsloading(false)

                }
            } catch (error) {
                // console.error("Error fetching profile:", error);
                localStorage.removeItem('token');
                navigate('/captain-login');
            } 
        };

        fetchCaptainProfile();
    }, [token]); // Runs only once when `token` changes

    if (isloading) {
        return (
            <div> Loading... </div>
        )
    }
    return (
        <>
            {children}
        </>
    )
}

export default CaptainProtectWrapper;
