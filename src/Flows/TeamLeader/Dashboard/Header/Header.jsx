import React from "react";
import styles from "./Header.module.css";
import menu from "../assets/menu.png"

import coin from "../assets/coin.png";
import notif from "../assets/notif.png";
import profile from "../assets/profile.png";
import expand from "../assets/expand.png";
import SearchInput from "../../../../components/CssComponents/SearchInput/SearchInput";


const Header = ({ totalCoins, toggleMenu }) => {
    return (
        <div className={styles.header}>
            <div className={styles.left}>
                <div className={styles.menugrid} onClick={toggleMenu} style={{ cursor: "pointer" }}>
                    <img src={menu} alt="menu" />
                </div>
                <SearchInput />
            </div>
            <div className={styles.right}>
                <div className={styles.icons}>
                    <div className={styles.coins}>
                        <img src={coin} height={25} alt="coin" />
                        {totalCoins}
                    </div>
                    <div className={styles.maximise}>
                        <img src={expand} height={25} alt="expand" />
                    </div>
                    <div className={styles.notifications}>
                        <img src={notif} height={30} alt="notifications" />
                    </div>
                    <div className={styles.profile}>
                        <img src={profile} height={35} alt="profile" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
