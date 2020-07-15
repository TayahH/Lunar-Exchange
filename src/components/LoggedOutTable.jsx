// Import Modules
import React, {useState, useEffect} from "react";
import { AgGridReact } from "ag-grid-react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useParams } from "react-router-dom";

// Import Styles
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css"; 

// Import Pages
import Login from "../pages/Login.jsx";

// Data Table
export default function LoggedOutTable() {
    const[ rowData, setRowData ] = useState([]);
    const[name, setName] = useState();
    const { symbol } = useParams();

    // Table Columns
    const columns = [
        { headerName: "Date", field: "date", sortable: true },
        { headerName: "Open", field: "open", sortable: true },
        { headerName: "High", field: "high", sortable: true },
        { headerName: "Low", field: "low", sortable: true },
        { headerName: "Close", field: "close", sortable: true },
        { headerName: "Volumes", field: "volumes", sortable: true },
    ];

    // Fetch API Data
    useEffect(() => {
        const API_URL = "http://131.181.190.87:3000"
        const url = `${API_URL}/stocks/${symbol}`

        const search = fetch(url, {
            method: "GET",
            headers: {accept: "application/json"},
        })
        
        const results = search.then((res) => res.json())
        results.then(res => {
            return {
                date: res.timestamp.slice(0,10),
                open: res.open,
                high: res.high,
                low: res.low,
                close: res.close,
                volumes: res.volumes,
            };
        })
        .catch(e => {})
        .then(stock => setRowData([stock]));

         // Name Data
         results.then(name => {
            return name.name})
        .then(name => setName(name))

    }, []);
    
    // HTML
    return (
    <div className="quotesFilter">
        <div className="ag-theme-balham" >
            <div className="quotes__title">
                <h1>{symbol} - {name}</h1>
                <br/>
                <Router>
                    <Switch>
                        <Route exact path="/login">
                            <Login />
                        </Route>
                    </Switch>
                </Router>
                <Link to="/Login"><h6><span role="img" aria-label="Lock">🔒</span>Login to Access Stock History</h6></Link>
                <br/>
            </div>
            <AgGridReact
                columnDefs={columns}
                rowData={rowData}
                pagination={true}
                paginationPageSize={11}
                colWidth={120}
            />
        </div>
    </div>

  );
}


