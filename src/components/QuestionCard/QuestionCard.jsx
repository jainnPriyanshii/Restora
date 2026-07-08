import { MdCheck } from "react-icons/md";

/**
 * Default 5-point Likert scale used for all cognitive-fatigue questions.
 * Values align with SCORE_MAP in scoreAnswersService.js (never:0 → always:4).
 */
const LIKERT_OPTIONS = [
  { value: "never", label: "Never" },
  { value: "rarely", label: "Rarely" },
  { value: "sometimes", label: "Sometimes" },
  { value: "often", label: "Often" },
  { value: "always", label: "Always" },
];

/**
 * Individual self-assessment question card.
 * Renders a 5-point Likert scale by default (Never → Always).
 * Custom options can still be passed via the `options` prop.
 */
export default function QuestionCard({ text, answer, onAnswer, options }) {
  const resolvedOptions = options || LIKERT_OPTIONS;

  return (
    <div className="flex flex-col items-center w-full">
      <h3 className="mx-auto mb-4 max-w-xl font-bold text-center text-on-surface text-xl md:text-2xl leading-snug">
        {text}
      </h3>

      <div
        className={`grid gap-3 w-full ${
          resolvedOptions.length >= 4
            ? "grid-cols-1 sm:grid-cols-2 max-w-[600px]"
            : "grid-cols-1 max-w-[400px]"
        }`}
      >
        {resolvedOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onAnswer(opt.value)}
            className={`flex items-center p-3 rounded-2xl font-bold text-base transition-all border-2
              ${
                answer === opt.value
                  ? "bg-[#fcece4] border-[#fcece4] text-[#b64b16]"
                  : "bg-[#fcfaf8] border-[#f4ece3] text-on-surface hover:border-[#e8dacd]"
              }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center mr-4
                ${
                  answer === opt.value
                    ? "bg-[#f3d9cd] text-[#b64b16]"
                    : "bg-[#f4ece3] text-on-surface-variant"
                }`}
            >
              {answer === opt.value ? <MdCheck size={16} /> : null}
            </div>
            <span className="flex-1 pr-2 text-center">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
