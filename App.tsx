import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { Gamepad2, Search, Home, Play, Info, Heart, Share2, Star, Menu, X, ArrowLeft, Loader2 } from 'lucide-react';

// --- TYPES ---
interface Game {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  embedUrl: string;
  description: string;
  rating: number;
  plays: string;
}

// --- DATA: 12 Real/Placeholder Embed Games ---
// Using Scratch embeds as they are reliable for demo purposes and allow cross-origin embedding often.
const GAMES: Game[] = [
  {
    id: '1',
    title: 'Cyber Racer 2077',
    category: 'Racing',
    thumbnail: 'https://picsum.photos/id/1/400/300',
    embedUrl: 'https://scratch.mit.edu/projects/10041696/embed', 
    description: 'Experience high-speed racing in a neon-lit cyberpunk future. Dodge obstacles and beat the clock!',
    rating: 4.8,
    plays: '1.2M'
  },
  {
    id: '2',
    title: 'Space Defender X',
    category: 'Shooter',
    thumbnail: 'https://picsum.photos/id/2/400/300',
    embedUrl: 'https://scratch.mit.edu/projects/119615/embed',
    description: 'Defend Earth from the alien invasion. Upgrade your ship and face massive bosses.',
    rating: 4.7,
    plays: '850K'
  },
  {
    id: '3',
    title: 'Block Puzzle Saga',
    category: 'Puzzle',
    thumbnail: 'https://picsum.photos/id/3/400/300',
    embedUrl: 'https://scratch.mit.edu/projects/10128431/embed',
    description: 'A classic block fitting game. Relaxing yet challenging gameplay for all ages.',
    rating: 4.5,
    plays: '2.1M'
  },
  {
    id: '4',
    title: 'Zombie Survival',
    category: 'Action',
    thumbnail: 'https://picsum.photos/id/4/400/300',
    embedUrl: 'https://scratch.mit.edu/projects/10014798/embed',
    description: 'Survive the endless waves of zombies. Scavenge for weapons and build your defenses.',
    rating: 4.6,
    plays: '500K'
  },
  {
    id: '5',
    title: 'Chess Master 3D',
    category: 'Strategy',
    thumbnail: 'https://picsum.photos/id/5/400/300',
    embedUrl: 'https://scratch.mit.edu/projects/10034604/embed',
    description: 'Test your strategic skills against an advanced AI or play with a friend.',
    rating: 4.9,
    plays: '300K'
  },
  {
    id: '6',
    title: 'Solitaire Gold',
    category: 'Card',
    thumbnail: 'https://picsum.photos/id/6/400/300',
    embedUrl: 'https://scratch.mit.edu/projects/10001090/embed',
    description: 'The classic card game you know and love, with a premium gold theme.',
    rating: 4.4,
    plays: '1.5M'
  },
  {
    id: '7',
    title: 'Basketball Pro',
    category: 'Sports',
    thumbnail: 'https://picsum.photos/id/7/400/300',
    embedUrl: 'https://scratch.mit.edu/projects/10002130/embed',
    description: 'Shoot some hoops! Realistic physics and competitive modes.',
    rating: 4.7,
    plays: '920K'
  },
  {
    id: '8',
    title: 'Ninja Run',
    category: 'Platformer',
    thumbnail: 'https://picsum.photos/id/8/400/300',
    embedUrl: 'https://scratch.mit.edu/projects/10045024/embed',
    description: 'Run, jump, and slice your way through dangerous obstacles as a nimble ninja.',
    rating: 4.6,
    plays: '1.1M'
  },
  {
    id: '9',
    title: 'Math Challenge',
    category: 'Educational',
    thumbnail: 'https://picsum.photos/id/9/400/300',
    embedUrl: 'https://scratch.mit.edu/projects/10051980/embed',
    description: 'Sharpen your brain with rapid-fire math problems. Fun and educational.',
    rating: 4.3,
    plays: '200K'
  },
  {
    id: '10',
    title: 'Pixel Artist',
    category: 'Creative',
    thumbnail: 'https://picsum.photos/id/10/400/300',
    embedUrl: 'https://scratch.mit.edu/projects/10134262/embed',
    description: 'Unleash your creativity. Draw pixel art and share it with the world.',
    rating: 4.5,
    plays: '150K'
  },
  {
    id: '11',
    title: 'Tank Wars',
    category: 'Action',
    thumbnail: 'https://picsum.photos/id/11/400/300',
    embedUrl: 'https://scratch.mit.edu/projects/323389/embed',
    description: 'Command your tank and destroy enemy battalions in this tactical shooter.',
    rating: 4.8,
    plays: '600K'
  },
  {
    id: '12',
    title: 'Fruit Slicer',
    category: 'Arcade',
    thumbnail: 'https://picsum.photos/id/12/400/300',
    embedUrl: 'https://scratch.mit.edu/projects/10064284/embed',
    description: 'Slice fruit, avoid bombs. The simple, addictive classic arcade experience.',
    rating: 4.6,
    plays: '3.4M'
  },
];

// --- COMPONENT: AdBanner ---
const AdBanner: React.FC<{ slot: string; format?: string; className?: string }> = ({ 
  slot, 
  format = 'auto', 
  className = '' 
}) => {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      // Check if adsbygoogle exists, if not, initialize it safely
      // @ts-ignore
      const adsbygoogle = window.adsbygoogle || [];
      // @ts-ignore
      window.adsbygoogle = adsbygoogle;
      
      // Push the ad
      adsbygoogle.push({});
    } catch (e) {
      console.error('AdSense Error:', e);
    }
  }, []);

  return (
    <div className={`w-full flex justify-center items-center my-6 overflow-hidden bg-brand-800 rounded-lg border border-brand-700 ${className}`}>
      <div className="text-center w-full">
        <span className="text-xs text-brand-500 uppercase tracking-widest mb-1 block">Advertisement</span>
        <ins
          className="adsbygoogle block"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-9774042341049510"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
        {/* Fallback visual for dev/blocker environments */}
        <div className="h-24 w-full flex items-center justify-center text-slate-600 text-sm">
           Ad Space (Visible on Live Site)
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT: Header ---
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-brand-900/95 backdrop-blur-md border-b border-brand-800 shadow-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg transform group-hover:rotate-12 transition-all duration-300">
            <Gamepad2 className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            FOG<span className="text-blue-500">2025</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors">
            <Home className="w-4 h-4" /> <span>Home</span>
          </Link>
          <div className="relative group">
            <button className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors">
              <Play className="w-4 h-4" /> <span>Categories</span>
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-brand-800 border border-brand-700 rounded-lg shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              {['Action', 'Puzzle', 'Racing', 'Strategy'].map(cat => (
                <Link key={cat} to={`/?category=${cat}`} className="block px-4 py-2 text-sm text-gray-300 hover:bg-brand-700 hover:text-white">
                  {cat}
                </Link>
              ))}
            </div>
          </div>
          <Link to="/popular" className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors">
            <Star className="w-4 h-4" /> <span>Popular</span>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-gray-300 hover:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-brand-800 border-b border-brand-700 animate-fade-in-down">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link to="/" className="block text-gray-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/popular" className="block text-gray-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>Popular</Link>
            <div className="pt-4 border-t border-brand-700">
              <span className="text-xs text-gray-500 uppercase">Categories</span>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {['Action', 'Puzzle', 'Racing', 'Strategy'].map(cat => (
                  <Link 
                    key={cat} 
                    to={`/?category=${cat}`} 
                    className="text-sm text-gray-300 hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

// --- COMPONENT: Footer ---
const Footer: React.FC = () => (
  <footer className="bg-brand-950 border-t border-brand-800 mt-auto">
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Gamepad2 className="text-blue-500 w-6 h-6" />
            <span className="text-xl font-bold text-white">FOG2025</span>
          </div>
          <p className="text-gray-400 text-sm">
            Play thousands of free online games, from racing to puzzle games. No downloads required.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4">Categories</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/?cat=Action" className="hover:text-blue-400">Action Games</Link></li>
            <li><Link to="/?cat=Racing" className="hover:text-blue-400">Racing Games</Link></li>
            <li><Link to="/?cat=Puzzle" className="hover:text-blue-400">Puzzle Games</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4">Legal</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
            <li><a href="#" className="hover:text-blue-400">Cookie Policy</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4">Connect</h3>
          <div className="flex space-x-4">
            {/* Social Icons Placeholder */}
            <div className="w-8 h-8 bg-brand-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
              <Share2 className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-brand-800 text-center text-gray-500 text-sm">
        © 2025 Free Online Games. All rights reserved.
      </div>
    </div>
  </footer>
);

// --- COMPONENT: Home Page ---
const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFilter = queryParams.get('category');

  const filteredGames = GAMES.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? game.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-900 to-brand-900 py-12 border-b border-brand-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Play the Best <span className="text-blue-500">Free Online Games</span>
          </h1>
          <div className="max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder="Search for games..."
              className="w-full px-6 py-4 rounded-full bg-brand-800 border border-brand-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-2xl transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* Ad Banner Top */}
        <AdBanner slot="1234567890" />

        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white flex items-center">
            {categoryFilter ? `${categoryFilter} Games` : 'Trending Now'}
            <div className="h-1 w-12 bg-blue-500 ml-4 rounded-full"></div>
          </h2>
          {!categoryFilter && (
            <Link to="/popular" className="text-sm text-blue-400 hover:text-blue-300">View All</Link>
          )}
        </div>

        {/* Game Grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredGames.map(game => (
              <Link 
                key={game.id} 
                to={`/game/${game.id}`}
                className="group bg-brand-800 rounded-xl overflow-hidden shadow-lg border border-brand-700 hover:border-blue-500 hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={game.thumbnail} 
                    alt={game.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold flex items-center space-x-2">
                      <Play className="w-4 h-4 fill-current" />
                      <span>Play Now</span>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-xs font-bold text-yellow-400 flex items-center">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    {game.rating}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-white truncate group-hover:text-blue-400 transition-colors">
                      {game.title}
                    </h3>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span className="bg-brand-900 px-2 py-1 rounded border border-brand-700">{game.category}</span>
                    <span>{game.plays} plays</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">No games found. Try a different search.</p>
          </div>
        )}

        {/* Ad Banner Bottom */}
        <AdBanner slot="0987654321" />
      </div>
    </div>
  );
};

// --- COMPONENT: Game Player Page ---
const GamePlayerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const game = GAMES.find(g => g.id === id);
  const [isLoading, setIsLoading] = useState(true);

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col">
        <h2 className="text-2xl font-bold mb-4">Game Not Found</h2>
        <button onClick={() => navigate('/')} className="text-blue-500 hover:underline">Return Home</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-6">
        {/* Navigation Breadcrumb */}
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Games
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Game Area */}
          <div className="lg:col-span-2">
            <div className="bg-black rounded-xl overflow-hidden shadow-2xl border border-brand-700 relative aspect-video">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-brand-900 z-10">
                  <div className="text-center">
                    <Loader2 className="w-10 h-10 text-blue-500 animate-spin mx-auto mb-4" />
                    <p className="text-gray-300">Loading {game.title}...</p>
                  </div>
                </div>
              )}
              <iframe
                src={game.embedUrl}
                title={game.title}
                className="w-full h-full border-0"
                allowFullScreen
                allow="autoplay; fullscreen; gamepad; accelerometer; gyroscope"
                onLoad={() => setIsLoading(false)}
              ></iframe>
            </div>

            {/* Game Info Bar */}
            <div className="mt-4 bg-brand-800 rounded-lg p-6 border border-brand-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white mb-2">{game.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span className="flex items-center"><Star className="w-4 h-4 text-yellow-500 mr-1" /> {game.rating}/5.0</span>
                  <span>•</span>
                  <span>{game.category}</span>
                  <span>•</span>
                  <span>{game.plays} Plays</span>
                </div>
              </div>
              <div className="flex space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-brand-700 hover:bg-brand-600 rounded-lg transition-colors text-white text-sm font-medium">
                  <Heart className="w-4 h-4 text-red-500" /> <span>Like</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors text-white text-sm font-medium shadow-lg shadow-blue-500/30">
                  <Share2 className="w-4 h-4" /> <span>Share</span>
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-white mb-2">About this game</h3>
              <p className="text-gray-400 leading-relaxed bg-brand-800/50 p-4 rounded-lg border border-brand-700/50">
                {game.description}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <AdBanner slot="1122334455" format="rectangle" />
            
            <div className="bg-brand-800 rounded-xl p-4 border border-brand-700">
              <h3 className="font-bold text-white mb-4 flex items-center">
                <Play className="w-4 h-4 mr-2 text-blue-500" /> Similar Games
              </h3>
              <div className="space-y-4">
                {GAMES.filter(g => g.category === game.category && g.id !== game.id).slice(0, 4).map(similar => (
                  <Link key={similar.id} to={`/game/${similar.id}`} className="flex space-x-3 group">
                    <img src={similar.thumbnail} alt={similar.title} className="w-20 h-14 object-cover rounded-md group-hover:opacity-80 transition-opacity" />
                    <div>
                      <h4 className="font-medium text-gray-200 text-sm group-hover:text-blue-400 line-clamp-1">{similar.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{similar.rating} ★</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP LAYOUT ---
function App() {
  return (
    <div className="bg-brand-900 text-gray-100 font-sans min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game/:id" element={<GamePlayerPage />} />
          <Route path="/popular" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;