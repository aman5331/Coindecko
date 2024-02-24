import React, { useState, useEffect } from "react";
import CoinTableRow from "./CoinTableRow";

const App = () => {
  const [coinData, setCoinData] = useState([]);

  useEffect(() => {
    // Fetch data from the API using async/await
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
        );
        const data = await response.json();
        setCoinData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div>
      <h1>Crypto Coin Data</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Image</th>
            <th>Symbol</th>
            <th>Current Price</th>
            <th>Total Volume</th>
          </tr>
        </thead>
        <tbody>
          {coinData.map((coin) => (
            <CoinTableRow key={coin.id} coinData={coin} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
