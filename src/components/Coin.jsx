

import { useParams } from "react-router-dom"
export default function Coin() {

    const {id}= useParams()

    useEffect(()=>{

        const getData= async ()=>{
            const url=`${import.meta.env.VITE_API_URL}assets?apiKey=YourApiKey${import.meta.env.VITE_API_KEY}/bitcoin`
            const response = fetch(url)
            const datos = await response.json()
            console.log(datos)
            //setCoin(datos)

        }
        getData()
    },[id])
    
  return (
    <div>
        <h2>{coin.name}</h2>
        <p>{coin.symbol}</p>
        <p>{Math.floor(coin.priceUsd)}$</p>

    </div>
  )
}
