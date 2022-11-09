import React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import MainPage from "./MainPage";
import Navbar from "./Navbar";
import StudentList from './StudentList'
import Certificate from "./Certificate";
import TeacherLogin from "./TeacherLogin";
import Notfound from "./Notfound";
import AddResults from "./AddResults";
import SelectResults from './SelectResults'
import AddResultSubmit from "./AddResultSubmit";

function App() {
  return(
    <React.Fragment>
      <Navbar/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/results' element={<StudentList/>} />
        <Route path='/results/certificate' element={<Certificate />} />
        <Route path='/Teacher/Login' element={<TeacherLogin/>} />
        <Route path='/Teacher/Results/Add' element={<AddResults/>} />
        <Route path='/Teacher/Results/Select' element={<SelectResults/>} />
        <Route path='/Teacher/Results/Submit' element={<AddResultSubmit/>} />

        <Route path='/*' element={<Notfound/>} />
       </Routes>
    </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
