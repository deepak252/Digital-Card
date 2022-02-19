import React from 'react';
import "./DigitalCard.scss";
import {FaUserTie, FaPhone, FaEnvelopeOpen, FaMapMarkerAlt } from 'react-icons/fa';

const DigitalCard = ({userInfo}) => {

    return (
        <div class="card-wrapper">
        <div class="card">
          <div class="card-front">
            <div class="left">
              {/* <img src="2553.jpg" /> */}
              <h4>{userInfo.businessName}</h4>
            </div>
            <div class="right">
              <div class="person right-content">
                <FaUserTie className="icon" />
                <div>
                  <h4>{userInfo.firstName} {userInfo.lastName}</h4>
                  {/* <p>Web Designer</p> */}
                </div>
              </div>
              <div class="phone right-content">
                <FaPhone className="icon" />
                <div>
                  <p>{userInfo.mobile}</p>
                 
                </div>
              </div>
              <div class="email right-content">
                <FaEnvelopeOpen className="icon" />
                <div>
                  <p>{userInfo.email}</p>
                </div>
              </div>
              <div class="address right-content">
                <FaMapMarkerAlt className="icon" />
                <div>
                  <p>{userInfo.address}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="card-back">
            <img src="2553.jpg" />
           <div><center><a href={'//'+userInfo.website} target="_blank">{userInfo.website}</a> <br />
            <a>PHONE :- {userInfo.phone}</a><br />
            <a>ABOUT:-{userInfo.about}</a></center></div>
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