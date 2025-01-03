import React from 'react';
import styles from './Feedback.module.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaQuoteRight } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";

function Feedback() {
    const feedback = [
        {
            userImg: "",
            userName: "John Doe",
            userReview: "The training was exceptional. The instructors were knowledgeable and provided hands-on experience that really helped me understand the concepts.",
            userRating: 4.5
        },
        {
            userImg: "",
            userName: "Jane Smith",
            userReview: "This was the most comprehensive training I have ever attended. The practical approach and advanced tools were exactly what I needed.",
            userRating: 4.7
        },
        {
            userImg: "",
            userName: "Michael Brown",
            userReview: "The certification added great value to my resume. The content was well-structured, and the support team was very helpful throughout.",
            userRating: 4.3
        },
        {
            userImg: "",
            userName: "Emily Davis",
            userReview: "Freelancing secrets revealed in the training were a game-changer for me. I started getting clients within a month of completing the course.",
            userRating: 4.6
        },
        {
            userImg: "",
            userName: "William Johnson",
            userReview: "The placement assistance was outstanding. They guided me throughout the process, and I landed a great job shortly after completing the training.",
            userRating: 4.8
        },
        {
            userImg: "",
            userName: "Sophia Martinez",
            userReview: "The SAP business module training was incredible. It simplified complex processes and gave me the confidence to handle real-world projects.",
            userRating: 4.4
        }
    ];


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true, // Enables automatic sliding
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <div className={styles.feedbackMain}>
            <p className={styles.feedbackParagraph}>
                Some reviews that never lie. Check their stories and let's change your career in a snap. Change the system!
            </p>

            <div>
                <Slider {...settings} className={styles.feedbackContainer}>
                    {feedback.map((item, i) => (
                        <div key={i} className={styles.feedbackItem}>
                            <div className={styles.feedbackItpWrapper}>
                                <div className={styles.feedbackIcon}>{item.icon}</div>
                                <div className={styles.feedbackTpWrapper}>

                                    {/* google user name */}
                                    <div className={styles.feedbackTitle}>{item.userName}</div>

                                    {/* google ratings - start */}
                                    <div className={styles.feedbackPosition}>{item.userRating}</div>
                                </div>
                                {/* google icons - replace */}
                                <FaGoogle className={styles.feedbackQuoteRight} />
                            </div>
                            <div className={styles.feedbackDescription}>{item.userReview}</div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default Feedback;
