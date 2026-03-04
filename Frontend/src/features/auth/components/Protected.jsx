import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router';
import Login from '../pages/Login';

const Protected = ({children}) => {
    const {user, loading} = useAuth();
    if(!user){
       return <Navigate to="/login" />
    }

    if(loading){
        return <h1>Loading.....</h1>
    }

  return children
}

export default Protected