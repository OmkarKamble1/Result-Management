import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./css/AddResults.css";

function AddResults() {
  const location = useLocation();
  const navigate = useNavigate();
  var [name, setName] = useState(null);
  var [seatno, setSeatno] = useState(null);
  var [marks1, setMarks1] = useState(null);
  var [marks2, setMarks2] = useState(null);
  var [marks3, setMarks3] = useState(null);
  var [marks4, setMarks4] = useState(null);
  var [marks5, setMarks5] = useState(null);
  var [sgpi, setSgpi] = useState(null);
  var [remark, setRemark] = useState(null);

  const {
    user,
    examinfo: { year, branch, heldin, sem },
    subjects: { sub1, sub2, sub3, sub4, sub5 },
  } = location.state;

  useEffect(() => {
    if (location.state == null) {
      window.alert("Not logged in");
      navigate("/Teacher/Login");
    }
  });

  const nextHandler = async () => {
    if (
      name &&
      seatno &&
      marks1 &&
      marks2 &&
      marks3 &&
      marks4 &&
      marks5 &&
      sgpi &&
      remark
    ) {
      axios
        .post("https://result-management-backend.onrender.com/api/addresult", {
          name: name,
          seatno: seatno,
          exam: {
            branch: branch,
            sem: sem,
            heldin: heldin,
            year: year,
          },
          remark: remark,
          sgpi: sgpi,
          result: {
            sub1: [sub1, marks1],
            sub2: [sub2, marks2],
            sub3: [sub3, marks3],
            sub4: [sub4, marks4],
            sub5: [sub5, marks5],
          },
        })
        .then((res) => {
          if (res.data.message == "ResultAdded") {
            window.confirm("Result added");
            document.getElementById("stname").value = "";
            document.getElementById("stseat").value = "";
            document.getElementById("stsub1").value = "";
            document.getElementById("stsub2").value = "";
            document.getElementById("stsub3").value = "";
            document.getElementById("stsub4").value = "";
            document.getElementById("stsub5").value = "";
            document.getElementById("stsgpi").value = "";
            document.getElementById("stremark").value = "";
            name = null;
            seatno = null;
            marks1 = null;
            marks2 = null;
            marks3 = null;
            marks4 = null;
            marks5 = null;
            sgpi = null;
            remark = null;
          } else {
            window.confirm("Please try submitting again");
          }
        })
        .catch((err) => window.alert(err.message));
    } else {
      window.alert("Fill all fields");
    }
  };

  const submitHandler = async () => {
    if (
      name &&
      seatno &&
      marks1 &&
      marks2 &&
      marks3 &&
      marks4 &&
      marks5 &&
      sgpi &&
      remark
    ) {
      axios
        .post("https://result-management-backend.onrender.com/api/addresult", {
          name: name,
          seatno: seatno,
          exam: {
            branch: branch,
            sem: sem,
            heldin: heldin,
            year: year,
          },
          remark: remark,
          sgpi: sgpi,
          result: {
            sub1: [sub1, marks1],
            sub2: [sub2, marks2],
            sub3: [sub3, marks3],
            sub4: [sub4, marks4],
            sub5: [sub5, marks5],
          },
        })
        .then((res) => {
          if (res.data.message == "ResultAdded") {
            window.confirm("Result added");
            navigate("/Teacher/Results/Submit");
          } else {
            window.confirm("Please try submitting again");
          }
        })
        .catch((err) => window.alert(err.message));
    } else {
      window.alert("Fill all fields");
    }
  };

  return (
    <div className="ar_outer">
      <h1 className="ar_logged">Logged in as: {user}</h1>
      <div className="ar_div1">
        <h2>Year: {year}</h2>
        <h2>Branch: {branch}</h2>
        <h2>Held in: {heldin}</h2>
        <h2>Sem: {sem}</h2>
      </div>

      <div className="ar_div2">
        <div className="ar_div2_1">
          <div style={{ display: "flex" }}>
            <h2>Name: </h2>
            <input
              id="stname"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={{ display: "flex" }}>
            <h2>Seat No. </h2>
            <input
              style={{ width: "120px" }}
              id="stseat"
              type="text"
              onChange={(e) => setSeatno(e.target.value)}
            />
          </div>
        </div>
        <section className="ar_div2_2">
          <div>
            <div>
              <h2>{sub1}</h2>
              <input
                id="stsub1"
                type="text"
                onChange={(e) => setMarks1(e.target.value)}
              />
            </div>
            <div>
              <h2>{sub2}</h2>
              <input
                id="stsub2"
                type="text"
                onChange={(e) => setMarks2(e.target.value)}
              />
            </div>
            <div>
              <h2>{sub3}</h2>
              <input
                id="stsub3"
                type="text"
                onChange={(e) => setMarks3(e.target.value)}
              />
            </div>
            <div>
              <h2 id="div2_remark">Remark: </h2>
              <select id="stremark" onChange={(e) => setRemark(e.target.value)}>
                <option value="">select remark</option>
                <option value="pass">PASS</option>
                <option value="fail">FAIL</option>
              </select>
            </div>
          </div>

          <div>
            <div>
              <h2>{sub4}</h2>
              <input
                id="stsub4"
                type="text"
                onChange={(e) => setMarks4(e.target.value)}
              />
            </div>
            <div>
              <h2>{sub5}</h2>
              <input
                id="stsub5"
                type="text"
                onChange={(e) => setMarks5(e.target.value)}
              />
            </div>
            <div>
              <h2>SGPI: </h2>
              <input
                id="stsgpi"
                type="text"
                onChange={(e) => setSgpi(e.target.value)}
              />
            </div>
            <div className="ar_div3">
              <button type="button" onClick={nextHandler}>
                Next
              </button>
              <button type="button" onClick={submitHandler}>
                Submit
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AddResults;
