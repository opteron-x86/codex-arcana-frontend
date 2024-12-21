import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/globals.css";
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import config from '../amplify_outputs.json';

Amplify.configure(config);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);