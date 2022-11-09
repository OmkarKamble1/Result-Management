import axios from 'axios'
import React, { useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function AddResults() {
    const location = useLocation()
    const navigate = useNavigate()
    const [name, setName] = useState(null)
    const [seatno, setSeatno] = useState(null)
    const [marks1, setMarks1] = useState(null)
    const [marks2, setMarks2] = useState(null)
    const [marks3, setMarks3] = useState(null)
    const [marks4, setMarks4] = useState(null)
    const [marks5, setMarks5] = useState(null)
    const [sgpi, setSgpi] = useState(null)
    const [remark, setRemark] = useState(null)

    const {user, 
      examinfo: {year, branch, heldin, sem}, 
      subjects: {sub1, sub2, sub3, sub4, sub5}} = location.state

    useEffect(()=>{
      if(location.state == null ){
        window.alert('Not logged in')
        navigate('/Teacher/Login')
      }
    })
    
    const nextHandler = async () =>{
      if(name && seatno && marks1 && marks2 && marks3 && marks4 && marks5 && sgpi && remark){
          axios.post('http://localhost:8085/api/addresult',{
            name: name,
            seatno:seatno,
            exam:{
              branch:branch,
              sem:sem,
              heldin:heldin,
              year:year
            },
            remark:remark,
            sgpi:sgpi,
            result:{
              sub1:[sub1, marks1],
              sub2:[sub2, marks2],
              sub3:[sub3, marks3],
              sub4:[sub4, marks4],
              sub5:[sub5, marks5],
            }            
          })
          .then((res) => {
            if(res.data.message == 'ResultAdded'){
              window.confirm("Result added")
              document.getElementById('stname').value=''
              document.getElementById('stseat').value=''
              document.getElementById('stsub1').value=''
              document.getElementById('stsub2').value=''
              document.getElementById('stsub3').value=''
              document.getElementById('stsub4').value=''
              document.getElementById('stsub5').value=''
              document.getElementById('stsgpi').value=''
              document.getElementById('stremark').value=''
            }
            else{
              window.confirm("Please try submitting again")
            }
          })
          .catch((err) => window.alert(err.message))
      }else{
        window.alert("Fill all fields")
      }
    }

    const submitHandler = async () =>{
      if(name && seatno && marks1 && marks2 && marks3 && marks4 && marks5 && sgpi && remark){
          axios.post('http://localhost:8085/api/addresult',{
            name: name,
            seatno:seatno,
            exam:{
              branch:branch,
              sem:sem,
              heldin:heldin,
              year:year
            },
            remark:remark,
            sgpi:sgpi,
            result:{
              sub1:[sub1, marks1],
              sub2:[sub2, marks2],
              sub3:[sub3, marks3],
              sub4:[sub4, marks4],
              sub5:[sub5, marks5],
            }            
          })
          .then((res) => {
            if(res.data.message == 'ResultAdded'){
              window.confirm("Result added")
              navigate('/Teacher/Results/Submit')
            }
            else{
              window.confirm("Please try submitting again")
            }
          })
          .catch((err) => window.alert(err.message))
      }else{
        window.alert("Fill all fields")
      }
    }

  return (
    <div>
      <h1>Logged in as: {user}</h1>
      <div>
        <h4>Year: {year}</h4>
        <h4>Branch: {branch}</h4>
        <h4>Held in: {heldin}</h4>
        <h4>Sem: {sem}</h4>
      </div>
      <div>
        <div>
            <h2>Name: </h2>
            <input id='stname' type='text' onChange={(e) => setName(e.target.value)}/>
            <h2>Seat No. </h2>
            <input id='stseat' type='text' onChange={(e) => setSeatno(e.target.value)}/>
        </div>
        <section>
        <div>
            <h2>{sub1}</h2>
            <input id='stsub1' type='text' onChange={(e) => setMarks1(e.target.value)}/>
        </div>
        <div>
            <h2>{sub2}</h2>
            <input id='stsub2' type='text' onChange={(e) => setMarks2(e.target.value)}/>
        </div>
        <div>
            <h2>{sub3}</h2>
            <input id='stsub3' type='text' onChange={(e) => setMarks3(e.target.value)}/>
        </div>
        <div>
            <h2>{sub4}</h2>
            <input id='stsub4' type='text' onChange={(e) => setMarks4(e.target.value)}/>
        </div>
        <div>
            <h2>{sub5}</h2>
            <input id='stsub5' type='text' onChange={(e) => setMarks5(e.target.value)}/>
        </div>
        <div>
            <h2>SGPI: </h2>
            <input id='stsgpi' type='text' onChange={(e) => setSgpi(e.target.value)}/>
        </div>
        <div>
            <h2>Remark: </h2>
            <select id='stremark' onChange={(e) => setRemark(e.target.value)}>
              <option value=''>select remark</option>
              <option value='pass'>PASS</option>
              <option value='fail'>FAIL</option>
            </select>
        </div>

        </section>
      </div>
 
      <div>
        <button type='button' onClick={nextHandler}>Next</button>
        <button type='button' onClick={submitHandler}>Submit</button>
      </div>
    </div>
  )
}

export default AddResults