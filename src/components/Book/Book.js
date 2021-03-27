// Date picker
import DateFnsUtils from "@date-io/date-fns";
import { Button, Grid } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Bookings from "../Bookings/Bookings";
import { UserContext } from "./../../App";

const Book = () => {
  const { bedType } = useParams();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [selectedDate, setSelectedDate] = useState({
    checkIn: new Date(),
    checkOut: new Date(),
  });
  const handleCheckIn = (date) => {
    const newDate = { ...selectedDate };
    newDate.checkIn = date;
    setSelectedDate(newDate);
  };
  const handleCheckOut = (date) => {
    const newDate = { ...selectedDate };
    newDate.checkOut = date;
    setSelectedDate(newDate);
  };

  const handleBooking = () => {
    const newBooking = {
      ...loggedInUser,
      ...selectedDate,
    };
    fetch("http://localhost:5000/addBooking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBooking),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Hello, {loggedInUser.name}</h1>
      <h1>Let's book a {bedType} Room.</h1>

      <Grid>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            label="Check In Date"
            format="MM/dd/yyyy"
            value={selectedDate.checkIn}
            onChange={handleCheckIn}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <KeyboardDatePicker
            margin="normal"
            label="Check Out Date"
            format="MM/dd/yyyy"
            value={selectedDate.checkOut}
            onChange={handleCheckOut}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Button color="primary" onClick={handleBooking}>
        Book Now
      </Button>
      <Bookings></Bookings>
      <p>
        Want a <Link to="/home">different room?</Link>{" "}
      </p>
    </div>
  );
};

export default Book;
