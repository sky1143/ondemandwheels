import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/userContext';
import axios from 'axios';

const UserProtectWrapper = ({ children }) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserDataContext)
    const [isloading, setIsloading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate('/login')
            return;
        }
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });


                if (response.status === 200) {
                    setUser(response.data.user)
                    setIsloading(false)
                }
            } catch (error) {
                localStorage.removeItem('token');
                navigate('/login');

            }
        };
        fetchUserProfile();
    }, [token])

    if (isloading) {
        return (
            <div>
                Loading...
            </div>

        )
    }

    return (
        <>
            {children}
        </>

    )
}

export default UserProtectWrapper
