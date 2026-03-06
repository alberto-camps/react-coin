import React from 'react'
import { useState,useEffect } from 'react'
import { BrowserRouter,Route,Routes}from "react-router-dom"
import Home from './components/Home'
import DetailCoin from './components/DetailCoin'
import Favorites from './components/Favorites'



function App() {

    const [data,setData]=useState([])//ESTADO INICIAL
    const [coin,setCoin]=useState({})
    const initialFavorites =JSON.parse(localStorage.getItem("favorites")) || []
    const [fav, setFav] = useState(initialFavorites)
   

    useEffect(()=>{

      const getData= async()=>{

        const url=`${import.meta.env.VITE_API_URL}/assets?apiKey=${import.meta.env.VITE_API_KEY}`
        const response= await fetch(url)
        const datos=  await response.json()
        setData(datos.data)
      }
       getData()


    },[])
    //guardaqr en lcst

    useEffect(() => {
      localStorage.setItem("favorites",JSON.stringify(fav))
    },[fav])
    
     return (
    <> 
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home data={data} fav={fav} setFav={setFav} />}></Route>
          <Route path='/coin/:id' element={<DetailCoin setCoin={setCoin} coin={coin}/>}></Route>
          <Route path='/favorites' element={<Favorites fav={fav} setFav={setFav}/>} />
        </Routes>
      </BrowserRouter>
      </>
  )
}

export default App