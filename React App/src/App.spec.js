import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { JSDOM } from "jsdom";
import { LocalStorage } from "node-localstorage";
global.localStorage = new LocalStorage("./yes");
//import App from "./App";

const { window } = new JSDOM();
const { document } = window;
const baseUrl = "";

describe("App Component Test", function() {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter basename={baseUrl}>
        
      </MemoryRouter>,
      div
    );
  });
});
