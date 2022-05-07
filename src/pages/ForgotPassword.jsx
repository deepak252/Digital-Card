import React,{useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import "./ForgotPassword.scss";
import {useAuthState} from "react-firebase-hooks/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router';
import { resetPasswordUsingEmail } from '../services/firebaseAuthService';
import ProgressIndicator from '../components/ProgressIndicator';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const {register, handleSubmit, formState:{errors}} = useForm();
    const [user,loadingAuthState, error] = useAuthState(auth);
    const [isLoading, setLoading] = useState(false);
    const onSubmit = async (data) =>{        
        setLoading(true);
        await resetPasswordUsingEmail(data.email);
        setLoading(false);
        
    }
    
    useEffect(() => {
        setLoading(true);
        // console.log("Current user = ",user);
        console.log("Loading = ", loadingAuthState);
        if (loadingAuthState) return;
        // If user signed in, navigate to HOME page
        if (user){
            console.log("User is signed in");
            return navigate("/");
        }
        setLoading(false);
    }, [user, loadingAuthState]);


    return ( <>
        {
            isLoading
            ? <ProgressIndicator type={2}/>
            : <div id = "Forgot-Password">
                <form noValidate className="Form" onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="MT0">Forgot Password</h2>
                    {/* EMAIL */}
                    <div className="Field">
                        <input 
                            type="email" 
                            placeholder="Enter e-mail*"
                            {
                                ...register("email",{
                                    required : true,
                                    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                })
                            }
                            
                        />
                        {errors.email && errors.email.type==="required" && <span className="Error">Email can't be empty</span>}
                        {errors.email && errors.email.type==="pattern" && <span className="Error">Invalid email</span>}
                    
                    </div>
                
                    <input className="Btn-Submit" type="submit" value="Continue" />
                    <Link className="Btn-Submit" to="/signin">Back to Sign In</Link>
                </form>
            </div>
        }
    </>)
}

export default ForgotPassword;

