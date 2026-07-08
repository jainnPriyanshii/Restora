import {
  MdAutoStories,
  MdPsychologyAlt,
  MdRestaurantMenu,
  MdCloud,
  MdSmartDisplay,
  MdBolt,
} from 'react-icons/md';

/** Map icon string keys to react-icons components */
const iconMap = {
  auto_stories: MdAutoStories,
  psychology_alt: MdPsychologyAlt,
  restaurant_menu: MdRestaurantMenu,
  cloud: MdCloud,
  smart_display: MdSmartDisplay,
  bolt: MdBolt,
};

/**
 * Individual self-assessment question card.
 * Users respond with Yes or No buttons.
 */
export default function QuestionCard({ icon, text, answer, onAnswer }) {
  const IconComponent = iconMap[icon];

  return (
    <div
      className={`glass-panel text-left p-md md:p-lg min-h-[100px] rounded-lg border-2 transition-all duration-300 flex items-center gap-md
        ${
          answer === 'yes'
            ? 'bg-secondary-container border-secondary'
            : answer === 'no'
              ? 'bg-surface-container border-outline-variant/50'
              : 'border-transparent'
        }`}
    >
      {IconComponent && (
        <IconComponent
          size={24}
          className={`text-secondary flex-shrink-0 transition-opacity
            ${answer !== undefined && answer !== null ? 'opacity-100' : 'opacity-60'}`}
        />
      )}

      <span className="text-body-lg text-on-surface flex-1">{text}</span>

      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          type="button"
          onClick={() => {
            const newVal = answer === 'yes' ? null : 'yes';
            onAnswer?.(newVal);
          }}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 
            ${
              answer === 'yes'
                ? 'bg-primary text-on-primary bloom-shadow-primary scale-105'
                : 'bg-surface-container-high text-on-surface-variant hover:bg-primary-fixed hover:text-on-primary-fixed hover:scale-105'
            }`}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => {
            const newVal = answer === 'no' ? null : 'no';
            onAnswer?.(newVal);
          }}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200
            ${
              answer === 'no'
                ? 'bg-outline text-on-primary scale-105'
                : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest hover:scale-105'
            }`}
        >
          No
        </button>
      </div>
    </div>
  );
}
