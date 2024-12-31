import React from "react";
import styles from "./Sidebar.module.css";
// import logo from "../../../logo.png";
import sales from "../assets/sales.png";
import salesActive from "../assets/salesActive.png";
import teamRep from "../assets/teamRep.png";
import teamRepActive from "../assets/teamRepActive.png";
import direct from "../assets/direct.png";
import directActive from "../assets/directActive.png";
import game from "../assets/game.png";
import gameActive from "../assets/gameActive.png";
import reviews from "../assets/reviews.png";
import reviewsActive from "../assets/reviewsActive.png";
import logout from "../assets/logout.png";
import ArLogo from "../../../../components/CssComponents/ArLogo/ArLogo";

const Sidebar = ({ activeElement, handleClick, openModal, isMenuExpanded }) => {
    return (
        <div className={`${styles.sideBar} ${isMenuExpanded ? styles.sideBarExpanded : ""}`}>


            <ArLogo />

            <div
                className={activeElement === "sales" ? styles.sidebarelementactive : styles.sidebarelement}
                onClick={() => handleClick("sales")}
            >
                <img src={activeElement === "sales" ? salesActive : sales} alt="sales" />
                <span>Sales & Stats</span>
            </div>

            <div
                className={activeElement === "teamRep" ? styles.sidebarelementactive : styles.sidebarelement}
                onClick={() => handleClick("teamRep")}
            >
                <img src={activeElement === "teamRep" ? teamRepActive : teamRep} alt="team report" />
                <span>Team Report</span>
            </div>

            <div
                className={activeElement === "direct" ? styles.sidebarelementactive : styles.sidebarelement}
                onClick={() => handleClick("direct")}
            >
                <img src={activeElement === "direct" ? directActive : direct} alt="direct sale" />
                <span>Direct Sale Report</span>
            </div>

            <div
                className={activeElement === "game" ? styles.sidebarelementactive : styles.sidebarelement}
                onClick={() => handleClick("game")}
            >
                <img src={activeElement === "game" ? gameActive : game} alt="game" />
                <span>Win a Game</span>
            </div>

            <div
                className={activeElement === "reviews" ? styles.sidebarelementactive : styles.sidebarelement}
                onClick={() => handleClick("reviews")}
            >
                <img src={activeElement === "reviews" ? reviewsActive : reviews} alt="reviews" />
                <span>Reviews</span>
            </div>

            <div className={styles.logout} onClick={openModal}>
                <img src={logout} alt="logout" />
                <span>Logout</span>
            </div>
        </div>
    );
};

export default Sidebar;
