import React from "react";
import { Link } from "react-router-dom";
import Coin from "./Coin";

function Favorites({ fav, setFav }) {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      {fav.length === 0 ? (
        <h3 className="text-center">No hay elementos añadidos</h3>
      ) : (
        <div>
          <h2 className="text-center">Favoritos</h2>
          <ol>
            {fav.map((coin) => (
              <li key={coin.id}>
                <Coin coin={coin} fav={fav} setFav={setFav} view="fav" />
              </li>
            ))}
          </ol>
          <Link to="/" className="Link">
            ⬅️ Volver
          </Link>
        </div>
      )}
    </div>
  );
}

export default Favorites;