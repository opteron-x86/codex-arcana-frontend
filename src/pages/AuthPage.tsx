import { Authenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';

export default function AuthPage() {
  const { authStatus } = useAuthenticator(context => [context.authStatus]);
  const navigate = useNavigate();

  useEffect(() => {
    if (authStatus === 'authenticated') {
      navigate('/dashboard');
    }
  }, [authStatus, navigate]);

  return (
    <div className="min-h-screen bg-[#1a1a24] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Authenticator 
          socialProviders={[]}
          signUpAttributes={['email']}
          components={{
            Header: () => (
              <div className="text-center mb-6">
                <h1 className="font-serif text-3xl bg-gradient-to-r from-yellow-200 to-yellow-500 
                             bg-clip-text text-transparent">
                  Triple Triad
                </h1>
                <p className="text-gray-400 mt-2">Begin your journey</p>
              </div>
            ),
          }}

        />
      </div>
    </div>
  );
}