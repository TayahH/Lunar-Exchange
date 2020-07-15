// Import Modules
import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Form, Button } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import { useParams } from "react-router-dom";

// Import Styles
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css"; 

// Data Table
export default function LoggedInTable() {
    const[response, setResponse]= useState(null)
    const[rowData, setRowData] = useState([]); 
    const[fromDate, setFromDate] = useState(null);
    const[toDate, setToDate] = useState(null);
    const[betweenDates, setBetweenDates] = useState('');
    const[openingData, setOpeningData] = useState();
    const[closingData, setClosingData] = useState();
    const[volumes, setVolumes] = useState();
    const[dates, setDates] = useState();
    const[name, setName] = useState();
    const { symbol } = useParams();

    // Table Columns
    const columns = [
        { headerName: "Date", field: "date", sortable: true},
        { headerName: "Open", field: "open", sortable: true},
        { headerName: "High", field: "high", sortable: true},
        { headerName: "Low", field: "low", sortable: true},
        { headerName: "Close", field: "close", sortable: true},
        { headerName: "Volumes", field: "volumes", sortable: true},
    ];

    // Opening and Closing Chart Data
    const data = {
        labels: dates,
        datasets: [
        {
            label: 'Closing Data',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(74,38,146,0.4)',
            borderColor: 'rgba(74,38,146,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(74,38,146,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(74,38,146,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: closingData
        },
        {
            label: 'Opening Data',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: openingData
        }
        ]
      };
    
      // Opening and Closing Chart Options
    const options = {
    responsive: true,
    title: {
        display: true,
        text: `Opening and Closing Data ${betweenDates}`
    }}
    
    // Volumes Chart Data
    const volumesData = {
        labels: dates,
        datasets: [
        {
            label: 'Volumes',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(77, 132, 213, 0.4)',
            borderColor: 'rgba(77, 132, 213, 1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(77, 132, 213, 1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(77, 132, 213, 1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: volumes
        }]}
    
    // Volumes Chart Options
    const volumesOptions = {
        responsive: true,
        title: {
            display: true,
            text: `Volumes ${betweenDates}`
        }}

    // Fetch API Data
    useEffect(() => {
        const API_URL = "http://131.181.190.87:3000"

        if (fromDate === null && toDate === null){
            const url = `${API_URL}/stocks/${symbol}`
            setBetweenDates('')
            setResponse('This is our most recent data, choose a date range to see more information')

            const search = fetch(url, {accept: "application/json"})

            const results = search.then((res) => res.json())
            
            // Name Data
            results.then(name => {
                return name.name})
            .then(name => setName(name))

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
            .then(stock => setRowData([stock]))
            }

        else{
            setBetweenDates(`between ${fromDate} and ${toDate}`)
            const searchFromDate = "?from=" + fromDate 
            const searchToDate = "&to=" + toDate     
            const token = localStorage.getItem("token")
            const headers = { 
                accept: "application/json", 
                "Content-Type": "application/json", 
                Authorization: `Bearer ${token}`
            }
            
            const url = `${API_URL}/stocks/authed/${symbol}${searchFromDate}${searchToDate}`
            const search = fetch(url, { headers })
            const results = search.then((res) => res.json())

            // Table Data
            results.then(data =>
                data.map(stock => {
                    return {
                        date: stock.timestamp.slice(0,10),
                        open: stock.open,
                        high: stock.high,
                        low: stock.low,
                        close: stock.close,
                        volumes: stock.volumes,
                    };
                }))
            .catch(e => {setResponse("We have no saved data between those dates")})
            .then(stock => setRowData(stock))

            // Closing Data
            results.then(data =>
                data.reverse().map(closing => {
                    return closing.close;
                }))
            .catch(e => {setResponse("We have no saved data between those dates")})
            .then(closing => setClosingData(closing))

            // Opening Data
            results.then(data =>
                data.map(opening => {
                    return opening.open;
                }))
            .catch(e => {setResponse("We have no saved data between those dates")})
            .then(opening => setOpeningData(opening))

            // Date data
            results.then(data =>
                data.map(date => {
                    return date.timestamp.slice(0,10);
                }))
            .catch(e => {setResponse("We have no saved data between those dates")})
            .then(date => setDates(date))
            
            // Volumes Data
            results.then(data =>
                data.map(volumes => {
                    return volumes.volumes;
                }))
            .catch(e => {setResponse("We have no saved data between those dates")})
            .then(volumes => setVolumes(volumes))

        }  
    }, [fromDate, toDate]);  

    function submit(fromDate, toDate){
        if (fromDate > toDate){
            setResponse("Your 'From' date occurs before your 'To' date, try switching them")
            setRowData()
        }
        else if (fromDate === toDate){
            setResponse("Please select a range of dates to see stock details")
            setRowData()
        }
        else{
            setResponse("")
            setRowData()
            setFromDate(fromDate)
            setToDate(toDate)
        }
    }

    // HTML 
    return (
    <div className="quotesFilter">
        <div className="ag-theme-balham" >
            <div className="quotes__title">
                <h1>{symbol} - {name}</h1>
                <br/>
                <Form className="form" onSubmit={e => 
                    {e.preventDefault();
                    const fromDate = (e.target.elements.fromDate.value);
                    const toDate = (e.target.elements.toDate.value);
                    submit(fromDate, toDate)}}>
                    <div className="form-inline">
                        <h5>From:</h5>
                        <input type="date" 
                        name="fromDate"
                        id="fromDate"/>
                        <h5>To:</h5>
                        <input type="date"
                        name="toDate" 
                        id="toDate" />
                        <Button>Search</Button> 
                    </div>
                </Form>
                <br/>
                {response != null ? <h5>{response}</h5> : null}
            </div>
            <AgGridReact
                columnDefs={columns}
                rowData={rowData}
                pagination={true}
                paginationPageSize={11}
                colWidth={120}
            />
            <br/>
            <br/>
            <div className="Chart">
                <Line data={data} options={options}/>
            </div>
            <br/>
            <br/>
            <div className="Chart">
                <Line data={volumesData} options={volumesOptions}/>
            </div>
        </div>
    </div>

  );
}