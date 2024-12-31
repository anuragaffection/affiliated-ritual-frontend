import React, { useState, useEffect } from "react";
import "./Dashboard.module.css";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import Direct from "./Direct/Direct";
import Game from "./Game/Game";
import Reviews from "./Reviews/Reviews";
import Sales from "./Sales/Sales";
import TeamRep from "./TeamRep/TeamRep";
import Logout from "../../../components/LogoutModal/Logout";
import { auth } from "../../../firebase-config";
import { getCoinsOfUser } from "../../../service/coins/getCoinsOfUser";

const TeamDashboard = ({ handleLogout }) => {
  const [totalCoins, setTotalCoins] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [activeElement, setActiveElement] = useState("sales");
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const getTotalCoins = await getCoinsOfUser(user.uid);
        setTotalCoins(getTotalCoins);
      } else {
        localStorage.removeItem("team_leader_uid");
        alert("No user is signed in");
        window.location.replace("teamleader?action=login");
      }
    });
    return () => unsubscribe();
  }, []);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleClick = (element) => setActiveElement(element);
  const toggleMenu = () => setIsMenuExpanded(!isMenuExpanded);

  return (
    <div className={`dashboard ${isMenuExpanded ? "expanded" : ""}`}>
      <Sidebar
        activeElement={activeElement}
        handleClick={handleClick}
        openModal={openModal}
        isMenuExpanded={isMenuExpanded}
      />
      <Logout showModal={showModal} closeModal={closeModal} handleLogout={handleLogout} />
      <div className="maincontent">
        <Header totalCoins={totalCoins} toggleMenu={toggleMenu} />
        <div className="content">
          {activeElement === "direct" && <Direct />}
          {activeElement === "game" && <Game />}
          {activeElement === "reviews" && <Reviews />}
          {activeElement === "sales" && <Sales />}
          {activeElement === "teamRep" && <TeamRep />}
        </div>
      </div>
    </div>
  );
};

export default TeamDashboard;
