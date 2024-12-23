// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from 'react-oidc-context';
import App from './App';

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_vx4KtfYEy",
  client_id: '3t6ps7f32n947q67ovi1ikarjg',
  redirect_uri: 'http://localhost:3000', // or your production URL
  response_type: 'code',
  scope: 'openid email profile', 
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
