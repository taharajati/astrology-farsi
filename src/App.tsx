import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProfileProvider } from './context/ProfileContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BirthChart from './pages/BirthChart';
import Profile from './pages/Profile';

function App() {
  return (
    <ProfileProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/birth-chart" element={<BirthChart />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ProfileProvider>
  );
}

export default App;
