 //import react into the bundle
import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./component/home";
import "../styles/index.css";

//render your react application
ReactDOM.createRoot(document.getElementById('app')).render(<Home/>);
