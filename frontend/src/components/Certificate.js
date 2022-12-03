import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./css/Certificate.css";

function Certificate({ result }) {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  const ref = useRef();
  const handlerdownload = () => {
    const input = document.getElementById("content");
    html2canvas(input, { scale: 3 })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "px", [canvas.width, canvas.height]);

        pdf.addImage(imgData, "JPEG", 0, 0, canvas.height, canvas.width);
        pdf.save(`result-SEM ${data.exam.sem}.pdf`);
      })
      .catch((er) => console.log(er));
  };
  useEffect(() => {
    if (location.state == null) {
      window.alert("Not logged in");
      navigate("/");
    }
  }, []);
  return (
    <div className="outer-content">
      <div className="content" id="content" ref={ref}>
        <div className="innerdiv1">
          <div className="head">
            <img
              id="imgindead"
              src="http://pvppcoe.ac.in/assets/img/VISUAL%20ART%20LOGO%201.png"
            />
            <div className="inhead">
              <h2>VASANTDADA PATIL PRATISHTHAN'S</h2>
              <h2>COLLEGE OF ENGINEERING AND VISUAL ARTS</h2>
              <h3>
                Vasantdada Patil Complex, Eastern Express Highway, Sion, Mumbai
                400022
              </h3>
              <h4>
                Approved by AICTE, Govt. of Maharashtra, Affiliated to
                University of Mumbai
              </h4>
            </div>
          </div>
          <hr />
          <div className="innerdiv2">
            <h4>GRADE CARD</h4>
            <div className="innderdiv4">
              <table>
                <tr>
                  <td>NAME:</td>
                  <td>{data.name.toUpperCase()}</td>
                </tr>
                <tr>
                  <td>EXAMINATION:</td>
                  <td>
                    {data.exam.year} {data.exam.branch} SEM {data.exam.sem}
                  </td>
                </tr>
                <tr>
                  <td>HELD IN:</td>
                  <td>{data.exam.heldin}</td>
                </tr>
                <tr>
                  <td>SEAT NUMBER:</td>
                  <td>{data.seatno}</td>
                </tr>
              </table>
            </div>

            <div className="innerdiv5">
              <table>
                <tr>
                  <th className="lefttd">Subject</th>
                  <th>Marks</th>
                </tr>
                {data.result.subjects.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="lefttd">{item}</td>
                      <td>{data.result.marks[index]}</td>
                    </tr>
                  );
                })}
              </table>
            </div>

            <div className="innerdiv3">
              <h3>Remark: {data.remark}</h3>
              <h3>SGPI: {data.sgpi}</h3>
            </div>
          </div>
        </div>
      </div>
      {/* <div className='innerdiv6'>
        <button onClick={handlerdownload}>Download</button>
      </div> */}
    </div>
  );
}
export default Certificate;
