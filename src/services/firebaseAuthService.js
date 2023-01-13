import { auth } from "../firebase";
import { db } from "../firebase";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut,sendPasswordResetEmail,sendEmailVerification} from "firebase/auth";
import {doc,setDoc,getDoc} from "firebase/firestore";


const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: `${window.location.origin}/signin`,
    // This must be true.
    handleCodeInApp: true,
   
};
  

const signInUsingEmailPassword = async (email,password) =>{
    try{
        
        await signInWithEmailAndPassword(auth,email,password);
        console.log("Signed in successfully");
    }catch(e){
        console.log("signInUsingEmailPassword error ", e);
        alert(emailAuthException(e.code));
    }
}


const signUpUsingEmailPassword = async (data) =>{
    try{
        const {password,confirmPassword, ...userData} = data;
        console.log({...userData});
        const userCreds = await createUserWithEmailAndPassword(auth,data.email,password);
        
        console.log("Account created successfully...");
        
        // Add user data to firestore "users" collection
        let user = userCreds.user;
        const userDocRef = doc(db,"users",user.uid);
        await setDoc(userDocRef,{
            uid: user.uid,
            ...userData

        },{merge: true});
        console.log("Userdata added to firestore");

    }catch(e){
        console.log("signUpUsingEmailPassword error ", e.message);
        alert(emailAuthException(e.code));
    }
}


const resetPasswordUsingEmail = async (email) => {
    try {
        await sendPasswordResetEmail(auth,email);

        console.log("Password reset link sent to email");
        alert("Password reset link sent to "+email);

    } catch (e) {
        console.log("resetPasswordUsingEmail error ", e.message);
        alert(emailAuthException(e.code));
    }
}

const sendEmailVerificationLink = (user)=>{
    sendEmailVerification(user,actionCodeSettings);

}

const signOutUser = async () =>{
    try{
        await signOut(auth);
    }catch(e){
        console.log("signOutUser error ", e.message);
        alert(emailAuthException(e.code));
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


const  emailAuthException = (code) =>{
    switch (code) {
        case 'auth/user-not-found':
            return 'User does not exist with this email';
        case 'auth/wrong-password':
            return 'Invalid e-mail/password';
        case 'auth/invalid-email':
            return 'Enter a valid e-mail';
        case 'auth/email-already-in-use':
            return 'User already exist with this email';
        case 'auth/weak-password':
            return 'Password entered is too weak.';
        case 'auth/too-many-requests':
            return 'Requests are blocked from this device due to unusual activity. Try again after some time';

        default:
            return 'Something went wrong';
    }
}

export {
    signInUsingEmailPassword, 
    signUpUsingEmailPassword, 
    resetPasswordUsingEmail,
    sendEmailVerificationLink,
    signOutUser,
    getUserData
};

// let otp = prompt("Enter OTP sent to phone number");
        // while(otp!=null){
        //     if(otp.trim().length!==4 || !(/\d/.test(otp))){
        //         alert("Invalid OTP")
        //         otp = prompt("Enter OTP sent to phone number");
        //     }else{

        //     }
        // }
