import { MdCheckCircle } from "react-icons/md";
import { useEffect } from "react";
import { trackEvent } from "../../lib/analytics";
import {
  DIMENSION_LABELS,
  DIMENSION_INSIGHTS,
} from "../../lib/scoreAnswersService";

/**
 * SVG radar (pentagon) chart for 5 cognitive-fatigue dimensions.
 */
function RadarChart({ dimensions }) {
  const keys = Object.keys(DIMENSION_LABELS);
  const size = 240;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 90;
  const levels = 4; // concentric rings

  // Convert dimension index to angle (start from top, go clockwise)
  const angle = (i) => (Math.PI * 2 * i) / keys.length - Math.PI / 2;

  const point = (i, r) => ({
    x: cx + r * Math.cos(angle(i)),
    y: cy + r * Math.sin(angle(i)),
  });

  // Grid rings
  const rings = Array.from({ length: levels }, (_, lvl) => {
    const r = (radius / levels) * (lvl + 1);
    const pts = keys.map((_, i) => point(i, r));
    return pts.map((p) => `${p.x},${p.y}`).join(" ");
  });

  // Axis lines
  const axes = keys.map((_, i) => point(i, radius));

  // Data polygon
  const dataPoints = keys.map((key, i) => {
    const score = dimensions[key] ?? 0;
    const r = (score / 100) * radius;
    return point(i, r);
  });
  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  // Label positions (slightly outside the chart)
  const labelPoints = keys.map((key, i) => {
    const p = point(i, radius + 28);
    return { ...p, label: DIMENSION_LABELS[key] };
  });

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[280px] mx-auto">
      {/* Grid rings */}
      {rings.map((pts, i) => (
        <polygon
          key={i}
          points={pts}
          fill="none"
          stroke="#e8dacd"
          strokeWidth="0.8"
          opacity={0.5 + i * 0.12}
        />
      ))}

      {/* Axis lines */}
      {axes.map((p, i) => (
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={p.x}
          y2={p.y}
          stroke="#e8dacd"
          strokeWidth="0.8"
        />
      ))}

      {/* Data polygon */}
      <polygon
        points={dataPolygon}
        fill="rgba(182, 75, 22, 0.15)"
        stroke="#b64b16"
        strokeWidth="2"
      />

      {/* Data points */}
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#b64b16" />
      ))}

      {/* Labels */}
      {labelPoints.map((p, i) => (
        <text
          key={i}
          x={p.x}
          y={p.y}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-on-surface-variant"
          style={{ fontSize: "7.5px", fontWeight: 600 }}
        >
          {p.label}
        </text>
      ))}
    </svg>
  );
}

const SEVERITY_STYLES = {
  low: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    label: "Low Fatigue",
    emoji: "🟢",
  },
  moderate: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    label: "Moderate Fatigue",
    emoji: "🟡",
  },
  high: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    label: "High Fatigue",
    emoji: "🔴",
  },
};

/**
 * Results view after survey submission.
 * Receives scored data and renders personalised recovery insights.
 */
export default function ResultTeaser({
  name,
  contactMethod,
  contactValue,
  scoreResult,
}) {
  if (!scoreResult) return null;

  const { dimensions, overall, dominantDimension, severity } = scoreResult;
  const sev = SEVERITY_STYLES[severity] || SEVERITY_STYLES.moderate;
  const dominantLabel = DIMENSION_LABELS[dominantDimension];
  const dominantInsight = DIMENSION_INSIGHTS[dominantDimension];

  useEffect(() => {
    trackEvent("Result Viewed", {
      overall_score: overall,
      dominant_dimension: dominantDimension,
      severity: severity
    });
  }, [overall, dominantDimension, severity]);

  return (
    <section className="mx-auto px-gutter py-xl max-w-[800px] animate-fade-in-up">
      {/* Thank-you header */}
      <div className="text-center mb-lg">
        <div className="bg-secondary-fixed flex justify-center items-center mx-auto mb-md rounded-full w-20 h-20 animate-gentle-bounce">
          <MdCheckCircle size={40} className="text-primary" />
        </div>
        <h2
          className="mb-xs font-bold text-headline-lg"
          style={{ color: "var(--color-primary, #b64b16)" }}
        >
          Thank You, {name}!
        </h2>
        <p className="mx-auto max-w-md text-body-md text-on-surface-variant">
          Your response has been recorded. Here's your personalised cognitive
          fatigue snapshot.
        </p>
      </div>

      {/* Overall score + severity */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-lg">
        <div className="text-center">
          <div
            className="text-6xl font-black"
            style={{ color: "var(--color-primary, #b64b16)" }}
          >
            {overall}
          </div>
          <div className="text-sm font-semibold text-on-surface-variant mt-1">
            Overall Score
          </div>
        </div>
        <div
          className={`${sev.bg} ${sev.border} border-2 rounded-full px-5 py-2 font-bold text-sm ${sev.text}`}
        >
          {sev.emoji} {sev.label}
        </div>
      </div>

      {/* Radar chart */}
      <div className="glass-panel border-2 border-[#f4ece3] rounded-2xl p-6 mb-lg">
        <h3 className="text-center font-bold text-on-surface mb-4 text-lg">
          Your Cognitive Profile
        </h3>
        <RadarChart dimensions={dimensions} />

        {/* Dimension breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
          {Object.entries(DIMENSION_LABELS).map(([key, label]) => (
            <div
              key={key}
              className={`flex items-center justify-between p-3 rounded-xl border-2 ${
                key === dominantDimension
                  ? "bg-[#fcece4] border-[#f3d9cd]"
                  : "bg-[#fcfaf8] border-[#f4ece3]"
              }`}
            >
              <span
                className={`font-semibold text-sm ${
                  key === dominantDimension
                    ? "text-[#b64b16]"
                    : "text-on-surface"
                }`}
              >
                {label}
              </span>
              <span
                className={`font-black text-lg ${
                  key === dominantDimension
                    ? "text-[#b64b16]"
                    : "text-on-surface-variant"
                }`}
              >
                {dimensions[key]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Dominant dimension insight */}
      {dominantInsight && (
        <div className="bg-[#fcece4] border-2 border-[#f3d9cd] rounded-2xl p-6 mb-lg text-center">
          <div className="text-sm font-bold text-[#b64b16] mb-2 uppercase tracking-wider">
            Your Primary Area: {dominantLabel}
          </div>
          <p className="text-on-surface text-body-md max-w-lg mx-auto leading-relaxed">
            {dominantInsight}
          </p>
        </div>
      )}

      {/* Contact confirmation */}
      <div className="text-center">
        <p className="text-body-md text-on-surface-variant">
          We'll reach out via{" "}
          <span className="font-semibold text-secondary">
            {contactMethod === "email" ? "email" : "mobile"}
          </span>{" "}
          at{" "}
          <span
            className="font-semibold"
            style={{ color: "var(--color-primary, #b64b16)" }}
          >
            {contactValue}
          </span>{" "}
          with detailed research findings.
        </p>
        <div className="inline-block bg-primary-fixed/50 text-on-primary-fixed px-md py-sm rounded-full text-label-md mt-4">
          🧠 Your contribution matters to science
        </div>
      </div>
    </section>
  );
}

