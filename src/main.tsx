// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from 'react-oidc-context';
import App from './App';

const cognitoAuthConfig = {
  authority: process.env.REACT_APP_COGNITO_AUTHORITY,
  client_id: process.env.REACT_APP_COGNITO_CLIENT_ID,
  redirect_uri: process.env.REACT_APP_COGNITO_REDIRECT_URI,
  response_type: "code", // Typically fixed
  scope: process.env.REACT_APP_COGNITO_SCOPE,
};

if (!cognitoAuthConfig.authority || !cognitoAuthConfig.client_id || !cognitoAuthConfig.redirect_uri) {
  throw new Error("Cognito configuration is missing in environment variables!");
}

const container = document.getElementById('root');
if (!container) {
  throw new Error("Could not find 'root' element in the DOM");
}

const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
