import Coin from "./Coin"


function Home({data}) {
  return (
    <div>
         <ul>
            {data.map((coin)=>(
                 <li key={coin.id}>

                    <Coin coin={coin}/>
                    
                </li>
            )
                )}
         </ul>


    </div>
  )
}

export default Home