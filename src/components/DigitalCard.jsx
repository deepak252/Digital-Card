import React from 'react';
import "./DigitalCard.scss";
import QRCode from "qrcode.react";
import { FaUserTie, FaPhone, FaEnvelopeOpen, FaMapMarkerAlt } from 'react-icons/fa';

const DigitalCard = ({ userInfo }) => {
  
  return (
    <div className="card-wrapper">
      <div className="card">
        <div className="card-front">
          <div className="left">
            <h4>{userInfo.businessName}</h4>
          </div>
          <div className="right">
            <div className="person right-content">
              <FaUserTie className="icon" />
              <div>
                <h4>{userInfo.firstName} {userInfo.lastName}</h4>
                {/* <p>Web Designer</p> */}
              </div>
            </div>
            <div className="phone right-content">
              <FaPhone className="icon" />
              <div>
                <p>{userInfo.mobile}</p>

              </div>
            </div>
            <div className="email right-content">
              <FaEnvelopeOpen className="icon" />
              <div>
                <p>{userInfo.email}</p>
              </div>
            </div>
            <div className="address right-content">
              <FaMapMarkerAlt className="icon" />
              <div>
                <p>{userInfo.address}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card-back">
          {/* <img src="2553.jpg" /> */}
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

// return (
//     <div id = "Digital-Card">
//         <div className="Card">
//             <p>First Name : {userInfo.firstName}</p>
//             <p>Last Name : {userInfo.lastName}</p>
//             <p>Email : {userInfo.email}</p>
//             <p>Mobile : {userInfo.mobile}</p>
//             <p>Business Name : {userInfo.businessName}</p>
//             <p>Address : {userInfo.address}</p>
//             <p>Phone : {userInfo.phone}</p>
//             <p>About : {userInfo.about}</p>
//             <p>Website : {userInfo.website}</p>
//         </div>
//     </div>
// )