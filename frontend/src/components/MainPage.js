import React, { Fragment, useEffect, useRef, useState } from "react";
import Router, {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import StudentList from "./StudentList";
import "./css/Mainpage.css";
import "./css/Navbar.css";
function MainPage() {
  const [selected, setSelected] = useState({
    year: "",
    branch: "",
    heldin: "",
  });
  const year = useRef(null);
  const branch = useRef(null);
  const heldin = useRef(null);
  const button = useRef();

  const navigate = useNavigate();
  const [credErr, setcredErr] = useState(false);
  const [detailsErr, setdetailsErr] = useState(false);
  const [netErr, setnetErr] = useState(null);

  const HandlerSubmit = () => {
    console.log(button.current);
    if (year.current.value && branch.current.value && heldin.current.value) {
      axios
        .post("https://result-management-backend.onrender.com/api/check", {
          year: year.current.value,
          branch: branch.current.value,
          heldin: heldin.current.value,
        })
        .then((res) => {
          if (res.data.message == "DatabaseFound") {
            console.log(res.data);
            setcredErr(false);
            navigate("/results", {
              state: {
                year: year.current.value,
                branch: branch.current.value,
                heldin: heldin.current.value,
              },
            });
          } else {
            console.log(res.data);
            setcredErr(true);
            setTimeout(() => {
              setcredErr(false);
            }, 3000);
          }
        })
        .catch((err) => {
          setnetErr(err.message);
          setTimeout(() => {
            setnetErr(null);
          }, 3000);
        });
    } else {
      console.log("enter cred");
      setdetailsErr(true);
      setTimeout(() => {
        setdetailsErr(false);
      }, 2000);
    }
  };
  return (
    <React.Fragment>
      <div className="mp_div">
        <main>
          <div className="notiDiv">
            <div className="notiPanel">
              <h1>Notifications</h1>
              <ul>
                <li>
                  Third Year Information Technology SEM V (2022) results
                  declared
                </li>
                <li>
                  Third Year Information Technology SEM V (2022) results
                  declared
                </li>
                <li>
                  Third Year Information Technology SEM V (2022) results
                  declared
                </li>
                <li>
                  Third Year Information Technology SEM V (2022) results
                  declared
                </li>
              </ul>
            </div>
          </div>
          <div className="instDiv">
            <div className="instPanel">
              <h1>Instructions</h1>
              <ol>
                <li>Check your hall-ticket for details </li>
                <li>Select the year of required result (eg. Third year)</li>
                <li>Select your branch (eg. Information Technology)</li>
                <li>Select when the exam was held in (eg. 2022)</li>
                <li>Click on the 'See results' button</li>
                <li>You will then see the list of students</li>
                <li>Search for the student using their seat number or Name</li>
                <li>Click on the respective students name</li>
                <li>You can see and also download the result in pdf format</li>
              </ol>
            </div>
          </div>
          <div className="stuDiv">
            <div className="stuPanel">
              <h1>Student Login</h1>
              <select name="year" id="year" ref={year} required>
                <option value="">Choose year</option>
                <option value="FE">First Year</option>
                <option value="SE">Second Year</option>
                <option value="TE">Third Year</option>
                <option value="BE">Final Year</option>
              </select>

              <select name="branch" id="branch" ref={branch} required>
                <option value="">Choose branch</option>
                <option value="IT">Information Technology</option>
                <option value="CS">Computer Science</option>
              </select>
              <select name="heldin" id="year" ref={heldin} required>
                <option value="">Held in</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
              </select>
              {credErr && !detailsErr ? (
                <div id="errmsg">
                  <p>check credentials</p>
                </div>
              ) : (
                ""
              )}
              {detailsErr ? (
                <div id="errmsg">
                  <p>enter credentials</p>
                </div>
              ) : (
                ""
              )}
              {netErr ? (
                <div id="errmsg">
                  <p>{netErr}</p>
                </div>
              ) : (
                ""
              )}

              <button ref={button} id="done" onClick={HandlerSubmit}>
                See Results
              </button>
              <Link to="/Teacher/Login" id="teacherloginlink">
                Login as teacher
              </Link>
            </div>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
}

export default MainPage;
