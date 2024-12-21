import { Link } from 'react-router-dom';
import { Sword, Shield, Scroll, Trophy, Flame } from 'lucide-react';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-[#1a1a24] text-gray-200">
      {/* Fixed top navigation with stronger visual presence */}
      <nav className="fixed w-full z-50 bg-[#0f0f16] shadow-lg shadow-black/50 border-b border-yellow-500/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-12">
              <div className="font-serif text-2xl bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent">
                Triple Triad
              </div>
              <div className="hidden md:flex gap-8">
                {['Guide', 'Cards', 'Rankings'].map((item) => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase()}`}
                    className="relative text-gray-400 hover:text-yellow-500 transition-colors 
                             after:content-[''] after:absolute after:-bottom-1 after:left-0 
                             after:w-0 after:h-0.5 after:bg-yellow-500 
                             after:transition-all hover:after:w-full"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
            
            <Link
              to="/auth"
              className="relative inline-flex px-8 py-2 font-serif text-lg text-yellow-500
                       before:content-[''] before:absolute before:inset-0
                       before:border-t before:border-b before:border-yellow-500/50
                       before:bg-gradient-to-r before:from-transparent 
                       before:via-yellow-500/10 before:to-transparent
                       hover:before:via-yellow-500/30 before:transition-all
                       after:content-[''] after:absolute after:inset-0
                       after:border-t after:border-b after:border-yellow-500/0
                       after:bg-gradient-to-r after:from-transparent 
                       after:via-yellow-500/0 after:to-transparent
                       hover:after:border-yellow-500/50 hover:after:via-yellow-500/20
                       after:transition-all after:delay-100
                       transform hover:scale-105 transition-transform"
            >
              Enter the Arena
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content with better spacing from navbar */}
      <main className="pt-24">
        {/* Hero Section with enhanced visuals */}
        <section className="relative min-h-[80vh] flex items-center">
          <div className="absolute inset-0 bg-[#0f0f16] skew-y-3 transform origin-top-right" />
          
          <div className="relative max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight">
                Where Strategy
                <span className="block mt-2 bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent">
                  Meets Legend
                </span>
              </h1>
              
              <p className="text-lg text-gray-400 max-w-lg">
                Enter a realm where ancient cards hold untold power. Master their secrets,
                challenge worthy opponents, and carve your name into history.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <Link
                  to="/auth"
                  className="group relative inline-flex items-center justify-center px-8 py-3 
                           font-serif text-lg text-yellow-500 overflow-hidden
                           before:content-[''] before:absolute before:inset-0
                           before:border-t before:border-b before:border-yellow-500/50
                           before:bg-gradient-to-r before:from-transparent 
                           before:via-yellow-500/10 before:to-transparent
                           hover:before:via-yellow-500/30 before:transition-all duration-500
                           after:content-[''] after:absolute after:inset-0
                           after:border-t after:border-b after:border-yellow-500/0
                           after:bg-gradient-to-r after:from-transparent 
                           after:via-yellow-500/0 after:to-transparent
                           hover:after:border-yellow-500/50 hover:after:via-yellow-500/20
                           after:transition-all after:duration-500 after:delay-100
                           transform hover:scale-105 transition-transform"
                >
                  <span className="relative flex items-center">
                    Begin Your Journey
                    <Sword className="ml-2 w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                  </span>
                </Link>
                
                <Link
                  to="/learn"
                  className="group relative inline-flex items-center justify-center px-8 py-3 
                           font-serif text-lg text-gray-400 overflow-hidden
                           before:content-[''] before:absolute before:inset-0
                           before:border-t before:border-b before:border-gray-500/30
                           before:bg-gradient-to-r before:from-transparent 
                           before:via-gray-500/5 before:to-transparent
                           hover:before:via-gray-500/20 before:transition-all duration-500
                           after:content-[''] after:absolute after:inset-0
                           after:border-t after:border-b after:border-gray-500/0
                           after:bg-gradient-to-r after:from-transparent 
                           after:via-gray-500/0 after:to-transparent
                           hover:after:border-gray-500/30 hover:after:via-gray-500/10
                           after:transition-all after:duration-500 after:delay-100
                           transform hover:scale-105 transition-transform"
                >
                  <span className="relative flex items-center">
                    Learn the Art
                    <Scroll className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Enhanced Card Preview Grid */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-transparent 
                           opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
              <div className="relative grid grid-cols-2 gap-4 p-6 bg-[#0f0f16]/80 rounded-lg 
                           border border-gray-800 backdrop-blur-sm">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 
                             rounded border border-gray-700 p-4 flex items-center justify-center
                             transform hover:scale-105 transition-transform duration-300
                             hover:border-yellow-500/30"
                  >
                    <span className="text-yellow-500/50 font-serif">Card {i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section with improved cards */}
        <section className="bg-[#0f0f16] py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-500/5 to-transparent" />
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "Strategic Mastery",
                  description: "Learn and master complex card combinations and tactical plays."
                },
                {
                  icon: <Trophy className="w-8 h-8" />,
                  title: "Competitive Arena",
                  description: "Rise through the ranks in intense player-versus-player battles."
                },
                {
                  icon: <Flame className="w-8 h-8" />,
                  title: "Legendary Cards",
                  description: "Collect and wield cards infused with ancient power."
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative p-6 border border-gray-800 rounded-lg 
                           bg-gradient-to-b from-gray-900/50 to-transparent
                           hover:border-yellow-500/30 transition-all duration-300
                           transform hover:translate-y-[-2px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/0 
                               to-yellow-500/0 group-hover:via-yellow-500/10 transition-all duration-500" />
                  <div className="relative">
                    <div className="relative h-8 w-8 mb-4">
                      <div className="absolute inset-0 flex items-center justify-center text-yellow-500
                                  transform origin-center group-hover:scale-125 transition-transform duration-300">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="font-serif text-xl text-yellow-500 mb-3">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Footer */}
        <footer className="border-t border-gray-800/50 py-8 bg-[#0f0f16]">
          <div className="max-w-7xl mx-auto px-6 text-center text-gray-500">
            <p>© 2024 Triple Triad. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Homepage;