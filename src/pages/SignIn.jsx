import React,{useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import "./SignIn.scss";
import {useAuthState} from "react-firebase-hooks/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router';
import { signInUsingEmailPassword ,sendEmailVerificationLink} from '../services/firebaseAuthService';
import { Link } from 'react-router-dom';
import ProgressIndicator from '../components/ProgressIndicator';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const SignIn = () => {
    const navigate = useNavigate();
    const {register, handleSubmit, formState:{errors}} = useForm();
    const [user,loadingAuthState, error] = useAuthState(auth);
    const [isLoading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const onSubmit = async (data) =>{        
        setLoading(true);
        await signInUsingEmailPassword(data.email,data.password);
        setLoading(false);
        
        
    }
    const togglePasswordVisility = () => {
        setPasswordVisible(!passwordVisible);
    }
    
    useEffect(() => {
        setLoading(true);
        
        document.title = "Signin - Digital Visiting Card"
        
        
        // console.log("Current user = ",user);
        if (loadingAuthState) return;
        // If user signed in, navigate to HOME page
        if (user){
            if(!user.emailVerified){
                sendEmailVerificationLink(user)
                alert(`Email verification link sent to ${user.email}`)
            }else{
                console.log("Email verified");
                return navigate("/");
            }
            // return navigate("/");
        }
        setLoading(false);
    }, [user, loadingAuthState]);


    return ( <>
        {
            isLoading
            ? <ProgressIndicator type={2}/>
            : <div id = "Sign-In">
                <form noValidate className="Form" onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="MT0">Log In</h2>
                    {/* EMAIL */}
                    <div className="Field">
                        <input 
                            type="email" 
                            placeholder="E-mail*"
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

                
                    {/* PASSWORD */}
                    <div className="Field">
                        <div className="Input-Password">
                            <input 
                                type= {passwordVisible ? "text":"password" }
                                placeholder="Enter password"
                                {
                                    ...register("password",{
                                        required : true,
                                    })
                                }
                            />
                            <span className="Visibiliy-Icon" onClick={togglePasswordVisility}>
                                {
                                    passwordVisible
                                    ? <FaEyeSlash size="20" color='grey'/>
                                    : <FaEye size="20" color='grey'/>

                                }
                            </span>
                        </div>
                        {errors.password && errors.password.type==="required" && <span className="Error">Password can't be empty</span>}
                    </div>
                    
                        <Link id="forgot-password" to="/forgot-password">Forgot Password?</Link>

                    <div id="recaptcha-container"></div>
                    <input className="Btn-Submit" type="submit" value="Log In" />
                    <p style={{textAlign:"center"}}>
                        Don't have an account?<br/> <Link to="/signup">Create New Account</Link> now.
                    </p>
                </form>
            </div>
        }
    </>)
}

export default SignIn;

