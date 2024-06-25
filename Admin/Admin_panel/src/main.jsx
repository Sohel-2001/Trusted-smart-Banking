import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {createContext} from "react"



export const server = "http://localhost:5000/api/v1";

export const context = createContext({ isAuthenticated: false })

const Appwrapper = () => {

  const [adminisAuthenticated, setadminisAuthenticated] = useState(false);
  const [adminLoggedIn, setadminLoggedIn] = useState(false);
  const [user, setuser] = useState({user : null});

  return (
    <context.Provider value={{adminisAuthenticated, setadminisAuthenticated,user,setuser,adminLoggedIn, setadminLoggedIn}}>
      <App />
    </context.Provider>
  )

}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Appwrapper />
  </React.StrictMode>,
)

