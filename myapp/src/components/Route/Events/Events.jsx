import React from "react";
import styles from "../../../style/styles.js";
import EventCard from "./EventCard.jsx";
import { useSelector } from "react-redux";

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.event);

  // useEffect(()=>{
  //   const data = allEvents && allEvents.find((a,b)=>a.sold_out-b.sold_out)
  //   console.log(data)
  // },[allEvents])

  return (
    <div>
      {!isLoading && (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1>Popular Eventes</h1>
          </div>
          <div className="w-full grid">
            <EventCard data={allEvents && allEvents[0]} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
