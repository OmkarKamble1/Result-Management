import React, { useEffect, useState } from "react";
import Router, { Route, useLocation, useNavigate } from "react-router-dom";
import "./css/StudentList.css";
import axios from "axios";
import Certificate from "./Certificate";

function StudentList() {
  const [loading, setLoading] = useState(true);
  const [datalist, setdatalist] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const getData = async () => {
    await axios
      .post(
        "https://result-management-backend.onrender.com/api/getresults",
        location.state
      )
      .then((res) => {
        if (res.data.message == "notLoggedin") {
          navigate("/");
        } else {
          setdatalist([...datalist, ...res.data]);
          setLoading(false);
        }
      })
      .catch((err) => {
        window.alert(err.message);
      });
  };

  const handlerClick = (classname) => {
    navigate("/results/certificate", { state: datalist[classname] });
  };

  useEffect(() => {
    if (location.state == null) {
      window.alert("Not logged in");
      navigate("/");
    }
    setLoading(true);
    getData();
  }, []);

  return (
    <div className="outer-outer-div">
      <div className="outer-div">
        {loading
          ? ""
          : datalist.map((item, i) => {
              return (
                <div
                  key={`student${i}`}
                  className={`${i}`}
                  onClick={(e) => {
                    handlerClick(e.currentTarget.className);
                  }}
                >
                  <div className="inner-div">
                    <h2>{item.name.toUpperCase()}</h2>
                    <h3>sem {item.exam.sem}</h3>
                    <h3>{item.seatno}</h3>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default StudentList;
