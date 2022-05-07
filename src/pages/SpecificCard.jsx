import React from 'react';
import DigitalCard from '../components/DigitalCard';
import "./SpecificCard.scss";
import { useEffect, useState } from "react";
import {  getUserData } from '../services/firebaseAuthService';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router';
import ProgressIndicator from '../components/ProgressIndicator';
import { useParams } from 'react-router-dom';

import { db } from '../firebase';
import { doc,collection } from "firebase/firestore";

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
        findUser();
        setLoading(true);
        // console.log("Current user = ",user);
        // if user not signed in, naviagate to SIGNIN page
        if (loadingAuthState) return;
        if (!user) {
            console.log("User not signed in");
            return navigate("/signin");
        }
        const userData = await getUserData(user.uid);
        setUserInfo(userData);
        setLoading(false);

    }, [user, loadingAuthState]);
    return (
        <div id="Specific-Card">
            {
                isLoading
                    ? <ProgressIndicator />
                    : <div>
                        {/* Digital Card Component */}
                        <DigitalCard userInfo={userInfo} />
                    </div>
            }

        </div>
    )
}

export default SpecificCard
