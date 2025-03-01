import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useUserStore from '../store/useUserStore';

export const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useUserStore();
    useEffect(() => {
        if(!isAuthenticated){
            navigate('/');
        }
    }, [isAuthenticated, navigate]);
    
    if(!isAuthenticated){
        return null
    }
    return (
        <>{children}</>
    )
}
