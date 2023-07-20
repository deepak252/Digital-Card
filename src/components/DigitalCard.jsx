import React, { useState, useEffect } from "react";
import "./DigitalCard.scss";
import QRCode from "qrcode.react";
import {
    FaImage,
    FaUserTie,
    FaPhoneAlt,
    FaLink,
    FaEnvelope,
    FaMapMarkerAlt,
} from "react-icons/fa";

const DigitalCard = ({ userInfo }) => {
    const saveContact = () => {
        var vcard = generateVCardData(userInfo);
        var blob = new Blob([vcard], { type: "text/vcard" });
        var url = URL.createObjectURL(blob);

        const newLink = document.createElement("a");
        newLink.download = `${userInfo.firstName}_${userInfo.lastName}.vcf`;
        newLink.textContent = userInfo.firstName;
        newLink.href = url;

        newLink.click();
    };

    const generateVCardData = (userInfo) => {
        // Construct the vCard data using the contact details
        let {
            firstName = "",
            lastName = "",
            mobile = "",
            email = "",
            businessName = "",
            website = "",
        } = userInfo;
        if (mobile.length === 10 || mobile.length === 11) {
            mobile = `+91${mobile}`;
        }
        return `BEGIN:VCARD
VERSION:4.0
FN:${firstName} ${lastName}
TEL;TYPE=work,voice:${mobile}
EMAIL:${email}
ORG:${businessName}
URL:${website}
END:VCARD`;
    };

    const getClickableLink = (link) => {
        if (!link) {
            return "";
        }
        return link.startsWith("http://") || link.startsWith("https://")
            ? link
            : `http://${link}`;
    };

    useEffect(() => {
        let title = "Digital Visiting Card";
        if (userInfo.firstName) {
            title = userInfo.firstName;
            if (userInfo.lastName) {
                title = title + " - Digital Visiting Card";
            }
        }
        document.title = title;
    }, []);

    return (
        <div className="card">
            <div className="card__left">
                {/* userInfo.about */}
                {userInfo.imgUrl === null ||
                userInfo.imgUrl === undefined ||
                userInfo.imgUrl === "" ? (
                    <FaImage id="img-profile" size="50" color="#1187ac" />
                ) : (
                    <img id="img-profile" src={userInfo.imgUrl} alt="pic" />
                )}
                <h3 id="businessname">{userInfo.businessName}</h3>

                <QRCode
                    id="qr"
                    value={generateVCardData(userInfo)}
                    style={{
                        marginBottom: "20px",
                        height: "100px",
                        width: "100px",
                    }}
                />
                <button onClick={() => saveContact()} id="btn-contact">
                    Save Contact
                </button>
            </div>
            <div className="card__right">
                <div className="person card__right__item">
                    <FaUserTie className="icon" />
                    <h4>
                        {userInfo.firstName} {userInfo.lastName}
                    </h4>
                </div>
                <div className="phone card__right__item">
                    <FaPhoneAlt className="icon" />
                    {/* <p onClick={()=>handlePhoneClick(1)}>{userInfo.mobile}</p> */}
                    <a href={"tel:" + userInfo.mobile}>{userInfo.mobile}</a>
                </div>
                <div className="email card__right__item">
                    <FaEnvelope className="icon" />
                    <a href={"mailto:" + userInfo.email}>{userInfo.email}</a>
                </div>
                <div className="website card__right__item">
                    <FaLink className="icon" />
                    <a href={getClickableLink(userInfo.website)} target="blank">
                        {userInfo.website ? userInfo.website : "NO URL"}
                    </a>
                </div>
                <div className="address card__right__item">
                    <FaMapMarkerAlt className="icon" />
                    <a
                        href={"http://maps.google.com/?q=" + userInfo.address}
                        target="blank"
                    >
                        {userInfo.address}
                    </a>
                </div>

                {/* <div className="about">
                    <p >ABOUT: </p>
                    <p >{userInfo.about} Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat ab, aliquam dolores unde alias dicta obcaecati quibusdam? Ullam ipsa sunt, deserunt officiis velit culpa temporibus ad aspernatur, accusamus perferendis veritatis?</p>
                </div> */}
                
                <p id="about"> <b>ABOUT: </b> {userInfo.about}</p>

            </div>
        </div>
    );
};

export default DigitalCard;
