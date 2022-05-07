import { auth } from "../firebase";
import { db } from "../firebase";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut,sendPasswordResetEmail} from "firebase/auth";
import {doc,setDoc,getDoc} from "firebase/firestore";


const signInUsingEmailPassword = async (email,password) =>{
    try{
        await signInWithEmailAndPassword(auth,email,password);
        console.log("Signed in successfully");
    }catch(e){
        console.log(e);
        alert(e.message);
    }
}

const resetPasswordUsingEmail = async (email) => {
    try {
        await sendPasswordResetEmail(auth,email);

        console.log("Password reset link sent to email");
        alert("Password reset link sent to "+email);

    } catch (e) {
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
        
        // Add user data to firestore "users" collection
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
// Get User Data from Firebase Firestore
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
    resetPasswordUsingEmail,
    signOutUser,
    getUserData
};


