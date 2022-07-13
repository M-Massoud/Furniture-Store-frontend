import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="Box">
      <div className="Container">
        <div className="content">
        {/* <h1 style={{
          color: "green",
          textAlign: "center",
        }}>
          Join the Hub for exclusive offers
        </h1>
        */}
        <ul>
          <li>Join the Hub for exclusive offers</li>
          <li><input type="text" className="form-control w-10" placeholder="enter email" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" /></li>
          <li><button type="button" className="btn btn-danger">content us</button></li>
          <li>Download our App</li>
          <li>Ⓜ️</li>
          <li>📞</li>

        </ul>
        <hr />
       </div> 
        <div className="Row">
          <div className="Column">
            <p className="Heading">About Us</p>
            <a className="FooterLink" href="/home">Aim</a>
            <a className="FooterLink" href="/home">Vision</a>
            <a className="FooterLink" href="/home">Testimonials</a>
          </div>
          <div className="Column">
            <p className="Heading">Services</p>
            <a className="FooterLink" href="/home">Writing</a>
            <a className="FooterLink" href="/home">Internships</a>
            <a className="FooterLink" href="/home">Coding</a>
            <a className="FooterLink" href="/home">Teaching</a>
          </div>
          <div className="Column">
            <p className="Heading">Contact Us</p>
            <a className="FooterLink" href="/home">Uttar Pradesh</a>
            <a className="FooterLink" href="/home">Ahemdabad</a>
            <a className="FooterLink" href="/home">Indore</a>
            <a className="FooterLink" href="/home">Mumbai</a>
          </div>
          <div className="Column">
            <p className="Heading">Social Media</p>
            <a className="FooterLink" href="/home">
              <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px" }}>
                  Facebook
                </span>
              </i>
            </a>
            <a className="FooterLink" href="/home">
              <i className="fab fa-instagram">
                <span style={{ marginLeft: "10px" }}>
                  Instagram
                </span>
              </i>
            </a>
            <a className="FooterLink" href="/home">
              <i className="fab fa-twitter">
                <span style={{ marginLeft: "10px" }}>
                  Twitter
                </span>
              </i>
            </a>
            <a className="FooterLink" href="/home">
              <i className="fab fa-youtube">
                <span style={{ marginLeft: "10px" }}>
                  Youtube
                </span>
              </i>
            </a>
          </div>
        </div>
        <hr />
        <p>Copyright © 2022 ITI TEAM 4, Inc. All rights reserved. </p>
      </div>
    </div>
  );
};
export default Footer;
