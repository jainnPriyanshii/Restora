import Hero from '../components/Hero/Hero';
import InfoCard from '../components/InfoCard/InfoCard';
import UserJourney from '../components/UserJourney/UserJourney';
import SurveySection from '../components/SurveySection/SurveySection';
import questions from '../data/questions';

/**
 * HomePage — The original Restora landing page content.
 */
export default function HomePage() {
  return (
    <main className="relative pt-xl">
      <Hero />
      <InfoCard />
      <SurveySection questions={questions} />
      <UserJourney />
    </main>
  );
}
