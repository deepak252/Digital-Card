import React from 'react';
import "./DigitalCard.scss";

const DigitalCard = ({userInfo}) => {

    return (
        <div id = "Digital-Card">
            <div className="Card">
                <p>First Name : {userInfo.firstName}</p>
                <p>Last Name : {userInfo.lastName}</p>
                <p>Email : {userInfo.email}</p>
                <p>Mobile : {userInfo.mobile}</p>
                <p>Business Name : {userInfo.businessName}</p>
                <p>First Name : {userInfo.phone}</p>
                <p>Address : {userInfo.address}</p>
                <p>About : {userInfo.about}</p>
                <p>Website : {userInfo.webiste}</p>
            </div>
        </div>
    )
}

export default DigitalCard;

