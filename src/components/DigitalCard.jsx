import React,{useState} from 'react';
import "./DigitalCard.scss";
import QRCode from "qrcode.react";
import { FaImage, FaUserTie, FaPhoneAlt, FaEnvelopeOpen, FaMapMarkerAlt } from 'react-icons/fa';

const DigitalCard = ({ userInfo }) => {
  const [isRotated,updateRotated] = useState(false);

  const rotateCard=()=>{
    console.log("Rotate");
    updateRotated(!isRotated);

    if(!isRotated){
      document.getElementsByClassName('card')[0].style.transform = 'rotateY(180deg)'
    }else{
      document.getElementsByClassName('card')[0].style.transform = 'rotateY(0deg)';
    }
  }

  const handlePhoneClick =async(attempt)=>{
    if(attempt>2)
      return false;
    const body = {
      "uid": userInfo.uid,
      "firstName" : userInfo.firstName,
      "lastName": userInfo.lastName,
      "organisation": userInfo.businessName,
      "phone":userInfo.mobile,
      "workPhone":userInfo.mobile,
      "email":userInfo.email,
      "url":userInfo.url
    }

    return fetch("https://vcf-generator.herokuapp.com/vcf/generate-vcf", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })  // FETCH BLOB
      .then((response) => response.blob())
      .then((blob) => { // RETRIEVE THE BLOB AND CREATE LOCAL URL
        var _url = window.URL.createObjectURL(blob);
        window.open(_url, "_blank"); // window.open + focus
        return true;
      }).catch(async (err) => {
        attempt++;
        var retry = await handlePhoneClick(attempt);
        console.log("Attempt = ", attempt, retry);
        if(attempt===3 && retry===false){
          alert("Something went wrong! Try again later.");
        }
        console.log(err);
        return false;

      });

  }
  
  return (
    <div onDoubleClick={rotateCard}  className="card-wrapper">
      <div  className="card">
        <div className="card-front">
          <div className="left">
          {/* userInfo.about */}
              {
                userInfo.imgUrl===null || userInfo.imgUrl===undefined||userInfo.imgUrl===''
                ? <FaImage id = "Img-Profile" size = "50" color="#1187ac"/>
                : <img id = "Img-Profile" src={userInfo.imgUrl} alt="pic" />
              }
            <h3 id="business-name">{userInfo.businessName}</h3>
          </div>
          <div className="right">
            <div className="person right-content">
              <FaUserTie  className="icon" />
              <h4>{userInfo.firstName} {userInfo.lastName} sdf sdf </h4>
            </div>
            <div className="phone right-content">
              <FaPhoneAlt className="icon" />
              <p onClick={()=>handlePhoneClick(1)}>{userInfo.mobile}</p>
              {/* <a href={"tel:" + userInfo.mobile}>{userInfo.mobile}</a> */}
            </div>
            <div className="email right-content">
              <FaEnvelopeOpen className="icon" />
              <a href={"mailto:" +userInfo.email}>{userInfo.email}</a>
            </div>
            <div className="address right-content">
              <FaMapMarkerAlt className="icon" />
              <p>{userInfo.address}</p>
            </div>
          </div>
        </div>
        <div className="card-back">
          {/* <a href={'//' + userInfo.website} target="_blank">{userInfo.website}</a> <br /> */}
          {/* <QRCode id="qr-code" value={userInfo.website} style={{ marginBottom: "20px", height: "100px", width: "100px" }} /> */}
          <QRCode id = "qr-code" value={window.location.origin +'/'+ userInfo.uid} style={{ marginBottom:"20px" , height: "100px", width: "100px" }}/>
          
          <p>PHONE :- {userInfo.mobile}</p><br />
          <p>ABOUT:-{userInfo.about}</p>
        </div>
      </div>
    </div>
  )
}

export default DigitalCard;
