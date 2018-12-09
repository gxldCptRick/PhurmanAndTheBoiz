import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import { JSDOM } from "jsdom";
import { LocalStorage } from "node-localstorage";
global.localStorage = new LocalStorage("./yes");

const { window } = new JSDOM();
const { document } = window;
const baseUrl = "";

describe("App Component Test", function() {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter basename={baseUrl}>
        <App />
      </MemoryRouter>,
      div
    );
  });
});
