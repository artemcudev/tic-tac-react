import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import Game from "./App.js";
import Header from "./React.js";

ReactDOM.render(<Header />, document.getElementById("home"));
ReactDOM.render(<Game />, document.getElementById("root"));
//registerServiceWorker();