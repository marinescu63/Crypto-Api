import React, { useEffect, useState } from "react";
import "./app.css"




const App = () => {
  const [currentPage, setCurrentPage] = useState(2);
  const [cryptoData, setCryptoData] = useState([]);
  const [prevCryptoData, setPrevCryptoData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchCryptoData = async () => {
    try {
      
      const respone = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=${currentPage}&sparkline=false');
      const data = await respone.json();

        setPrevCryptoData(cryptoData);
        setCryptoData(data);  
        setisLoading(false);
    }
      catch (error) {
        console.error("Error fetching crypto data:", error);
        setCryptoData(prevCryptoData);
        setisLoading(false);
      } 
  };
  useEffect(() => {
    fetchCryptoData();
  }, );

    const handleSearch = () => {
      return cryptoData.filter(
        (coin) => 
          coin.name.toLowerCase().includes(search) ||
          coin.symbol.toLowerCase().includes(search)

      )
    }

    

  return (
    <div>
    <div className="container heading">
      <h1>Cryptocurrency Market Data</h1>
      <form className="searchbar"> 
      <input placeholder="Search Coins" onChange={(e) =>setSearch(e.target.value)}/>
      
      </form>
      <table className="table table-bordered table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Symbol</th>
            <th scope="col">Current Price (USD)</th>
            <th scope="col">Highest 24h</th>
            <th scope="col">Lowest 24h</th>
          </tr>
        </thead>
        <tbody> 
          {handleSearch().map(coin => (
            
            <tr key={coin.id}>
              <td>{coin.market_cap_rank}</td>
              <td>{coin.name}</td>
              <td><img className="crypto-img" src={coin.image} alt="crypto-img"></img></td>
              <td>{coin.current_price}</td>
              <td>{coin.high_24h}</td>
              <td>{coin.low_24h}</td>
            </tr>
          ))}
          
        </tbody>
      </table>
           
      </div>
    </div>
          
    
  );
};


export default App;
