import React from 'react';
import DigitalCard from '../components/DigitalCard';
import "./Home.scss";
import {useEffect, useState} from "react";
import { signOutUser, getUserData } from '../services/firebaseAuthService';
import {useAuthState} from "react-firebase-hooks/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router';
import ProgressIndicator from '../components/ProgressIndicator';

const Home = () => {
    const [userInfo, setUserInfo] = useState({});
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [user,loadingAuthState, error] = useAuthState(auth);

    useEffect(async () => {
        setLoading(true);
        console.log("Current user = ",user);
        console.log("loadingAuthState = ", loadingAuthState);
        if (loadingAuthState) return;
        if (!user){
            console.log("User not signed in");
            return navigate("/signin");
        }
        const userData = await getUserData(user.uid);
        setUserInfo(userData);
        setLoading(false);

    }, [user, loadingAuthState]);
    return (
        <div id="Home">
            {
                isLoading
                ? <ProgressIndicator />
                : <div>
                    <DigitalCard userInfo = {userInfo}/>
                    <button onClick={async()=>{await signOutUser()}} className="Btn-Sign-Out">SIGN OUT</button>
                </div>
            }
            
        </div>
    )
}

export default Home
