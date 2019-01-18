import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from "mobx-react"
import App from "./src/js/app"
import store from "./src/store"

const root = document.getElementById("root")

ReactDOM.render(
  <Router>
    <Provider {...store}>
      <App />
    </Provider>
  </Router>,
  root
)
