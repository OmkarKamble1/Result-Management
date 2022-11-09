import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function SelectResults() {
    const [year, setYear] = useState(null)
    const [branch, setBranch] = useState(null)
    const [heldin, setHeldin] = useState(null)
    const [sem, setSem] = useState(null)
    const [step2, setStep2] = useState(false)
    const [sub1, setSub1] = useState(null)
    const [sub2, setSub2] = useState(null)
    const [sub3, setSub3] = useState(null)
    const [sub4, setSub4] = useState(null)
    const [sub5, setSub5] = useState(null)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(()=>{
        if(location.state == null ){
          window.alert('Not logged in')
          navigate('/Teacher/Login')
        }
      })

    const clickHandler = async () =>{
        if(sub1 && sub2 && sub3 && sub4 && sub5){
            await axios.post('http://localhost:8085/api/setdb', {
                    'year':year,
                    'branch': branch,
                    'heldin':heldin
            })
            .then((res) => {
                console.log(res.data)
            if(res.data.message == 'CollectionCreated'){
                    navigate('/Teacher/Results/Add', {state:{
                        'user': location.state.name, 
                        'examinfo': {
                            'year': year,
                            'branch':branch,
                            'heldin': heldin,
                            'sem': sem
                        },
                        'subjects':{
                            'sub1':sub1,
                            'sub2':sub2,
                            'sub3':sub3,
                            'sub4':sub4,
                            'sub5':sub5,
                        }
                    }})
                }else{
                    window.alert('try again')
                }
            })
            .catch((err) => window.alert(err.message))       
        }else{
            window.alert("Enter all subjects")
        } 
    }

  return (
    <div>
        <h2>Logged in as: {location.state.name}</h2>
        {step2 ? 
        <div>
            <h1>Enter Subjects</h1>
            <div>
                <h2>Subject 1</h2>
                <input type='text' onChange={(e) => setSub1(e.target.value)}/>
            </div>
            <div>
                <h2>Subject 2</h2>
                <input type='text' onChange={(e) => setSub2(e.target.value)}/>
            </div>
            <div>
                <h2>Subject 3</h2>
                <input type='text' onChange={(e) => setSub3(e.target.value)}/>
            </div>
            <div>
                <h2>Subject 4</h2>
                <input type='text' onChange={(e) => setSub4(e.target.value)}/>
            </div>
            <div>
                <h2>Subject 5</h2>
                <input type='text' onChange={(e) => setSub5(e.target.value)}/>
            </div>
            <button type='button' onClick={()=>{setStep2(false)}}>Back</button>
            <button type='button' onClick={clickHandler}>Continue</button>
        </div> : 
        <div>
        <div>
            <h1>Enter Year</h1>
            <select onChange={(e) => setYear(e.target.value)}>
                <option value="">Select year</option>
                <option>FE</option>
                <option>SE</option>
                <option>TE</option>
                <option>BE</option>
            </select>
        </div>
        <div>
            <h1>Enter Branch</h1>
            <select onChange={(e) => setBranch(e.target.value)}>
                <option value="">Select branch</option>
                <option>IT</option>
                <option>CS</option>
                <option>AIDS</option>
            </select>
        </div>
        <div>
            <h1>Enter Heldin</h1>
            <select onChange={(e) => setHeldin(e.target.value)}>
                <option value="">Select held in</option>
                <option>2020</option>
                <option>2021</option>
                <option>2022</option>
                <option>2023</option>
            </select>
    
        </div>
        <div>
            <h1>Enter Sem</h1>
            <select onChange={(e) => setSem(e.target.value)}>
                <option value="">Select sem</option>
                <option>I</option>
                <option>II</option>
                <option>III</option>
                <option>IV</option>
                <option>V</option>
                <option>VI</option>
                <option>VII</option>
                <option>VIII</option>
            </select>
        </div>
        <div>
            <button type='button' onClick={() => {
                if(year && branch && heldin){
                    setStep2(true)
                }
                else{
                    window.alert('Select all fields')
                }}}>Next</button>
        </div>
        </div>}
    </div>
  )
}

export default SelectResults