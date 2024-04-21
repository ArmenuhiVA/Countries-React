// import { useState } from 'react'
// import './App.css'
import Countries from "./components/countries"
import { Link } from "react-router-dom"
import { Route, Routes } from "react-router-dom"
import Countryname from "./components/countryname"




function App() {

  return (
    <>
      <header className="border-b-2  flex items-center justify-center gap-3">
        <Link to='/'> Home</Link>
        <Link to='/country/:name'>Country Details</Link>
        <Link to= '/country/:name/alpha/*'> </Link>
      </header>

      <Routes>
        <Route path='/' element={<Countries />} />
        <Route path='/country/:name' element={<Countryname />} />
        <Route path='/country/:name/alpha/*' element={<Countryname />} />
      </Routes>
    </>
  )
}

export default App
