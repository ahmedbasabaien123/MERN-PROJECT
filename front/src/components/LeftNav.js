import React from "react";
import { NavLink } from "react-router-dom";

const LeftNav = () => {

    return (
        <div className="left-van-container">
            <div className="icons">
                <div className="icons-bis">
                    <NavLink to="/" exact activeclassename="active-left-nav">
                        <img src="./img/icons/home.svg" alt="home" />
                    </NavLink>
                    <NavLink to="/trending" exact activeclassename="active-left-nav">
                        <img src="./img/icons/rocket.svg" alt="trending" />
                    </NavLink>
                    <NavLink to="/profil" exact activeclassename="active-left-nav">
                        <img src="./img/icons/user.svg" alt="profil" />
                    </NavLink>
                </div> 
            </div>
        </div>
    );
};

export default LeftNav;