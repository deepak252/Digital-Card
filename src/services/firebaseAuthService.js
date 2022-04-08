import { auth } from "../firebase";
import { db } from "../firebase";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from "firebase/auth";
import {doc,setDoc,getDoc} from "firebase/firestore";


const signInUsingEmailPassword = async (email,password) =>{
    try{
        const res = await signInWithEmailAndPassword(auth,email,password);
        console.log("Signed in successfully");
    }catch(e){
        console.log(e);
        alert(e.message);
    }
}

const signUpUsingEmailPassword = async (data) =>{
    try{
        const {password,confirmPassword, ...userData} = data;
        console.log({...userData});
        const res = await createUserWithEmailAndPassword(auth,data.email,password);
        console.log("Account created successfully...");
        // Adding user data to firestore USERS collection
        let user = res.user;
        const userDocRef = doc(db,"users",user.uid);
        await setDoc(userDocRef,{
            uid: user.uid,
            ...userData

        },{merge: true});
        console.log("Userdata added to firestore");

    }catch(e){
        console.log(e);
        alert(e.message);
    }
}

const signOutUser = async () =>{
    try{
        await signOut(auth);
    }catch(e){
        console.log(e);
        alert(e.message);
    }
}

const getUserData = async (userId) =>{
    try{
        const userDocRef = doc(db,"users",userId);
        const docSnapshot =await getDoc(userDocRef);
        if(!docSnapshot.exists){
            console.log("User data not found!")
            alert("ERROR : User data not found!");
            return null;
        }

        return docSnapshot.data();

    }catch(e){
        console.log(e);
        alert(e.message);
    }
}


export {
    signInUsingEmailPassword, 
    signUpUsingEmailPassword, 
    signOutUser,
    getUserData
};


