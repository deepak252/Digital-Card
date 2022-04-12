import React,{useState,useEffect} from 'react';
import { useForm } from 'react-hook-form';
import "./SignUp.scss";
// import FirebaseAuthService from '../services/FirebaseAuthService';
import {useAuthState} from "react-firebase-hooks/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router';
import { signUpUsingEmailPassword } from '../services/firebaseAuthService';
import { Link } from 'react-router-dom';
import ProgressIndicator from '../components/ProgressIndicator';

const SignUp = () => {
    const navigate = useNavigate();
    const {register, handleSubmit, watch, formState:{errors}} = useForm();
    const [user,loadingAuthState, error] = useAuthState(auth);
    const [isLoading, setLoading] = useState(false);


    const onSubmit = async (data) =>{
        setLoading(true);        
        await signUpUsingEmailPassword({
            ...data,
            firstName: data.firstName.trim(),
            lastName: data.lastName.trim(),
            businessName: data.businessName.trim(),
            website: data.website.trim(),
            about: data.about.trim(),
            address: data.address.trim(),
        })
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


    return (<>
        {
            isLoading
            ? <ProgressIndicator type={2}/>
            : <div id = "Sign-Up">
                <form noValidate className="Form" onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="MT0">Create New Account</h2>
                    {/* FIRST NAME */}
                    <div className="Field">
                        <input 
                            type="text" 
                            placeholder="First Name*"
                            {
                                ...register("firstName",{
                                    required : true,
                                    pattern : /^[a-zA-Z ]{2,30}$/,
                                    validate : ()=>{
                                        if(watch("firstName").trim().length===0){
                                            return false;
                                        }
                                    }
                                })
                            }
                        />
                        {errors.firstName && errors.firstName.type==="required" && <span className="Error">First name can't be empty</span>}
                        {errors.firstName && errors.firstName.type==="validate" && <span className="Error">Invalid first name</span>}
                        {errors.firstName && errors.firstName.type==="pattern" && <span className="Error">Invalid first name</span>}
                    
                    </div>

                    {/* LAST NAME */}
                    <div className="Field">
                        <input 
                            type="text" 
                            placeholder="Last Name*"
                            {
                                ...register("lastName",{
                                    required : true,
                                    pattern : /^[a-zA-Z ]{2,30}$/,
                                    validate : ()=>{
                                        if(watch("lastName").trim().length===0){
                                            return false;
                                        }
                                    }
                                })
                            }
                        />
                        {errors.lastName && errors.lastName.type==="required" && <span className="Error">Last name can't be empty</span>}
                        {errors.lastName && errors.lastName.type==="validate" && <span className="Error">Invalid last name</span>}
                        {errors.lastName && errors.lastName.type==="pattern" && <span className="Error">Invalid last name</span>}
                    
                    </div>

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

                    {/* MOBILE NUMBER */}
                    <div className="Field">
                        <input 
                            type="number" 
                            placeholder="Mobile Number*"
                            {
                                ...register("mobile",{
                                    required : true,
                                    pattern : /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                                })
                            }
                        />
                        {errors.mobile && errors.mobile.type==="required" && <span className="Error">Mobile number is required</span>}
                        {errors.mobile && errors.mobile.type==="pattern" && <span className="Error">Invalid mobile number</span>}
                    
                    </div>

                    {/* BUSINESS NAME */}
                    <div className="Field">
                        <input 
                            type="text" 
                            placeholder="Business Name"
                            {
                                ...register("businessName",{
                                    pattern : /^[a-zA-Z ]{2,30}$/,
                                
                                })
                            }
                        />
                        {errors.businessName && errors.businessName.type==="pattern" && <span className="Error">Invalid business  name</span>}
                    
                    </div>

                    {/* Address */}
                    <div className="Field">
                        <input 
                            type="text" 
                            placeholder="Address"
                            {
                                ...register("address",{
                                
                                })
                            }
                        />
                    </div>

                    {/* PHONE NUMBER (LANDLINE)*/}
                    <div className="Field">
                        <input 
                            type="number" 
                            placeholder="Phone Number"
                            {
                                ...register("phone",{
                                    pattern : /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                                })
                            }
                        />
                        {errors.phone && errors.phone.type==="pattern" && <span className="Error">Invalid phone number</span>}
                    
                    </div>

                    {/* WEBSITE URL*/}
                    <div className="Field">
                        <input 
                            type="text" 
                            placeholder="Website"
                            {
                                ...register("website",{
                                    pattern : /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
                                })
                            }
                        />
                        {errors.website && errors.website.type==="pattern" && <span className="Error">Enter a valid url</span>}
                    
                    </div>

                    {/* ABOUT */}
                    <div className="Field">
                        <input 
                            type="text" 
                            placeholder="About"
                            {
                                ...register("about",{
                                    required : true,
                                })
                            }
                        />
                        {errors.about && errors.about.type==="required" && <span className="Error">This field is required</span>}
                    
                    </div>

                    {/* PASSWORD */}
                    <div className="Field">
                        <input 
                            type="password" 
                            placeholder="Password*"
                            {
                                ...register("password",{
                                    required : true,
                                    minLength: 6,
                                    validate : ()=>{
                                        if(watch("password").trim().length<6){
                                            return false;
                                        }
                                    }
                                })
                            }
                        />
                        {errors.password && errors.password.type==="required" && <span className="Error">Password can't be empty</span>}
                        {errors.password && errors.password.type==="validate" && <span className="Error">Password should not contain spaces</span>}
                        {errors.password && errors.password.type==="minLength" && <span className="Error">At least 6 characters required</span>}
                    </div>

                    {/* CONFIRM PASSWORD */}
                    <div className="Field">
                        <input 
                            type="password" 
                            placeholder="Confirm Password"
                            {
                                ...register("confirmPassword",{
                                    // required : true,
                                    validate:()=>{
                                        if(watch("password")!==watch("confirmPassword")){
                                            return false;                                        
                                        }
                                    }
                                })
                        
                            }
                            
                        />
                        {errors.confirmPassword && errors.confirmPassword.type==="validate" && <span className="Error">Password not match</span>}
                    </div>
                    <input className="Btn-Submit" type="submit" value="Create Account" />

                    <p style={{textAlign:"center"}}>
                        Already have an account?<br/>  <Link to="/signin">Log In</Link> now.
                    </p>
                </form>
            </div>
        }
    </>)
}

export default SignUp;

