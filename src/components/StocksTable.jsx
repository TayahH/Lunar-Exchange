// Import Modules
import React, {useState, useEffect} from "react";
import { AgGridReact } from "ag-grid-react";
import { Dropdown } from "semantic-ui-react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";

// Import Styles
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css"; 

// Import pages
import Quotes from "../pages/Quotes.jsx";

// Data Table
export default function StocksTable() {
    const history = useHistory();
    const[industryChoice, setIndustryChoice] = useState('');
    const[search, setSearch] = useState('');
    const[rowData, setRowData] = useState([]);

    const columns = [
        { headerName: "Name", field: "name", sortable: true },
        { headerName: "Symbol", field: "symbol", sortable: true },
        { headerName: "Industry", field: "industry", sortable: true },
    ];

    const searchIndustry = (event, {value}) => {
      setIndustryChoice(value);
      setSearch('')
    }

    const DropdownSearchSelection = () => (
      <Dropdown
        placeholder="Select Industry..."
        search
        selection
        options={industryOptions}
        onChange={searchIndustry}
        value={industryChoice}
      />
    );

    const InputSearchSelection = () => (
        <form onSubmit={e => { e.preventDefault(); }}>
            <input type="text" 
            id="searchBox" 
            value={search} 
            placeholder="Filter..."
            autoFocus={true}
            autoComplete="off"
            onChange = {event => {
                const { value } = event.target;
                setSearch(value);
                if (value === ""){
                    setIndustryChoice('/')
                } 
                else {
                    setIndustryChoice("?industry=" + value);
                }
              }}
            />
        </form>
    )

    const API_URL = "http://131.181.190.87:3000"

    // Fetch API Data
    useEffect(() => {
        const url = `${API_URL}/stocks/symbols${industryChoice}`

        fetch(url, {
            method: "GET",
            headers: {accept: "application/json"},
        })
        
        .then((res) => res.json())
        .then(data =>
            data.map(stock => {
                return {
                    name: stock.name,
                    symbol: stock.symbol,
                    industry: stock.industry,
                };
            })
        )
        .catch(e => {})
        .then(stock => setRowData(stock));

    }, [industryChoice]);

    // Dropdown industry choices
    const industryOptions = [
        { key: "as", value: "/", text: "View All Industries" },
        { key: "dc", value: "?industry=consumer%20discretionary", text: "Consumer Discretionary" },
        { key: "ds", value: "?industry=consumer%20staples", text: "Consumer Staples" },
        { key: "en", value: "?industry=energy", text: "Energy" },
        { key: "fi", value: "?industry=financials", text: "Financials" },
        { key: "hc", value: "?industry=health%20care", text: "Health Care" },
        { key: "in", value: "?industry=industrials", text: "Industrials" },
        { key: "it", value: "?industry=information%20technology", text: "Information Technology" },
        { key: "ma", value: "?industry=materials", text: "Materials" },
        { key: "re", value: "?industry=real%20estate", text: "Real Estate" },
        { key: "ts", value: "?industry=telecommunication%20services", text: "Telecommunication Services" },
        { key: "ut", value: "?industry=utilities", text: "Utilities" },
    ];

    // HTML
    return (
    <div className="stocksFilter">
        <div className="ag-theme-balham" >
            <div className="searchOptions">
                <div className="form-inline">
                    <InputSearchSelection />
                    <h5>OR</h5>
                    <DropdownSearchSelection />
                    <br/>
                </div>
            </div>
            <Router>
                <Switch>
                    <Route exact path="/Quotes">
                        <Quotes/>
                    </Route>
                </Switch>
            </Router>
            <AgGridReact
                columnDefs={columns}
                rowData={rowData}
                pagination={true}
                paginationPageSize={11}
                rowSelection="single"
                onRowClicked = {row => history.push(`/Quotes/${row.data.symbol}`)}
               /> 
         </div>
    </div>
    );
    }



