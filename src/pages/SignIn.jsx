import React,{useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import "./SignIn.scss";
import {useAuthState} from "react-firebase-hooks/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router';
import { signInUsingEmailPassword } from '../services/firebaseAuthService';
import { Link } from 'react-router-dom';
import ProgressIndicator from '../components/ProgressIndicator';

const SignIn = () => {
    const navigate = useNavigate();
    const {register, handleSubmit, formState:{errors}} = useForm();
    const [user,loadingAuthState, error] = useAuthState(auth);
    const [isLoading, setLoading] = useState(false);
    const onSubmit = async (data) =>{        
        setLoading(true);
        await signInUsingEmailPassword(data.email,data.password);
        setLoading(false);
        
        
    }
    
    useEffect(() => {
        setLoading(true);
        console.log("Current user = ",user);
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
                        <input 
                            type="password" 
                            placeholder="Enter password"
                            {
                                ...register("password",{
                                    required : true,
                                })
                            }
                        />
                        {errors.password && errors.password.type==="required" && <span className="Error">Password can't be empty</span>}
                    </div>

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

