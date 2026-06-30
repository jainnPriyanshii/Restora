import BackgroundOrbs from './components/BackgroundOrbs/BackgroundOrbs';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import InfoCard from './components/InfoCard/InfoCard';
import SurveySection from './components/SurveySection/SurveySection';
import Footer from './components/Footer/Footer';
import questions from './data/questions';

/**
 * Restora — Cognitive Fatigue Research Landing Page
 */
export default function App() {
  return (
    <div className="bg-background text-on-surface font-sans overflow-x-hidden">
      <BackgroundOrbs />
      <Navbar />

      <main className="relative pt-xl">
        <Hero />

        <InfoCard />

        <SurveySection questions={questions} />
      </main>

      <Footer />
    </div>
  );
}
