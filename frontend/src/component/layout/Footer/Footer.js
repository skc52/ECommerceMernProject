import React from 'react'
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/appstore.png"
import "./Footer.css";
import {FaGooglePlay, FaAppStore, FaInstagram, FaFacebook, FaYoutube} from "react-icons/fa"

const Footer = () => {
  return (
    <footer id = "footer">
        <div className="leftfooter">
            {/* <h4>DOWNLOAD OUR APP</h4> */}
            <p>Download App for Android and IOS mobile phone</p>
            <div className='appIcons'>

              <FaGooglePlay className='googlePlay' size = "3em"/>
              <FaAppStore className='appStore'size = "3em"/>
            </div>
            
        </div>
        <div className="midFooter">
            <h1>SKC.</h1>
            <p>East To West, SKC IS THE BEST</p>
            <p>Copyrights 2022 &copy; samip_k.c</p>
        </div>
         <div className="rightFooter">
            <h4>Follow us</h4>
            <a href="http://instagram.com/samip_k.c"> <FaInstagram  size = "1.7em" /> </a>
            <a href="https://www.facebook.com/profile.php?id=100005278516631"> <FaFacebook  size = "1.7em" /> </a>
            <a href="https://www.youtube.com/"> <FaYoutube  size = "1.7em" /> </a>
         </div>

    </footer>
  )
}

export default Footer
