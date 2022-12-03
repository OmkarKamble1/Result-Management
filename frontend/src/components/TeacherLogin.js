import React, { useState, useRef } from "react";
import "./css/TeacherLogin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TeacherLogin() {
  const email = useRef(null);
  const pass = useRef(null);
  const navigate = useNavigate();

  const [credErr, setcredErr] = useState(false);
  const [detailsErr, setdetailsErr] = useState(false);

  const handlerlogin = () => {
    if (email.current.value && pass.current.value) {
      axios
        .post(
          "https://result-management-backend.onrender.com/teacher/teacherlogin",
          { email: email.current.value, pass: pass.current.value }
        )
        .then((res) => {
          if (res.data.message == "teacherNotFound") {
            console.log(res.data);
            setcredErr(true);
            email.current.value = "";
            pass.current.value = "";
            setTimeout(() => {
              setcredErr(false);
            }, 3000);
          } else {
            navigate("/Teacher/Results/Select", {
              state: { name: email.current.value.toLowerCase() },
            });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      console.log("enter cred");
      setdetailsErr(true);
      setTimeout(() => {
        setdetailsErr(false);
      }, 3000);
    }
  };

  return (
    <div>
      <div className="center">
        <h1>Teacher Login</h1>
        <form>
          <div className="txt_field">
            <input
              onKeyPress={(e) => {
                if (e.key == "Enter") {
                  handlerlogin();
                }
              }}
              ref={email}
              type="text"
              placeholder="Email"
              className="username"
              required
            />
          </div>
          <div className="txt_field">
            <input
              onKeyPress={(e) => {
                if (e.key == "Enter") {
                  handlerlogin();
                }
              }}
              ref={pass}
              type="password"
              placeholder="Password"
              className="password"
              required
            />
          </div>
          {credErr && !detailsErr ? (
            <div id="errmsg1">
              <p>check credentials</p>
            </div>
          ) : (
            ""
          )}
          {detailsErr ? (
            <div id="errmsg1">
              <p>enter credentials</p>
            </div>
          ) : (
            ""
          )}
          <button type="button" onClick={handlerlogin} className="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default TeacherLogin;
