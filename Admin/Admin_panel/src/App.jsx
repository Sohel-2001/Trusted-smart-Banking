import React, { useContext, useEffect } from 'react'
import Admin_login from './components/Admin_login'
import AdminUpdate from './components/AdminUpdate'
import TotalUsers from './components/TotalUsers'
import Ongoing_loans from './components/Ongoing_loans'
import AdminHome from './components/AdminHome'
import AccountCreationRequests from './components/AccountCreationRequests'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { context, server } from './main'
import axios from 'axios'


const App = () => {


  const { setuser ,user,adminisAuthenticated, setadminisAuthenticated,adminLoggedIn, setadminLoggedIn} = useContext(context);

  useEffect(() =>{

    axios.get(`${server}/admins/me`,{
      withCredentials : true,
    })
    .then((res) =>{ 
      

        setuser(res.data.admin);

        setadminisAuthenticated(true)
        // console.log(res);

        // setisAuthenticated(true);

    })
    .catch(() => {
      setuser({});
      setadminisAuthenticated(false);
    })
  },[setuser,setadminisAuthenticated])
  // useEffect(() =>{

  //   if(adminLoggedIn){
  //     setadminisAuthenticated(true);


  //   }

  //   else{
  //     setadminisAuthenticated(false)
  //   }

   
  //   }
  // ,[setuser,setadminisAuthenticated,setadminLoggedIn])

  return (
    <Router>
    <Routes>
      {/* <Route path='/' element={<Home/>}/> */}
      <Route path='/adminUpdate' element={<AdminUpdate/>}/>
      <Route path='/' element={<Admin_login/>}/>
      <Route path='/adminhome' element={<AdminHome/>}/>
      <Route path='/totalUsers' element={<TotalUsers/>}/>
      <Route path='/ongoing_loans' element={<Ongoing_loans/>}/>
      <Route path='/user_verification' element={<AccountCreationRequests/>}/>
    </Routes>
  </Router>
  )
}

export default App