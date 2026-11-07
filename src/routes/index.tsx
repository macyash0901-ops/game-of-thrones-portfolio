import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from 'react';
import { resetPortfolioScroll } from '@/lib/portfolio-navigation';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Education } from '@/components/Education';
import { Experience } from '@/components/Experience';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { HouseBackdrops } from '@/components/HouseBackdrops';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Navbar } from '@/components/Navbar';
import { Projects } from '@/components/Projects';
import { RealmEntry } from '@/components/RealmEntry';
import { ScrollProgress } from '@/components/ScrollProgress';
import { Skills } from '@/components/Skills';
import { SoundProvider } from '@/context/SoundContext';
import { ThemeProvider } from '@/context/ThemeContext';

function Index() {
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



export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Yash Drall | Full-Stack Software Developer' },
    { name: 'description', content: 'Yash Drall’s portfolio: production web and mobile applications with React.js, Next.js, Flutter, and Python.' },
    { property: 'og:title', content: 'Yash Drall | Full-Stack Software Developer' },
    { property: 'og:description', content: 'Explore Yash Drall’s experience, projects, and full-stack software development expertise.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});
