import React from 'react';
import './Trainer.css';
import trainerImage from "./trainer.jpg"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function Trainer() {
    const trainer = [
        {
            imgLink: trainerImage,
            alt: "alt name",
            name: "Jacob",
            position: "UI Ux expert"
        },
        {
            imgLink: trainerImage,
            alt: "alt name",
            name: "Jacob",
            position: "UI Ux expert"
        },
        {
            imgLink: trainerImage,
            alt: "alt name",
            name: "Jacob",
            position: "UI Ux expert"
        },
        {

            imgLink: trainerImage,
            alt: "alt name",
            name: "Jacob",
            position: "UI Ux expert"
        }
    ];

    return (
        <div className='trainer-container'>
            <p className='trainer-paragraph'>Let's meet with the team of our  industry expert trainers. We believe that you will be able to change your life with the most advanced AI integrated training module cooked by Affiliate Ritual.</p>
            <div
                className="feedback-container"
            >
                {trainer.map((item, i) => (

                    <div key={i} className='trainer-item-wrapper'>
                        <img

                            className="trainer-img"
                            src={item.imgLink}
                            alt={item.alt}
                        />
                        <p className='trainer-name'>{item.name}</p>
                        <p className='trainer-position'>{item.position}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Trainer;