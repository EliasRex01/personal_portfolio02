import CustomCursor from './components/CustomCursor.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Chatbot from './components/Chatbot.jsx';

export default function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
