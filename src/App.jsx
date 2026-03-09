import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import DetailCoin from "./components/DetailCoin";
import Favorites from "./components/Favorites";

function App() {
  const [data, setData] = useState([]);
  const [coin, setCoin] = useState({});
  const initialFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const [fav, setFav] = useState(initialFavorites);

  //  Cargar monedas inicialmente y actualizar cada 30 segundos
  useEffect(() => {
    const getData = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/assets?apiKey=${import.meta.env.VITE_API_KEY}`;
        const response = await fetch(url);
        const datos = await response.json();
        setData(datos.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    // actualiza cada 30 segundos
    getData();
  }, []);

  //  Conectar WebSocket para precios en tiempo real
  useEffect(() => {
    if (data.length === 0) return;

    let ws;
    let mounted = true;

    const limitedData = data.slice(0, 20);
    const ids = limitedData.map((coin) => coin.id).join(",");

    const connect = () => {
      ws = new WebSocket(`wss://ws.coincap.io/prices?assets=${ids}`);

      ws.onmessage = (msg) => {
        if (!mounted) return;
        const prices = JSON.parse(msg.data);

        setData((prev) =>
          prev.map((coin) =>
            prices[coin.id] ? { ...coin, priceUsd: prices[coin.id] } : coin,
          ),
        );
      };

      ws.onerror = (err) => {
        ws.close();
      };

      ws.onclose = (event) => {
        if (!mounted) return;
        setTimeout(connect, 3000); // reconexión automática
      };
    };

    connect();

    return () => {
      mounted = false;
      ws && ws.close();
    };
  }, [data]);

  // Guardar favoritos en localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(fav));
  }, [fav]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home data={data} fav={fav} setFav={setFav} />}
        />

        <Route
          path="/coin/:id"
          element={
            <DetailCoin
              setCoin={setCoin}
              coin={coin}
              fav={fav}
              setFav={setFav}
            />
          }
        />

        <Route
          path="/favorites"
          element={<Favorites fav={fav} setFav={setFav} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;