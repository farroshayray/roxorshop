import React from 'react';
import logo from "../../picture/logo192.png"
import facebookLogo from "../../picture/facebook.png";
import instagramLogo from "../../picture/instagram.png"
import tiktokLogo from "../../picture/tiktok.png"
import twitterxLogo from "../../picture/twitterx.png"

const List1 = () => {
  return (
            <div className="content-center">
                <img src={logo}alt="company-logo" className="footer-logo content-center w-40 mb-10 sm:mb-auto sm:w-20 sm:h-18 mx-auto flex justify-center" />
                <p className="text-center mb-4 text-white">see our social media</p>
                <div className="flex text-center justify-center">
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                            <img src={facebookLogo} alt="a" className="m-3 sm:m-1 sm:w-8 sm:h-8 hover:bg-slate-700 rounded-md"/>
                    </a>
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                        <img src={instagramLogo} alt="b" className="m-3 sm:m-1 sm:w-8 sm:h-8 hover:bg-slate-700 rounded-md"/>
                    </a>
                    <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer">
                        <img src={tiktokLogo} alt="c" className="m-3 sm:m-1 sm:w-8 sm:h-8 hover:bg-slate-700 rounded-md"/>
                    </a>
                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                        <img src={twitterxLogo} alt="d" className="m-3 sm:m-1 sm:w-8 sm:h-8 hover:bg-slate-700 rounded-md"/>
                    </a>
                </div>
            </div>
  )
}

export default List1