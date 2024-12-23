// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from 'react-oidc-context';
import App from './App';

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_vx4KtfYEy",
  client_id: '3t6ps7f32n947q67ovi1ikarjg',
  redirect_uri: 'https://dev.d29017v31a8sv8.amplifyapp.com/', // or your production URL
  response_type: 'code',
  scope: 'openid email profile', 
};

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
