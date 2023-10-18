import React from "react";
import { Provider } from "react-redux";
import store from "./app/store";
import App from "./App";

// import "./index.css";

import { BrowserRouter } from "react-router-dom";

function Root() {
  return (
    <Provider store={store}>
        <BrowserRouter>
      <App />
        </BrowserRouter>
    </Provider>
  );
}

export default Root;
