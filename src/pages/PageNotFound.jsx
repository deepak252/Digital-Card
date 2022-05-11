import React from 'react';
import "./PageNotFound.scss";
import { useNavigate } from 'react-router';

const PageNotFound = () => {
    const navigate = useNavigate();
    
    const handleBackHome=()=>{
        return navigate("/");
    }

    return ( <>
            <div id = "Page-Not-Found">
                <h1>Error 404</h1>
                <h3>Page not found</h3>
                <button id="Btn-Back-Home" onClick={handleBackHome}>
                    BACK TO HOME
                </button>
            </div>
    </>)
}

export default PageNotFound;

