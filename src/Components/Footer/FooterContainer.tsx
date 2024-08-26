import React, { useState } from "react";
import List1 from "./List1";
import List2 from "./List2";
import List3 from "./List3";


const FooterContainer = () => {
    return (
        <div className="footer-container flex justify-between bg-black flex-col sm:flex-row py-10 text-xl sm:text-base">
            <div className="sm:ml-8 my-10">
                <List1/>
            </div>
            <div className="flex justify-center">
                <div className="sm:my-auto  text-right mr-4 w-44">
                    <List2/>
                </div>
                <div className="sm:hidden flex ml-4 ">
                    <List3/>
                </div>
            </div>
            <div className="hidden sm:flex sm:mr-8">
                <List3/>
            </div>
            
            
        </div>
    )
}
export default FooterContainer