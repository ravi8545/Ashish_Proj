import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Portfolio from './components/Portfolio.jsx';
import Showreel from './components/Showreel.jsx';
import Services from './components/Services.jsx';
import Testimonials from './components/Testimonials.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink-900">
      {/* ambient background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-radial-glow" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04),transparent_60%)]" />

      <Navbar />
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Showreel />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
