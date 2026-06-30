import { MdBatteryAlert } from 'react-icons/md';

/**
 * Hero section with animated battery icon, headline, subtext, and CTA button.
 */
export default function Hero() {
  return (
    <header className="max-w-[800px] mx-auto px-gutter pt-[112px] pb-lg text-center flex flex-col items-center gap-md">
      <div className="w-16 h-16 bg-secondary-fixed flex items-center justify-center rounded-full mb-xs animate-gentle-bounce">
        <MdBatteryAlert size={30} className="text-primary" />
      </div>

      <div className="flex flex-col gap-1 mb-sm">
        <span className="text-headline-md font-black text-primary tracking-wide">
          Restora
        </span>
        <span className="text-label-md font-bold text-secondary tracking-widest uppercase">
          Out of the Fog, Into the Flow
        </span>
      </div>

      <h1 className="text-headline-xl md:text-headline-xl max-w-2xl text-primary leading-tight">
        Does your brain feel like it's running on 12% battery by 3pm?
      </h1>

      <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto">
        Endless scrolling, AI overload, and short-form content are silently
        draining your focus. Restora helps you reclaim your attention span.
      </p>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-lg w-full max-w-2xl">
        {[
          { value: '2.5s', label: 'Average attention span today' },
          { value: '14%', label: 'Workers with cognitive fatigue' },
          { value: '6hrs', label: 'Daily screen time average' },
        ].map((stat) => (
          <div
            key={stat.value}
            className="bg-surface-container-high text-on-surface rounded-xl py-6 px-4 flex flex-col items-center gap-1 border border-outline-variant/30 transition-transform duration-300 hover:scale-105"
          >
            <span className="text-headline-lg font-bold text-primary">
              {stat.value}
            </span>
            <span className="text-label-md font-normal text-on-surface-variant text-center">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      <a
        href="#survey-anchor"
        className="mt-md bg-primary text-on-primary font-bold py-md px-xl rounded-full bloom-shadow-primary hover:scale-105 active:scale-95 transition-all duration-300"
      >
        Take the 60-Second Check
      </a>
    </header>
  );
}
