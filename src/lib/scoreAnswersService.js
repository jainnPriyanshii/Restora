/**
 * Restora — answer scoring utility.
 *
 * Takes the raw `answers` object from SurveySection state
 * and returns per-dimension scores normalised to 0–100,
 * plus an overall fatigue score.
 *
 * Usage:
 *   import { scoreAnswers } from './scoreAnswers';
 *   const scores = scoreAnswers(answers); // pass to ResultTeaser
 *
 * Input shape:
 *   { q1: 'often', q2: 'always', q3: 'sometimes', ... }
 *
 * Output shape:
 *   {
 *     dimensions: {
 *       attention_fragmentation: 75,   // 0–100
 *       working_memory: 50,
 *       decision_fatigue: 62,
 *       dopamine_dependency: 88,
 *       recovery_quality: 33,
 *     },
 *     overall: 62,                     // weighted average, 0–100
 *     dominantDimension: 'dopamine_dependency',
 *     severity: 'moderate',            // 'low' | 'moderate' | 'high'
 *   }
 */

const SCORE_MAP = {
  never: 0,
  rarely: 1,
  sometimes: 2,
  often: 3,
  always: 4,
};

// Which question IDs belong to each dimension
const DIMENSION_QUESTIONS = {
  attention_fragmentation: ["q1", "q2", "q3"],
  working_memory: ["q4", "q5"],
  decision_fatigue: ["q6", "q7"],
  dopamine_dependency: ["q8", "q9"],
  recovery_quality: ["q10", "q11", "q12"],
};

// Max possible raw score per dimension (questions × 4)
const DIMENSION_MAX = {
  attention_fragmentation: 12,
  working_memory: 8,
  decision_fatigue: 8,
  dopamine_dependency: 8,
  recovery_quality: 12,
};

// Human-readable labels for each dimension (used in ResultTeaser UI)
export const DIMENSION_LABELS = {
  attention_fragmentation: "Attention Fragmentation",
  working_memory: "Working Memory",
  decision_fatigue: "Decision Fatigue",
  dopamine_dependency: "Dopamine Dependency",
  recovery_quality: "Recovery Quality",
};

// Short recovery message per dimension shown after submission
export const DIMENSION_INSIGHTS = {
  attention_fragmentation:
    "Your focus is fragmenting fast. Short, distraction-free work blocks will help rebuild your attention muscle.",
  working_memory:
    "Your working memory is under strain. Externalising tasks and reducing open loops will give your brain breathing room.",
  decision_fatigue:
    "You're burning through willpower on micro-decisions. Routines and defaults free up mental energy for what matters.",
  dopamine_dependency:
    "Your brain has recalibrated to expect constant novelty. A gradual stimulation detox will restore your baseline.",
  recovery_quality:
    "Your rest isn't actually restful. True cognitive recovery means unstimulated downtime — not just switching screens.",
};

/**
 * @param {Object} answers  — { [questionId]: 'never'|'rarely'|'sometimes'|'often'|'always'|null }
 * @returns {Object}        — scored result (see JSDoc above)
 */
export function scoreAnswers(answers = {}) {
  const dimensions = {};

  for (const [dimension, questionIds] of Object.entries(DIMENSION_QUESTIONS)) {
    let raw = 0;
    let answered = 0;

    for (const id of questionIds) {
      const val = answers[id];
      if (val && SCORE_MAP[val] !== undefined) {
        raw += SCORE_MAP[val];
        answered++;
      }
    }

    // If some questions were skipped, pro-rate the max
    const effectiveMax =
      answered > 0
        ? (DIMENSION_MAX[dimension] / questionIds.length) * answered
        : DIMENSION_MAX[dimension];

    dimensions[dimension] =
      answered === 0 ? 0 : Math.round((raw / effectiveMax) * 100);
  }

  // Overall: simple average across all 5 dimensions
  const overall = Math.round(
    Object.values(dimensions).reduce((sum, v) => sum + v, 0) /
      Object.keys(dimensions).length,
  );

  // Dominant dimension — where they score highest
  const dominantDimension = Object.entries(dimensions).reduce(
    (max, [key, val]) => (val > max[1] ? [key, val] : max),
    ["", -1],
  )[0];

  // Severity thresholds
  const severity = overall >= 65 ? "high" : overall >= 35 ? "moderate" : "low";

  return { dimensions, overall, dominantDimension, severity };
}
