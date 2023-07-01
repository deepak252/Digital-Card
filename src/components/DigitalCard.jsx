import React,{useState,useEffect} from 'react';
import "./DigitalCard.scss";
import QRCode from "qrcode.react";
import { FaImage, FaUserTie, FaPhoneAlt,FaLink, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const DigitalCard = ({ userInfo }) => {

  const saveContact=()=>{
    var vcard = generateVCardData(userInfo)
    var blob = new Blob([vcard], { type: "text/vcard" });
    var url = URL.createObjectURL(blob);
    
    const newLink = document.createElement('a');
    newLink.download = `${userInfo.firstName}_${userInfo.lastName}.vcf`;
    newLink.textContent = userInfo.firstName;
    newLink.href = url;
    
    newLink.click();
  }

  const generateVCardData = (userInfo) => {
    // Construct the vCard data using the contact details
    return `BEGIN:VCARD
VERSION:4.0
FN:${userInfo.firstName} ${userInfo.lastName}
TEL;TYPE=work,voice:${userInfo.mobile}
EMAIL:${userInfo.email}
ORG:${userInfo.businessName}
URL:${userInfo.website}
END:VCARD`;
    return `BEGIN:VCARD\nVERSION:4.0\nFN:${userInfo.firstName} ${userInfo.lastName}\nTEL;TYPE=work,voice:${userInfo.mobile}\nEMAIL:${userInfo.email}\nORG:${userInfo.businessName}\nURL:${userInfo.website}\nEND:VCARD`;
  };

  const getClickableLink = link => {
    if(!link){
      return ''
    }
    return link.startsWith("http://") || link.startsWith("https://") ?
      link
      : `http://${link}`;
  };

  useEffect(() => {
    let title = "Digital Visiting Card"
    if(userInfo.firstName){
      title = userInfo.firstName;
      if(userInfo.lastName){
        title = title+ " - Digital Visiting Card"
      }
    }
    document.title = title

    // if(userInfo.imgUrl){
    //   var link = document.querySelector("link[rel~='icon']");
    //   if (!link) {
    //     link = document.createElement('link');
    //     link.rel = 'icon';
    //     document.getElementsByTagName('head')[0].appendChild(link);
    //   }
    //   link.href = userInfo.imgUrl;
    // }

  }, []);

  
  return (
    <div className="card-wrapper">
      <div  className="card">
        <div className="card-top">
          <div className="card-top-left">
          {/* userInfo.about */}
              {
                userInfo.imgUrl===null || userInfo.imgUrl===undefined||userInfo.imgUrl===''
                ? <FaImage id = "Img-Profile" size = "50" color="#1187ac"/>
                : <img id = "Img-Profile" src={userInfo.imgUrl} alt="pic" />
              }
            <h3 id="business-name">{userInfo.businessName}</h3>
          </div>
          <div className="card-top-right">
            <div className="person right-content">
              <FaUserTie  className="icon" />
              <h4>{userInfo.firstName} {userInfo.lastName}</h4>
            </div>
            <div className="phone right-content">
              <FaPhoneAlt className="icon" />
              {/* <p onClick={()=>handlePhoneClick(1)}>{userInfo.mobile}</p> */}
              <a href={"tel:" + userInfo.mobile}>{userInfo.mobile}</a>
            </div>
            <div className="email right-content">
              <FaEnvelope className="icon" />
              <a href={"mailto:" +userInfo.email}>{userInfo.email}</a>
            </div>
            <div className="website right-content">
              <FaLink className="icon" />
              <a href={getClickableLink(userInfo.website)} target="blank">{userInfo.website ? userInfo.website : "NO URL"}</a>
            </div>
            <div className="address right-content">
              <FaMapMarkerAlt className="icon" />
              <a href={"http://maps.google.com/?q="+userInfo.address} target ="blank">{userInfo.address}</a>
            </div>
            
          </div>

        </div>
        <div className= "card-bottom">
            <div className="card-bottom-left">
              <QRCode 
                id = "qr-code" 
                value = { generateVCardData(userInfo) } 
                style={{ marginBottom:"20px" , height: "100px", width: "100px" }}
              />
              <button onClick={() => saveContact()}  id="save-contact">Save Contact</button>
            </div>
            <div className='card-bottom-right'>
              <p>ABOUT:  {userInfo.about}</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default DigitalCard;
