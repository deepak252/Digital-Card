/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from 'react';
import { useForm } from 'react-hook-form';
import "./EditProfile.scss";
import {useAuthState} from "react-firebase-hooks/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router';
import { getUserData, updateUserData } from '../services/firebaseAuthService';
import { Link } from 'react-router-dom';
import ProgressIndicator from '../components/ProgressIndicator';


const EditProfile = () => {
    const navigate = useNavigate();
    const {register, reset, handleSubmit, watch, formState:{errors}} = useForm();
    const [user,loadingAuthState] = useAuthState(auth);
    const [isLoading, setLoading] = useState(false);

    const onSubmit = async (data) =>{
        setLoading(true);    
        console.log(data); 
        const result = await updateUserData(user?.uid, data); 
        if(result){
            return navigate('/');
        }
        setLoading(false);        
    }

    useEffect(() => {
        loadUserData();
    }, [user, loadingAuthState]);

    const loadUserData = async ()=>{
        // findUser();
        setLoading(true); 
        // console.log("Current user = ",user);
        if (loadingAuthState) return;
        // If user signed in, navigate to HOME page
        if (!user){
            return navigate("/signin");
        }
        const userData = await getUserData(user.uid);
        if(!userData){
            return navigate("/404");
        }else{
            reset(userData);
        }
        setLoading(false);
    }

    return (<>
        {
            isLoading
            ? <ProgressIndicator type={2}/>
            : <div id = "Edit-Profile">
                <form noValidate className="Form" onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="MT0">Edit Profile</h2>
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
                                    },
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
                            disabled={true}

                            {
                                ...register("email",{
                                    required : true,
                                    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
                            placeholder="Contact Number*"
                            {
                                ...register("mobile",{
                                    required : true,
                                    pattern : /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                                })
                            }
                        />
                        {errors.mobile && errors.mobile.type==="required" && <span className="Error">Contact number is required</span>}
                        {errors.mobile && errors.mobile.type==="pattern" && <span className="Error">Invalid contact number</span>}
                    
                    </div>

                    {/* BUSINESS NAME */}
                    <div className="Field">
                        <input 
                            type="text" 
                            placeholder="Business Name*"
                            {
                                ...register("businessName",{
                                    required : true,
                                    pattern : /^[a-zA-Z ]{2,30}$/,
                                })
                            }
                        />
                        {errors.businessName && errors.businessName.type === "required" && <span className="Error">Business name is required</span>}
                        {errors.businessName && errors.businessName.type==="pattern" && <span className="Error">Invalid business  name</span>}
                    
                    </div>

                    {/* Address */}
                    <div className="Field">
                        <input 
                            type="text" 
                            placeholder="Address*"
                            {
                                ...register("address",{
                                    required:true,
                                })
                            }
                        />
                        {errors.address && errors.address.type === "required" && <span className="Error">Address is required</span>}
                    </div>

                    {/* WEBSITE URL*/}
                    <div className="Field">
                        <input 
                            type="text" 
                            placeholder="Website*"
                            {
                                ...register("website",{
                                    required: true,
                                    pattern : /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
                                })
                            }
                        />
                        {errors.website && errors.website.type === "required" && <span className="Error">Website url is required</span>}
                        {errors.website && errors.website.type==="pattern" && <span className="Error">Enter a valid url</span>}
                    
                    </div>

                    {/* ABOUT */}
                    <div className="Field">
                        <input 
                            type="text" 
                            placeholder="About*"
                            {
                                ...register("about",{
                                    required : true,
                                })
                            }
                        />
                        {errors.about && errors.about.type==="required" && <span className="Error">This field is required</span>}
                    
                    </div>
                    <input className="Btn-Submit" type="submit" value="Update" />

                    <p style={{textAlign:"center"}}>
                        Go back to  <Link to="/">Home</Link>
                    </p>
                </form>
            </div>
        }
    </>)
}

export default EditProfile;

