import React, { useEffect, useState } from "react";
import styles from "./progress.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { auth, db } from "../../../../../firebase-config";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { updateUserEarnings } from "../../../../../service/updateEarnings/updateUserEarnings";



export const findUserDetailByID = async (id) => {
  try {
    const userDocRef = doc(db, "users", id);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      return userDocSnap.data();
    } else {
      console.error("No such user found!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

export const findUserDetailBymyARID = async (myARID) => {
  try {
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, where("myARID", "==", myARID));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data();
    } else {
      console.error("No user found with myARID:", myARID);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
};

const sortModulesAndInstallmentByDate = (modules, installments) => {
  const combined = [...modules, ...installments];
  return combined.sort((a, b) => new Date(a.date) - new Date(b.date));
};

const Progress = ({ data }) => {
  const [courses, setCourses] = useState(data);
  const [userId, setuserId] = useState(localStorage.getItem('student_uid'));

  useEffect(() => {
    setCourses(data);
  }, [data]);

  const handlePayNow = async (courseIndex, installmentDate) => {
    try {
      console.log("installmentIndex", installmentDate);

      const updatedCourses = courses.map((course, cIndex) => {
        if (cIndex === courseIndex) {
          const updatedInstallments = course.installments.map(async (installment) => {
            if (new Date(installment.date).toISOString() === new Date(installmentDate).toISOString()) {
              console.log("installment", installment);
              const userDetl = await findUserDetailByID(userId);
              const referringUser = await findUserDetailBymyARID(userDetl.referralId);
              await updateUserEarnings(referringUser.uid, installment.price, userId);
              return {
                ...installment,
                paid: installment.paid ? [...installment.paid, userId] : [userId],
              };
            }

            return installment;
          });
          return { ...course, installments: updatedInstallments };
        }
        return course;
      });

      const selectedCourse = updatedCourses[courseIndex];
      console.log("selectedCourse", selectedCourse);

      const courseRef = doc(db, "courses", selectedCourse.id);

      console.log("Course updated:", selectedCourse);
      alert("Course updated successfully");

      setCourses(updatedCourses);
    } catch (error) {
      console.error("Error updating course:", error);
      alert("Failed to update the course. Please try again.");
    }
  };

  return (
    <div className={styles.progress}>
      {
        courses && courses.map((course, index) => {
          const sortedModules = course.modules.sort((a, b) => new Date(a.date) - new Date(b.date));

          return (
            <div key={index} className={styles.courseSection}>
              <h3 className={styles.heading}>{course.courseName}</h3>

              <div className={styles.center}>
                <div className={styles.linethick}></div>
              </div>

              <div className={styles.dots}>
                {sortedModules.map((module, stepIndex) => (
                  <div key={stepIndex} className={styles[`dot${stepIndex + 1}`]}></div>
                ))}
              </div>

              <Swiper className={styles.dialogs} slidesPerView={1}>
                {sortedModules.map((module, moduleIndex) => {
                  const isInstallment = !module.name;
                  const isPaid = isInstallment && module.paid;

                  return (
                    <SwiperSlide key={moduleIndex} className={styles.dialog}>

                      <div className={styles.subHeading}>{module.name ? module.name : "Installment"}</div>

                      <p
                        className={styles.text}>
                        {module.description ? module.description : "Pay within this date"}
                      </p>

                      {
                        module.price && (
                          <p className={styles.text}>Price: ₹{module.price}</p>
                        )
                      }
                      <p className={styles.text}>Date: {module.date}</p>

                      {!isPaid && isInstallment && (
                        <button onClick={() => handlePayNow(index, module.date)}>PAY NOW</button>
                      )}

                      {isPaid && <p className={styles.text}>Paid</p>}
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          );
        })}
    </div>
  );
};

export default Progress;
