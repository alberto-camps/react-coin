
import { useParams } from "react-router-dom"
import { useEffect } from "react"
 
export default function DetailCoin({coin, setCoin}) {

    const {id}= useParams()

    useEffect(()=>{

        const getData= async ()=>{
            const url=`${import.meta.env.VITE_API_URL}/assets/${id}?apiKey=${import.meta.env.VITE_API_KEY}`
            const response =  await fetch(url)
            const datos = await response.json()
            setCoin(datos.data)

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
