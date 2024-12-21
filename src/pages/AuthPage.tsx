import { Authenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { darkFantasyTheme } from '../styles/auth-theme';
import { BonfireLoader, EmberParticles } from '../components/ui';
import noiseTexture from '../assets/svg/noise.svg';
import paperTexture from '../assets/svg/texture.svg';

const AuthPage = () => {
  const { authStatus } = useAuthenticator(context => [context.authStatus]);
  const navigate = useNavigate();

  useEffect(() => {
    if (authStatus === 'authenticated') {
      navigate('/dashboard');
    }
  }, [authStatus, navigate]);

  return (
    <div className="min-h-screen bg-ash-900 text-ash-100 relative overflow-hidden">
      {/* Background Effects */}
      <EmberParticles />
      <div className="absolute inset-0 bg-gradient-radial from-ember/10 via-transparent to-transparent opacity-50" />
      <div 
        className="absolute inset-0 opacity-5 mix-blend-overlay"
        style={{ backgroundImage: `url(${noiseTexture})` }}
      />
      <div 
        className="absolute inset-0 opacity-8 mix-blend-overlay"
        style={{ backgroundImage: `url(${paperTexture})` }}
      />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-black opacity-50" />

      {/* Auth Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-fade-up">
          <div className="text-center mb-8">
            <h1 className="font-fantasy text-4xl text-ember mb-2">Begin Your Journey</h1>
            <p className="font-body text-ash-300">Forge your path in the realm of Triple Triad</p>
          </div>

          <Authenticator 
            theme={darkFantasyTheme}
            components={{
              Header: () => null,
              Footer: () => null,
            }}
            className="!bg-transparent"
          >
            {({ signOut, user }) => (
              <div>
                {/* This should never render as we redirect on auth */}
                <BonfireLoader />
              </div>
            )}
          </Authenticator>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;