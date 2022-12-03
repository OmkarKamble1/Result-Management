import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './css/Notfound.css'

function Notfound() {
    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 3000);
    },[])
  return (
    <div>
        <h1 id='nfh1'>404</h1>
        <h2 id='nfh2'>NOT FOUND</h2>
        <h3 id='nfh3'>redirecting to home page...</h3>
    </div>
  )
}

export default Notfound