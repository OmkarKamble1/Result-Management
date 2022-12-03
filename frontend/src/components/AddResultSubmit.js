import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function AddResultSubmit() {
  const navigate = useNavigate()
    useEffect(()=>{
        setTimeout(() => {
            navigate('/')
        }, 3000);
    },[])
  return (
    <div>
        <h1 style={{marginTop:'150px'}}>All the results are added successfully</h1>
        <h2 style={{marginTop:'60px'}}>Thank you !</h2>
    </div>
  )
}

export default AddResultSubmit