import { Link } from 'react-router-dom';
import { Sword, Shield, Scroll, Flame, Users, Trophy } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-ash-900 text-ash-100 relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-ember/10 via-transparent to-transparent opacity-50" />
      <div className="absolute inset-0 bg-[url('/path/to/texture.png')] opacity-5 mix-blend-overlay" />
      
      {/* Main content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="relative inline-block">
              <h1 className="font-serif text-6xl sm:text-8xl text-ember animate-ember-flicker mb-4">
                TRIPLE TRIAD
              </h1>
              <div className="absolute -inset-2 bg-ember/20 blur-lg animate-ember-pulse -z-10" />
            </div>
            
            <p className="text-xl sm:text-2xl text-ash-300 italic mb-8 max-w-2xl mx-auto">
              Where Strategy Meets Dark Fantasy
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link
                to="/auth"
                className="group relative px-8 py-4 bg-ember hover:bg-ember-600 text-ash-900 
                         font-serif text-lg rounded-lg transform hover:scale-105 
                         transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-ember-600 to-ember opacity-0 
                            group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">Begin Your Journey</span>
              </Link>
              
              <Link
                to="/about"
                className="px-8 py-4 border-2 border-ash-600 hover:border-ember 
                         text-ash-100 font-serif text-lg rounded-lg 
                         transform hover:scale-105 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-6 bg-gradient-to-b from-ash-900/0 via-ash-800/50 to-ash-900/0">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Sword className="w-8 h-8 text-ember" />,
                  title: "Strategic Combat",
                  description: "Master the art of card placement and element combinations in intense tactical battles."
                },
                {
                  icon: <Shield className="w-8 h-8 text-ember" />,
                  title: "Legendary Cards",
                  description: "Collect and wield cards inspired by fearsome creatures and legendary warriors."
                },
                {
                  icon: <Scroll className="w-8 h-8 text-ember" />,
                  title: "Dark Lore",
                  description: "Uncover the mysteries of a world shrouded in darkness and ancient magic."
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative p-6 bg-ash-800/30 rounded-lg border border-ash-700 
                           backdrop-blur-sm transition duration-300 hover:bg-ash-800/50
                           hover:border-ember/50"
                >
                  <div className="absolute -inset-px bg-gradient-to-b from-ember/0 to-ember/10 
                               opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                               rounded-lg -z-10" />
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="transform group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-ember font-serif text-xl">{feature.title}</h3>
                    <p className="text-ash-300">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { icon: <Users />, value: "10K+", label: "Players" },
                { icon: <Flame />, value: "50K+", label: "Battles Fought" },
                { icon: <Trophy />, value: "1K+", label: "Tournaments" },
                { icon: <Scroll />, value: "200+", label: "Unique Cards" },
              ].map((stat, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div className="text-ember mb-2">{stat.icon}</div>
                  <div className="font-serif text-2xl text-ember">{stat.value}</div>
                  <div className="text-ash-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;