import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="bg-purple-900/50 backdrop-blur-md border-b border-purple-500/30 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">★</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              طالع بینی
            </span>
          </Link>
          
          <div className="flex space-x-1 space-x-reverse">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/') 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' 
                  : 'text-purple-200 hover:bg-purple-800/50'
              }`}
            >
              صفحه اصلی
            </Link>
            <Link 
              to="/birth-chart" 
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/birth-chart') 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' 
                  : 'text-purple-200 hover:bg-purple-800/50'
              }`}
            >
              محاسبه طالع
            </Link>
            <Link 
              to="/profile" 
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/profile') 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' 
                  : 'text-purple-200 hover:bg-purple-800/50'
              }`}
            >
              پروفایل
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 