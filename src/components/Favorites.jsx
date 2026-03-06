import React from 'react'
import { Link } from 'react-router-dom'
import Coin from './Coin'

function Favorites({fav, setFav} ) {
  return (
    <div>
        <nav>
            <Link to="/">Home</Link>
        </nav>
        {fav.length === 0 ? (
            <h3>No hay elementos añadidos</h3>
        ):(
        <ul>
            {fav.map((coin)=>(
                <li key={coin.id}>
                    <Coin coin={coin} fav={fav} setFav={setFav} view='fav'/>
                </li>
            ))}
        </ul>
        )}
    </div>
  )
}

export default Favorites