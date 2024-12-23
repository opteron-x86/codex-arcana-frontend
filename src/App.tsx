import { useAuth } from 'react-oidc-context';

function App() {
  const auth = useAuth();

  const signOutRedirect = () => {
    // If you want a full Cognito "Hosted UI" sign-out (redirect-based), do:
    const clientId = '3t6ps7f32n947q67ovi1ikarjg';
    const logoutUri = 'https://d84l1y8p4kdic.cloudfront.net'; // or your production URL
    const cognitoDomain = 'https://us-east-2vx4ktfyey.auth.us-east-2.amazoncognito.com';
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Error: {auth.error.message}</div>;
  }

  // If the user is authenticated, show token claims
  if (auth.isAuthenticated) {
    return (
      <div>
        <h1>Welcome!</h1>
        <pre>Email: {auth.user?.profile?.email}</pre>
        <pre>ID Token: {auth.user?.id_token}</pre>
        <pre>Access Token: {auth.user?.access_token}</pre>

        {/* 
          Option A: "auth.removeUser()" logs out in memory only. 
          Option B: "Hosted UI sign-out" fully invalidates tokens with Cognito. 
        */}
        <button onClick={() => auth.removeUser()}>Sign out (local only)</button>
        <button onClick={signOutRedirect}>Sign out (Cognito Hosted)</button>
      </div>
    );
  }

  // If not authenticated, show sign-in button
  return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
    </div>
  );
}

export default App;
