import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router';


const Protected = ({children}) => {
    // const navigate = useNavigate();
    const {username, loading} = useAuth();

    if(loading){
        return <h1>Loading...</h1>
    }

    if(!username){
        return <Navigate to="/login" />
    }
  return children
}

export default Protected