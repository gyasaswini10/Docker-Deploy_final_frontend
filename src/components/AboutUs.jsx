import React, { Component } from 'react';
import './../css/AboutUs.css';

import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Footer from './Footer';

export class AboutUs extends Component {
  render() {
    return (
      <div>
      <div className="about-us-container">
        <h1>About Us</h1>

        <div className="team-members">
          <div className="team-member">
            <div className="team-box">
              <h3>Gurivi Reddy Yasaswini</h3>
              <div className="social-links" id='social1'>
                <a href="https://github.com/gyasaswini10" target="_blank" rel="noopener noreferrer">
                  <FaGithub size={30} />
                </a>
                <a href="https://www.linkedin.com/in/yasaswini2005" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin size={30} />
                </a>
              </div>
            </div>
          </div>

          <div className="team-member">
            <div className="team-box">
              <h3>Rachipudi Saisree</h3>
              <div className="social-links">
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                  <FaGithub size={30} />
                </a>
                <a href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin size={30} />
                </a>
              </div>
            </div>
          </div>

          <div className="team-member">
            <div className="team-box">
              <h3>Mounika</h3>
              <div className="social-links">
                <a href="https://github.com/GangitlaMounika" target="_blank" rel="noopener noreferrer">
                  <FaGithub size={30} />
                </a>
                <a href="https://www.linkedin.com/in/mounika-gangitla-a3104632b/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin size={30} />
                </a>
              </div>
            </div>
          </div>
          
        </div>
     
      </div>
      <Footer/>
      </div>
      
    );
  }
}

export default AboutUs;
