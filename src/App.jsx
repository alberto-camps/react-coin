import React from 'react'
import { useState,useEffect } from 'react'
import { BrowserRouter,Route,Routes}from "react-router-dom"
import Home from './components/Home'
import Coin from './components/Coin'



function App() {

    const [data,setData]=useState([])
    const [coin,setCoin]=useState("")

    useEffect(()=>{

      const getData= async()=>{

        const url=`${import.meta.env.VITE_API_URL}/assets?apiKey=${import.meta.env.VITE_API_KEY}`
        const response= await fetch(url)
        const datos=  await response.json()
        setData(datos.data)
      }
       getData()


    },[])
  return (
    <> 
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home data={data}/>}></Route>
          {/* <Route path='/coin/:id' element={<Coin/>}></Route> */}
        </Routes>
      
      </BrowserRouter>

      <Home data={data}/>
      
      </>
  )
}

export default App