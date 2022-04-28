import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
// The url module provides two APIs for working with URLs: a legacy API that is Node.js specific, 
  // and a newer API that implements the same WHATWG URL Standard used by web browsers.
// import url from "url";
import pkg from "../package.json";

const siteURL = pkg.homepage;
const basename = siteURL ? new URL(siteURL).pathname : "";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// module.exports = {
//   resolve: {
//     fallback: { "url": require.resolve("url/") }
//   }
// }