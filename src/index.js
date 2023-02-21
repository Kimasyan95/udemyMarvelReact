import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/App";
import MarvelService from "./components/services/MarvelService"; // импортировали скрипт с запросами
import "./style/style.scss";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
