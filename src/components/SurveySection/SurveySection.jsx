import { useState, useRef } from 'react';
import QuestionCard from '../QuestionCard/QuestionCard';
import supabase from '../../lib/supabase';
import {
  MdPerson,
  MdEmail,
  MdPhone,
  MdSend,
  MdCheckCircle,
  MdErrorOutline,
} from 'react-icons/md';

/**
 * Full questionnaire form section.
 * Includes personal info (name, preferred contact method + email/mobile),
 * self-assessment question cards, and a submit button.
 */
export default function SurveySection({ questions }) {
  const [name, setName] = useState('');
  const [contactMethod, setContactMethod] = useState(''); // '' | 'email' | 'mobile'
  const [contactValue, setContactValue] = useState('');
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const formRef = useRef(null);

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const isFormValid =
    name.trim() !== '' && contactMethod !== '' && contactValue.trim() !== '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const { error } = await supabase.from('survey_responses').insert([
        {
          name: name.trim(),
          contact_method: contactMethod,
          contact_value: contactValue.trim(),
          answers: answers,
        },
      ]);

      if (error) throw error;

      setSubmitted(true);
    } catch (err) {
      console.error('Supabase insert error:', err);
      setSubmitError(
        err.message || 'Something went wrong. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="max-w-[800px] mx-auto px-gutter py-xl">
        <div className="glass-panel p-xl rounded-xl border-2 border-secondary/30 text-center animate-fade-in-up">
          <div className="w-20 h-20 bg-secondary-fixed rounded-full flex items-center justify-center mx-auto mb-md animate-gentle-bounce">
            <MdCheckCircle size={40} className="text-primary" />
          </div>
          <h2 className="text-headline-lg text-primary mb-sm">
            Thank You, {name}!
          </h2>
          <p className="text-body-lg text-on-surface-variant max-w-md mx-auto mb-md">
            Your response has been recorded successfully. We'll reach out via{' '}
            <span className="font-semibold text-secondary">
              {contactMethod === 'email' ? 'email' : 'mobile'}
            </span>{' '}
            at{' '}
            <span className="font-semibold text-primary">{contactValue}</span>{' '}
            with the research findings.
          </p>
          <div className="inline-block bg-primary-fixed/50 text-on-primary-fixed px-md py-sm rounded-full text-label-md">
            🧠 Your contribution matters to science
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="survey-anchor"
      className="max-w-[800px] mx-auto px-gutter flex flex-col gap-lg"
    >
      {/* ── Section Header ─────────────────────────────────────── */}
      <div className="mb-sm text-center">
        <span className="text-label-md text-tertiary uppercase tracking-widest">
          Questionnaire
        </span>
        <h2 className="text-headline-md text-primary mt-xs">
          Tell Us About Yourself
        </h2>
        <p className="text-body-md text-on-surface-variant mt-xs">
          Fill in your details and answer the self-assessment below.
        </p>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-lg">
        {/* ── Personal Info Card ──────────────────────────────── */}
        <div className="glass-panel p-lg rounded-xl border-2 border-outline-variant/30 opacity-0 animate-fade-in-up">
          <h3 className="text-label-md text-secondary uppercase tracking-widest mb-md flex items-center gap-2">
            <MdPerson size={18} />
            Personal Information
          </h3>

          <div className="flex flex-col gap-md">
            {/* Name Field */}
            <div className="group">
              <label
                htmlFor="participant-name"
                className="text-label-md text-on-surface-variant mb-xs block"
              >
                Full Name <span className="text-error">*</span>
              </label>
              <div className="relative">
                <MdPerson
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-outline transition-colors group-focus-within:text-primary"
                />
                <input
                  id="participant-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-surface-container border-2 border-outline-variant/40 text-body-md text-on-surface placeholder:text-outline/60
                    focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                    transition-all duration-300 hover:border-outline"
                  required
                />
              </div>
            </div>

            {/* Preferred Contact Method */}
            <div>
              <label className="text-label-md text-on-surface-variant mb-sm block">
                Preferred Contact Method <span className="text-error">*</span>
              </label>
              <div className="flex gap-sm">
                {/* Email Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    setContactMethod('email');
                    setContactValue('');
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-md rounded-lg font-semibold text-sm transition-all duration-300 border-2
                    ${
                      contactMethod === 'email'
                        ? 'bg-primary text-on-primary border-primary bloom-shadow-primary scale-[1.02]'
                        : 'bg-surface-container-high text-on-surface-variant border-outline-variant/40 hover:border-primary/50 hover:bg-primary-fixed/30 hover:scale-[1.01]'
                    }`}
                >
                  <MdEmail size={20} />
                  Email
                </button>

                {/* Mobile Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    setContactMethod('mobile');
                    setContactValue('');
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-md rounded-lg font-semibold text-sm transition-all duration-300 border-2
                    ${
                      contactMethod === 'mobile'
                        ? 'bg-primary text-on-primary border-primary bloom-shadow-primary scale-[1.02]'
                        : 'bg-surface-container-high text-on-surface-variant border-outline-variant/40 hover:border-primary/50 hover:bg-primary-fixed/30 hover:scale-[1.01]'
                    }`}
                >
                  <MdPhone size={20} />
                  Mobile
                </button>
              </div>
            </div>

            {/* Conditional Contact Input (slides in) */}
            {contactMethod && (
              <div
                className="group animate-fade-in-up"
                style={{ animationDuration: '0.4s' }}
              >
                <label
                  htmlFor="contact-value"
                  className="text-label-md text-on-surface-variant mb-xs block"
                >
                  {contactMethod === 'email'
                    ? 'Email Address'
                    : 'Mobile Number'}{' '}
                  <span className="text-error">*</span>
                </label>
                <div className="relative">
                  {contactMethod === 'email' ? (
                    <MdEmail
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-outline transition-colors group-focus-within:text-primary"
                    />
                  ) : (
                    <MdPhone
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-outline transition-colors group-focus-within:text-primary"
                    />
                  )}
                  <input
                    id="contact-value"
                    type={contactMethod === 'email' ? 'email' : 'tel'}
                    value={contactValue}
                    onChange={(e) => setContactValue(e.target.value)}
                    placeholder={
                      contactMethod === 'email'
                        ? 'you@example.com'
                        : '+91 98765 43210'
                    }
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-surface-container border-2 border-outline-variant/40 text-body-md text-on-surface placeholder:text-outline/60
                      focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                      transition-all duration-300 hover:border-outline"
                    required
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Self-Assessment Section ────────────────────────── */}
        <div>
          <div className="mb-md text-center">
            <span className="text-label-md text-tertiary uppercase tracking-widest">
              Self-Assessment
            </span>
            <p className="text-body-md text-on-surface-variant mt-xs">
              Tap the cards that resonate with your current state.
            </p>
          </div>

          <div className="grid gap-sm">
            {questions.map((q) => (
              <QuestionCard
                key={q.id}
                icon={q.icon}
                text={q.text}
                onAnswer={(ans) => handleAnswer(q.id, ans)}
              />
            ))}
          </div>
        </div>

        {/* ── Error Message ──────────────────────────────────── */}
        {submitError && (
          <div className="flex items-center gap-3 p-md bg-error-container text-on-error-container rounded-lg animate-fade-in-up border-2 border-error/20">
            <MdErrorOutline size={24} className="flex-shrink-0 text-error" />
            <p className="text-body-md flex-1">{submitError}</p>
            <button
              type="button"
              onClick={() => setSubmitError('')}
              className="text-sm font-semibold text-error hover:underline flex-shrink-0"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* ── Submit Button ──────────────────────────────────── */}
        <div className="flex justify-center pt-md pb-xl">
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`group relative flex items-center gap-3 py-4 px-10 rounded-full font-bold text-body-lg transition-all duration-500 overflow-hidden
              ${
                isFormValid && !isSubmitting
                  ? 'bg-primary text-on-primary bloom-shadow-primary hover:scale-105 hover:gap-4 active:scale-95 cursor-pointer'
                  : 'bg-surface-container-high text-outline border-2 border-outline-variant/30 cursor-not-allowed'
              }`}
          >
            {/* Animated shimmer overlay */}
            {isFormValid && !isSubmitting && (
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            )}

            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Submitting...
              </>
            ) : (
              <>
                Submit Response
                <MdSend
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
