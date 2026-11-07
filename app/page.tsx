'use client';

import { useEffect } from 'react';

import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Education } from '@/components/Education';
import { Experience } from '@/components/Experience';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { HouseBackdrops } from '@/components/HouseBackdrops';
import { Navbar } from '@/components/Navbar';
import { Projects } from '@/components/Projects';
import { RealmEntry } from '@/components/RealmEntry';
import { ScrollProgress } from '@/components/ScrollProgress';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Skills } from '@/components/Skills';
import { SoundProvider } from '@/context/SoundContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { resetPortfolioScroll } from '@/lib/portfolio-navigation';

export default function HomePage() {
  useEffect(() => {
    resetPortfolioScroll();
    const frame = requestAnimationFrame(resetPortfolioScroll);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <SoundProvider requireEntry>
      <ThemeProvider>
        <RealmEntry />
        <ScrollProgress />
        <HouseBackdrops />
        <ScrollReveal />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </main>
        <Footer />
      </ThemeProvider>
    </SoundProvider>
  );
}
