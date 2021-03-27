import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./../../App";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loggedInUser] = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:5000/getBookings/?email=" + loggedInUser.email, {
      headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.log(err));
  }, [loggedInUser.email]);
  return (
    <div>
      {bookings.map((booking) => (
        <li>{booking.name}</li>
      ))}
    </div>
  );
}
