import { Link } from "react-router-dom";
import Coin from "./Coin";

function Home({ data, fav, setFav }) {
  return (
    <div>
      <nav>
        <Link to="/favorites">Favoritos</Link>
      </nav>
      <ul>
        {data.map((coin) => (
          <li key={coin.id}>
            <Coin coin={coin} fav={fav} setFav={setFav} view="home" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;