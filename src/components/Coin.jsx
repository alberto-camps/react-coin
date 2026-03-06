
import { useParams } from "react-router-dom"
import { useEffect } from "react"

export default function Coin({coin, fav, setFav, view=''}) {

    const handleClick=()=>{
        if(fav.find((c) => c.id === coin.id)) {
            alert('Esta moneda ya está en favoritos')
            return 
        } 
        alert('Moneda añadida a favoritos correctamente')
        setFav([...fav,coin ])//guardar en fav 
}

    const handleClickDel=()=>{
      
        const newFavs = fav.filter((c) => c.id !== coin.id)
        alert(`${coin.id} eliminado de favoritos`)
        setFav(newFavs)//guardar en fav
}
    
  return (
    <div>
        <h2>{coin.name}</h2>
        {view==='home'?<button onClick={handleClick}>Añadir a favoritos</button>:""}
        {view==="fav"?<button onClick={handleClickDel}>Eliminar</button> :""}
        <p>{coin.symbol}</p>
        <p>{Math.floor(coin.priceUsd)}$</p>
    </div>
  )
}
