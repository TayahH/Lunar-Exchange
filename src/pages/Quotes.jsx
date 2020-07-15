// Import Modules
import React from "react";

// Import Components
import LoggedOutTable from "../components/LoggedOutTable";
import LoggedInTable from "../components/LoggedInTable";

export default function Quotes() {
  return (
      <QuotesDashboard />
  );
}

const token = localStorage.getItem("token")
function checkStatus(){
  if (token === null){
    return(
      <div className="quotes__banner__loggedout">
        <img className="header__image" src="../img/header.png" alt="Moon Phases Header" height="50px" width="auto"></img>
        <h2>Quotes</h2> 
        <br/>
        <LoggedOutTable />
      </div>
    )
  } 
  else{
    return(
      <div className="quotes__banner">
        <img className="header__image" src="../img/header.png" alt="Moon Phases Header" height="50px" width="auto"></img>
        <h2>Quotes</h2> 
        <br/>
        <LoggedInTable />
      </div>
    )
  }    
}

const QuotesDashboard = () => (
  <section className="quotes">
    {checkStatus()}
  </section>
);
