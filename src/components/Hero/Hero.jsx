import mascot from '../../assets/images/mascot.png';

/**
 * Hero section with left-right split layout, headline, subtext, mascot image, CTA button, and stats.
 */
export default function Hero() {
  return (
    <header className="max-w-[1000px] mx-auto px-gutter pt-8 md:pt-16 pb-lg flex flex-col items-center gap-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full">
        <div className="flex flex-col items-start text-left gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-headline-md font-black text-primary tracking-wide">
              Restora
            </span>
            <span className="text-label-md font-bold text-secondary tracking-widest uppercase">
              Out of the Fog, Into the Flow
            </span>
          </div>

          <h1 className="text-headline-xl md:text-display-sm text-primary leading-tight">
            Does your brain feel like it's running on 12% battery by 3pm?
          </h1>

          <p className="text-body-lg text-on-surface-variant max-w-lg">
            Endless scrolling, AI overload, and short-form content are silently
            draining your focus. Restora helps you reclaim your attention span.
          </p>

          <a
            href="#survey-anchor"
            className="mt-2 bg-primary text-on-primary font-bold py-md px-xl rounded-full bloom-shadow-primary hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Take the 60-Second Check
          </a>
        </div>

        <div className="flex justify-center md:justify-end">
          <img src={mascot} alt="Restora Mascot" className="w-full max-w-sm h-auto object-contain animate-gentle-bounce" />
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-sm w-full max-w-3xl">
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
    </header>
  );
}
