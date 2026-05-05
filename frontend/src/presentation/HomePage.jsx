import { motion } from 'framer-motion';
import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import Portfolio from '../components/Portfolio.jsx';
import Showreel from '../components/Showreel.jsx';
import Services from '../components/Services.jsx';
import Testimonials from '../components/Testimonials.jsx';
import Contact from '../components/Contact.jsx';

const Section = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-120px' }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export default function HomePage() {
  return (
    <div className="page-enter">
      <Hero />
      <Section><Portfolio /></Section>
      <Section><Showreel /></Section>
      <Section><Services /></Section>
      <Section><About /></Section>
      <Section><Testimonials /></Section>
      <Section><Contact /></Section>
    </div>
  );
}
