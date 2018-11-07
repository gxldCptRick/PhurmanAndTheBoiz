import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
const baseUrl = "";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter basename={baseUrl}>
      <App />
    </BrowserRouter>,
    div
  );
});
