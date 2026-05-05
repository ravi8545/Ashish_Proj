import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './presentation/HomePage.jsx';
import Particles from './components/three/Particles.jsx';
import { PortfolioProvider } from './context/PortfolioContext.jsx';

export default function App() {
  return (
    <PortfolioProvider>
      <div className="relative min-h-screen overflow-x-hidden bg-ink-900">
        {/* ambient background glow */}
        <div className="pointer-events-none fixed inset-0 -z-20 bg-radial-glow" />
        <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03),transparent_60%)]" />

        {/* floating particles overlay (full page) */}
        <Particles />

        <Navbar />
        <main>
          <HomePage />
        </main>
        <Footer />
      </div>
    </PortfolioProvider>
  );
}
