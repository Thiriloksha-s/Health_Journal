import React, { useState } from "react";
import "./css/Appointments.css";
import { IoMdClose } from "react-icons/io";
import Navbar from "./Navbar";
const Appointments = () => {
  const [hospital, setHospital] = useState("");
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [show, setShow] = useState(false);
  const [list, setList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      hospital,
      date,
      reason,
      loggedAt: new Date().toLocaleString(),
    };

    setList([...list, data]);
    setSubmitted(true);
    setShow(false);
    setHospital("");
    setDate("");
    setReason("");

    setTimeout(() => {
      setSubmitted(false);
    }, 1000);
  };

  return (
    <div>
      <Navbar />

      <div className="appointments-container">
        <h2>Appointment Logs</h2>
        <button onClick={() => setShow(true)} className="add-btn">
          Add New Appointment
        </button>
        <div className="appointments-grid">
          {list.length === 0 ? (
            <p>No appointments logged yet.</p>
          ) : (
            list.map((item, index) => (
              <div key={index} className="appointment-card">
                <h3>{item.hospital}</h3>
                <p>
                  <strong>Date:</strong> {item.date}
                </p>
                <p>
                  <strong>Reason:</strong> {item.reason || "Not specified"}
                </p>
                <p>
                  <small>Logged on: {item.loggedAt}</small>
                </p>
              </div>
            ))
          )}
        </div>
        {show && (
          <div className="form-popup">
            <div className="form-container">
              <button className="close-btn" onClick={() => setShow(false)}>
                <IoMdClose />
              </button>
              <h2>Log Your Appointment</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={hospital}
                  onChange={(e) => setHospital(e.target.value)}
                  placeholder="Hospital Name"
                  required
                />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Reason for Visit"
                ></textarea>
                <button type="submit" className="log-btn">
                  Log Appointment
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments; 

