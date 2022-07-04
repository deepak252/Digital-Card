import React from 'react';
import DigitalCard from '../components/DigitalCard';
import "./Home.scss";
import {useEffect, useState} from "react";
import { signOutUser, getUserData } from '../services/firebaseAuthService';
import {useAuthState} from "react-firebase-hooks/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router';
import ProgressIndicator from '../components/ProgressIndicator';
import { FaSignOutAlt } from 'react-icons/fa';
import UploadImage from '../components/UploadImage';

const Home = () => {
    const [userInfo, setUserInfo] = useState({});
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [user,loadingAuthState, error] = useAuthState(auth);
    

    useEffect(async () => {
        setLoading(true);
        // console.log("Current user = ",user);
        // if user not signed in, naviagate to SIGNIN page
        if (loadingAuthState) return;
        if (!user){
            console.log("User not signed in");
            return navigate("/signin");
        }else{
            //Navigate to specific card page
            return navigate(`/${user.uid}`);
        }
        // const userData = await getUserData(user.uid);
        // setUserInfo(userData);
        // setLoading(false);

    }, [user, loadingAuthState]);
    return (
        <div id="Home">
            {
                isLoading
                ? <ProgressIndicator />
                : <div>
                    {/* Digital Card Component */}
                    <DigitalCard userInfo = {userInfo}/>
                    {/* Sign Out Button */}
                    <button onClick={async()=>{await signOutUser()}} id="Btn-Sign-Out" >SIGN OUT <FaSignOutAlt size = "25" style = {{marginLeft: "10px"}}/></button>
                    {/* Upload Image Button Component */}
                    <UploadImage  userInfo = {userInfo}/>
                    
                </div>
            }
            
        </div>
    )
}

export default Home
