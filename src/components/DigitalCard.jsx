import React,{useState} from 'react';
import "./DigitalCard.scss";
import QRCode from "qrcode.react";
import { FaImage, FaUserTie, FaPhoneAlt, FaEnvelopeOpen, FaMapMarkerAlt } from 'react-icons/fa';

const DigitalCard = ({ userInfo }) => {
  const [isRotated,updateRotated] = useState(false);

  const rotateCard=()=>{
    updateRotated(!isRotated);

    if(!isRotated){
      document.getElementsByClassName('card')[0].style.transform = 'rotateY(180deg)'
    }else{
      document.getElementsByClassName('card')[0].style.transform = 'rotateY(0deg)';
    }
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
                : <img id = "Img-Profile" src={userInfo.imgUrl} alt="Profile Image" />
              }
            <h3>{userInfo.businessName}</h3>
          </div>
          <div className="right">
            <div className="person right-content">
              <FaUserTie  className="icon" />
                <h4>{userInfo.firstName} {userInfo.lastName}</h4>
            </div>
            <div className="phone right-content">
              <FaPhoneAlt className="icon" />
              <a href={"tel:" + userInfo.mobile}>{userInfo.mobile}</a>
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
          <QRCode id = "qr-code" value={userInfo.website} style={{ marginBottom:"20px" , height: "100px", width: "100px" }}/>
          <a>PHONE :- {userInfo.phone}</a><br />
          <a>ABOUT:-{userInfo.about}</a>
        </div>
      </div>
    </div>
  )
}

export default DigitalCard;
