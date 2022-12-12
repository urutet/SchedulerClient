import './App.css';
import Navbar from './components/Navbar/Navbar';
import "./components/Navbar/Navbar.css"
import { Route, Routes } from "react-router-dom"
import Groups from './components/Groups/Groups';
import Faculties from './components/Faculties/Faculties';
import Teachers from './components/Teachers/Teachers';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import { useState } from 'react';
import Register from './Register/Register';
import Departments from './components/Departments/Departments';
import Auditoria from './components/Auditoria/Auditoria';
import ClassTimes from './components/ClassTimes/ClassTimes';
import Subjects from './components/Subjects/Subjects';
import GroupSchedule from './components/GroupSchedule/GroupSchedule';
import TeacherProfile from './components/TeacherProfile/TeacherProfile';

function App() {
  const [loginModal, setLoginModal] = useState(false); 
  const [registerModal, setRegisterModal] = useState(false); 

  return (
    <>
      <Navbar loginModal={loginModal} setLoginModal = {setLoginModal}/>
      <Routes>
        <Route path="/" element ={ <Groups /> }/>
        <Route path="/faculties" element ={ <Faculties /> }/>
        <Route path="/teachers" element ={ <Teachers /> }/>
        <Route path="/groups" element ={ <Groups /> } />
        <Route path="groups/:id" element = { <GroupSchedule/> } />

        <Route path="/teachers/:id" element = { <TeacherProfile/> } />
        <Route path="/departments" element = { <Departments /> } />
        <Route path="/dashboard" element = { <Dashboard /> } />
        <Route path="/auditoria" element = { <Auditoria /> } />
        <Route path="/classTimes" element = { <ClassTimes /> } />
        <Route path="/subjects" element = { <Subjects /> } />
      </Routes>
      {loginModal ? <Login loginModal={loginModal} setLoginModal = {setLoginModal} registerModal = {registerModal} setRegisterModal = {setRegisterModal}/> : ""}
      {registerModal ? <Register loginModal={loginModal} setLoginModal = {setLoginModal} registerModal = {registerModal} setRegisterModal = {setRegisterModal}/> : ""}
    </>
  );
}

export default App;
