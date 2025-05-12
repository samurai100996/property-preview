import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Properties from './pages/Properties';
import './App.css'; // Import your CSS file here
function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Header appears on all pages */}
        <Header />
        
        {/* Main content area */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;