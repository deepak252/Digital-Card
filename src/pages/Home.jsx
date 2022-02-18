import React from 'react';
import DigitalCard from '../components/DigitalCard';
import "./Home.scss";
import {useEffect, useState} from "react";
import { signOutUser, getUserData } from '../services/firebaseAuthService';
import {useAuthState} from "react-firebase-hooks/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router';
import { Grid } from 'react-loader-spinner';

const Home = () => {
    const [userInfo, setUserInfo] = useState({});
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [user,fetchingUser, error] = useAuthState(auth);

    useEffect(async () => {
        setLoading(true);
        console.log("Current user = ",user);
        console.log("Loading = ", fetchingUser);
        if (fetchingUser) return;
        if (!user){
            console.log("User not signed in");
            return navigate("/signin");
        }
        const userData = await getUserData(user.uid);
        setUserInfo(userData);
        setLoading(false);

    }, [user, fetchingUser]);
    return (
        <div id="Home">
            {
                isLoading
                ? <Grid 
                    
                    heigth="100"
                    width="100"
                    color='var(--Color1)'
                    ariaLabel='loading'
                />
                : <div>
                    <DigitalCard userInfo = {userInfo}/>
                    <button onClick={async()=>{await signOutUser()}} className="Btn-Sign-Out">SIGN OUT</button>
                </div>
            }
            
        </div>
    )
}

export default Home
