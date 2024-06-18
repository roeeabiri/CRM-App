

import React from 'react';
import '../../styles/components/pages/_homePage.scss';


const HomePage = () => {
    return (
        <div className="company-info">

          <div className="crm-data">
            <h3>Our Impact</h3>
            <p>
              Serving over <strong>500</strong> companies worldwide.
            </p>
            <p>
              Trusted by clients across various industries including finance, healthcare, and technology.
            </p>
            <p>
              A customer satisfaction rate of <strong>98%</strong>, with over <strong>10,000</strong> successful projects.
            </p>
          </div>

          <div className="kaligon-company">
            <h3>About Kaligon</h3>
            <p>
              Kaligon has been a leading provider in CRM solutions since 2005, offering innovative and reliable services to businesses of all sizes.
            </p>
            <p>
              With a dedicated team of experts, Kaligon is committed to driving business growth through cutting-edge technology and personalized customer experiences.
            </p>
            <p>
              Our mission is to empower organizations to manage customer relationships effectively, streamline operations, and achieve sustainable success.
            </p>
          </div>

          <div className="contact-us">
            <h4>Contact Us</h4>
            <p>
              We're here to help. Get in touch with us  
              <a href="https://www.kaligon.com/#ContectUs" target="_blank" rel="noopener noreferrer">
                HERE
              </a>
            </p>
          </div>
        </div>
      );
}

export default HomePage;