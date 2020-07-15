// Import Modules
import React from "react";

// Import Components
import StocksTable from "../components/StocksTable";

export default function Stocks() {
  return (
      <StocksDashboard />
  );
}

const StocksDashboard = () => (
  <section className="stocks">
    <div className="stocks__banner">
      <img className="header__image" src="../img/header.png" alt="Moon Phases Header" height="50px" width="auto"></img>
      <h2>Stocks</h2>
      <br/> 
      <h6>Explore over 495 different stocks below or filter by the industry dropdown for faster browsing</h6>
      <h6>You can also click on a stock to view detailed information</h6>
      <br/>
      <StocksTable />
    </div>
  </section>
);

