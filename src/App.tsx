import { useState, useEffect } from 'react';
import Nav from './components/Nav';
import HomePage from './components/HomePage';
import ServicesPage from './components/ServicesPage';
import TarifsPage from './components/TarifsPage';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

export type Page = 'home' | 'services' | 'pricing' | 'contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  const showPage = (page: Page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <Nav currentPage={currentPage} showPage={showPage} />
      {currentPage === 'home' && <HomePage showPage={showPage} />}
      {currentPage === 'services' && <ServicesPage showPage={showPage} />}
      {currentPage === 'pricing' && <TarifsPage showPage={showPage} />}
      {currentPage === 'contact' && <ContactPage />}
      <Footer showPage={showPage} />
      <Chatbot />
    </div>
  );
}
