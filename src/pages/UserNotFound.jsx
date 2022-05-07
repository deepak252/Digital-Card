import React from 'react';
import "./UserNotFound.scss";
import { useNavigate } from 'react-router';

const UserNotFound = () => {
    const navigate = useNavigate();
    
    const handleBackHome=()=>{
        return navigate("/");
    }

    return ( <>
            <div id = "Forgot-Password">
                <h1>Error 404</h1>
                <h3>Data not found</h3>
                <button id="Btn-Back-Home" onClick={handleBackHome}>
                    BACK TO HOME
                </button>
            </div>
    </>)
}

export default UserNotFound;

