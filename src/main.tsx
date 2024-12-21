import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Import AWS Amplify UI styles first
import '@aws-amplify/ui-react/styles.css';

// Then import our custom styles to override
import "./styles/globals.css";
import "./styles/auth.css";

// Import fonts
import '@fontsource/cinzel';
import '@fontsource/crimson-pro';
import '@fontsource/cormorant';
import '@fontsource/inter';

import { Amplify } from 'aws-amplify';
import config from '../amplify_outputs.json';

Amplify.configure(config);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);