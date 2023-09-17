/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import "./Home.scss";
import {useAuthState} from "react-firebase-hooks/auth";
import { auth } from '../firebase';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {  getUserData,signOutUser } from '../services/firebaseAuthService';
import ProgressIndicator from '../components/ProgressIndicator';
import { FaSignOutAlt } from 'react-icons/fa';
import UploadImage from '../components/UploadImage';
import {  FaWhatsapp, FaEdit  } from 'react-icons/fa';
import DigitalCard from '../components/DigitalCard';

const Home = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [user,loadingAuthState] = useAuthState(auth);

    
    const params = useParams();
    const userIdParam = params.userId?.trim();
    const isCurrUser = user && user.uid === userIdParam;

    useEffect( () => {
        loadUserData();
    }, [userIdParam, user, loadingAuthState]);

    const loadUserData = async ()=>{
        // findUser();
        setLoading(true);
        // if user not signed in, naviagate to SIGNIN page
        if (loadingAuthState) return;
        if(!userIdParam){
            if(!user){
                return navigate("/signin");
            }else{
                return navigate(`/${user.uid}`);
            }
        }
        const userData = await getUserData(userIdParam);
        if(!userData){
            return navigate("/404");
        }else{
            setUserInfo(userData);
        }
        setLoading(false);
    }

    const handleSignoutClick = async () =>{
        await signOutUser(); 
        return navigate("/signin"); 
    }

    return (
        <div id="Home">
            {
                isLoading
                    ? <ProgressIndicator />
                    : <>
                        <DigitalCard userInfo={userInfo} />
                        <div id="Action-Buttons">
                            <div id="Top-Right">
                                {isCurrUser && <>
                                    <button id="Btn-Sign-Out" onClick={handleSignoutClick}  >SIGN OUT <FaSignOutAlt size="25" style={{ marginLeft: "10px" }} /></button>
                                    <Link to="/edit" id="Edit" >
                                        <FaEdit size="45"/>
                                    </Link>
                                </>}
                            </div>
                            <div id="Bottom-Right">
                                <a id="Whatsapp" target='blank' href={`https://api.whatsapp.com/send?text=Hey,%20checkout%20my%20business%20card%20${window.location.href}`}>
                                    <FaWhatsapp size="55" color='green'/>
                                </a>
                                {isCurrUser && <UploadImage userInfo={userInfo} />}

                            </div>
                            
                        </div>
                    </>
            }

        </div>
    )
}

export default Home
