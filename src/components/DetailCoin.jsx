import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function DetailCoin({
  coin,
  setCoin,
  view = "home",
  fav,
  setFav,
}) {
  const [prevPrice, setPrevPrice] = useState(null);
  const [priceClass, setPriceClass] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const url = `${import.meta.env.VITE_API_URL}/assets/${id}?apiKey=${import.meta.env.VITE_API_KEY}`;
      const response = await fetch(url);
      const datos = await response.json();
      setCoin(datos.data);
    };
    getData();
  }, []);

  const price = Number(coin.priceUsd);

  // Detectar cambios de precio
  useEffect(() => {
    if (prevPrice === null) {
      setPrevPrice(price);
      return;
    }

    if (price > prevPrice) setPriceClass("price-up");
    else if (price < prevPrice) setPriceClass("price-down");

    const timeout = setTimeout(() => setPriceClass(""), 800);
    setPrevPrice(price); // actualizamos siempre el prevPrice
    return () => clearTimeout(timeout);
  }, [price]);

  // Formatear precio en USD
  const formatPrice = (price) => {
    const num = Number(price);
    if (isNaN(num)) return "$0.00";
    return num.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleClick = () => {
    if (fav.find((c) => c.id === coin.id)) {
      alert("Esta moneda ya está en favoritos");
      return;
    }
    alert("Moneda añadida a favoritos correctamente");
    setFav([...fav, coin]);
  };

  // Eliminar de favoritos
  const handleClickDel = () => {
    const newFavs = fav.filter((c) => c.id !== coin.id);
    alert(`${coin.id} eliminado de favoritos`);
    setFav(newFavs);
  };
  if (fav.find((c) => c.id === coin.id)) {
    view = "fav";
  }

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <div className={` coinCard ${priceClass}`}>
        <div className="text-rank">
          <p>{coin.rank}</p>
        </div>
        <img
          src={`https://assets.coincap.io/assets/icons/${coin.symbol?.toLowerCase()}@2x.png`}
          alt={coin.name}
          onError={(e) =>
            (e.target.src =
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMEAAACUCAMAAAAd373qAAAAMFBMVEXz9Pa5vsr29/ji5Om2u8jp6+/EyNLb3uO+w87t7vHY2uHm5+zw8fTIzNXT1t3Mz9h0Vr03AAACm0lEQVR4nO2b27qCIBBGdTgaHt7/bTdqligdRIppf/+61YjVwDAiVRUAAAAAAAAAAAAAAAAAAAAAAAAAAACAG5SDkgKNE+dxTanuk+q1rc9jtWmLxIGErWUGgdq3MhQJg8rx+y8ORRS6fAJewXy9/3QNwflATC3I7vsGZvr6PkMuGiaPrw+jyUDqJsNy4MZ8YN3XDS6zQYamYJDI/zNolRNGqDahKRYGvsCw0mOHhI6wMHBazgWGtOZwGDgYKL0qkMTRphgYtMO6wrPqYFPlDciFJc7lYKlc3qDqgyJb6ocfik+R8gbhIPKdeTCXSV2iVxgYdJsHnbiBr2ZlH7vEwOCtGJAbE1ZMobxBdXljHtA14/b7S+UNdrkodv+yZMi9QnkDP4yCQRSr9vwcWAT7bbJlYBCuyWa/HNB6V2A3nTkYkLjXRbGMGRjW9eYWDga+j0ttGqmK/CQOs+1mOvMwoFYJY+IbiGq/LxNMdh4GT27cDKGrwmqycDeICgQZiblBY2MCwarB26DZ1kyRucDNYJ0pqYkOoY0CMwPRifsIj2ShiAIrA3JW6lsUngyhq8Iky8mAlBzfZ6g5Ck+H0MS8587IgNTcL92MCi8jsORURgZLlS2tImpfRmDZFOBjIG4FqOyUeh0BbgbjJL73TW+LuR8wcAnvozgZUNKbTU4GKunNMh8DShlCrAwSBfgYuLcSD2OD7Z7dDxq8s3jBAAYwgMGnDbRMhcsTjhIuDTEviOUNTgKDRPIZFD7jpTKcUhOTwdGzDOcN5pOCgznPVNlmGY/HSH0meLAyDClnq07S5zQ4fqYnA683FQ8QPa7weYXORz8LtoyALyfMoHMwiKrYvyjaRmWgKfovEAAAAAAAAAAAAAAAAAAAAPAh/gAJ0y2FvSk2FQAAAABJRU5ErkJggg==")
          }
        />
        <div>
          <h3>{coin.name}</h3>
          <p>{coin.symbol}</p>
        </div>
        <div className={priceClass}>
          <p className="text-price">{formatPrice(coin.priceUsd)}</p>
        </div>
        <div
          className={`text-change ${
            Number(coin.changePercent24Hr) > 0
              ? "text-change-green"
              : "text-change-red"
          }`}
        >
          <p>{Number(coin.changePercent24Hr).toFixed(2)}%</p>
        </div>

        {view === "home" && <button onClick={handleClick}>⭐</button>}
        {view === "fav" && <button onClick={handleClickDel}>❌</button>}
      </div>
    </>
  );
}