import "./UploadImage.scss";
import React,{useState} from 'react'
import {  FaImage, FaUpload } from 'react-icons/fa';
import {ref,uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { storage } from "../firebase";
import { db } from "../firebase";
import {doc,updateDoc} from "firebase/firestore";

const UploadImage = ({userInfo}) => {
    const [imgFile, setImgFile] = useState(null);

    const pickImage =async () =>{
        document.getElementById("Input-Add-Image").click()
    }

    const addImage = (event)=>{
        if (event.target.files && event.target.files[0]) {
            setImgFile(event.target.files[0]);
            console.log("imgFile", imgFile)
            
        }
    }
    
    const uploadImage = async()=>{
        if(imgFile!=null){
            // const ext = imgFile.name.split(".").pop();
            const storageRef = ref(storage, 'images/'+userInfo.uid+'.png');

            const metadata = {
                contentType: 'image/jpeg'
            };
            
            const uploadTask = uploadBytesResumable(storageRef, imgFile, metadata);

            uploadTask.on('state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default: break;
                    }
                }, 
                (error) => {
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            break;
                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                        default: break;
                    }
                }, 
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        console.log('File available at', downloadURL);
                        const userDocRef = doc(db,"users",userInfo.uid);
                        await updateDoc(userDocRef,{
                            imgUrl : downloadURL
                        },{merge: true});
                        window.location.reload();
                    });

                });
        }
    }

    return (
        <div id = "Add-Image-Container">
            <input onChange={addImage} placeholder="sdf" type="file" name="profileImg" id="Input-Add-Image" accept="image/*"/>
            <button onClick={pickImage} id="Btn-Add-Image" > 
                {   imgFile 
                    ? "SELECT ANOTHER" 
                    : userInfo.imgUrl===null || userInfo.imgUrl===undefined||userInfo.imgUrl===''
                        ? "ADD"
                        : "UPDATE"
                } IMAGE <FaImage size = "25" style = {{marginLeft: "10px"}}/>
            </button> 
            {
                imgFile && <button onClick={uploadImage} id="Btn-Upload-Image" >
                    UPLOAD SELECTED IMAGE 
                    <FaUpload size = "25" style = {{marginLeft: "10px"}}/>  
                </button> 
            }
            {
                imgFile && <p>Selected Image : {imgFile.name}</p>
            }
        </div>
    )
}

export default UploadImage;
