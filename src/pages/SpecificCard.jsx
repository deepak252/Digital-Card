import React from 'react';
import DigitalCard from '../components/DigitalCard';
import "./SpecificCard.scss";
import { useEffect, useState } from "react";
import {  getUserData,signOutUser } from '../services/firebaseAuthService';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router';
import ProgressIndicator from '../components/ProgressIndicator';
import { useParams } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import UploadImage from '../components/UploadImage';
import {  FaShare,FaWhatsapp,FaEnvelopeOpen,  } from 'react-icons/fa';


const SpecificCard = () => {
    const [userInfo, setUserInfo] = useState({});
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [user, loadingAuthState, error] = useAuthState(auth);

    const params = useParams();
    const userId = params.userId;

    const findUser = async ()=>{
        const userData = await getUserData(userId);
        console.log("UID Data : ",userData);

    }

    useEffect(async () => {
        // findUser();
        setLoading(true);
        // console.log("Current user = ",user);
        // if user not signed in, naviagate to SIGNIN page
        if (loadingAuthState) return;
        
        // if (!user) {
        //     console.log("User not signed in");
        //     return navigate("/signin");
        // }
        const userData = await getUserData(userId);
        if(userData==undefined){
            return navigate("/404");
        }else{
            setUserInfo(userData);
            setLoading(false);
        }

    }, [user, loadingAuthState]);
    return (
        <div id="Specific-Card">
            {
                isLoading
                    ? <ProgressIndicator />
                    : user != null && user.uid === userId 
                        ? <div>
                                {/* Digital Card Component */}
                                <DigitalCard userInfo={userInfo} />
                                {/* Sign Out Button */}
                                <button onClick={async () => { await signOutUser(); return navigate("/"); }} id="Btn-Sign-Out" >SIGN OUT <FaSignOutAlt size="25" style={{ marginLeft: "10px" }} /></button>
                                {/* Upload Image Button Component */}
                                <UploadImage userInfo={userInfo} />
                            </div>
                        : <div>
                            {/* Digital Card Component */}
                            <DigitalCard userInfo={userInfo} />
                        </div>
            }
            {/* <FaWhatsapp className="icon" /> */}


        </div>
    )
}

export default SpecificCard
