"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clapperboard, Palette, RotateCcw, Sparkles, Star, Timer } from "lucide-react";
import { movies, questions, type Mood, type Movie } from "@/data/quiz";

type AnswerMap = Record<number, number>;
type ScoreMap = Record<Mood, number>;
type ThemeName = "neon" | "midnight" | "popcorn" | "forest";


const themes: { name: ThemeName; label: string; description: string }[] = [
  { name: "neon", label: "Неон", description: "розово-фиолетовый стиль V" },
  { name: "midnight", label: "Ночь", description: "синий кинотеатр" },
  { name: "popcorn", label: "Попкорн", description: "теплый светлый режим" },
  { name: "forest", label: "Лес", description: "спокойный зеленый вайб" },
];

function VLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`logo-badge ${compact ? "compact" : ""}`} aria-label="V logo">
      <svg viewBox="0 0 96 96" role="img" aria-hidden="true">
        <defs>
          <linearGradient id={compact ? "vGradientSmall" : "vGradient"} x1="16" y1="10" x2="82" y2="88" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--pink)" />
            <stop offset="0.52" stopColor="var(--violet)" />
            <stop offset="1" stopColor="var(--cyan)" />
          </linearGradient>
        </defs>
        <path className="logo-frame" d="M48 6L84.4 26.9V69.1L48 90L11.6 69.1V26.9L48 6Z" />
        <path className="logo-v" d="M27 28L43.2 68C45 72.5 51.3 72.5 53.1 68L69 28H57.8L48.2 54.2L38.6 28H27Z" fill={`url(#${compact ? "vGradientSmall" : "vGradient"})`} />
        <path className="logo-spark" d="M70 18L72.2 24.2L78 26.3L72.2 28.4L70 34L67.8 28.4L62 26.3L67.8 24.2L70 18Z" />
      </svg>
      <span className="logo-orbit" />
    </div>
  );
}

function ThemePicker({ value, onChange }: { value: ThemeName; onChange: (theme: ThemeName) => void }) {
  return (
    <div className="theme-picker" aria-label="Выбор темы">
      <div className="theme-title"><Palette size={15} /> тема</div>
      <div className="theme-options">
        {themes.map((theme) => (
          <button
            key={theme.name}
            className={`theme-dot theme-${theme.name} ${value === theme.name ? "active" : ""}`}
            onClick={() => onChange(theme.name)}
            title={theme.description}
            aria-label={`Тема ${theme.label}`}
            type="button"
          >
            <span />
            <strong>{theme.label}</strong>
          </button>
        ))}
      </div>
    </div>
  );
}


function PosterBackdrop() {
  const backdropMovies = movies.slice(0, 12);

  return (
    <div className="poster-backdrop" aria-hidden="true">
      {backdropMovies.map((movie, index) => (
        <div
          key={`backdrop-${movie.title}`}
          className="poster-backdrop-tile"
          style={{
            "--x": `${(index * 19 + 4) % 96}%`,
            "--y": `${(index * 31 + 6) % 88}%`,
            "--r": `${index % 2 === 0 ? -7 : 8}deg`,
            "--d": `${index * -1.6}s`,
          } as React.CSSProperties}
        >
          <img src={movie.poster} alt="" loading="lazy" />
        </div>
      ))}
    </div>
  );
}

function FloatingMovieShelf({ onSelect }: { onSelect: (movie: Movie) => void }) {
  const shelfMovies = movies.slice(0, 9);
  const loopMovies = [...shelfMovies, ...shelfMovies];

  return (
    <div className="movie-shelf" aria-label="Фильмы в подборке V">
      <div className="shelf-tab">
        <Clapperboard size={16} />
        <span>фильмы в подборке</span>
      </div>
      <div className="shelf-viewport">
        <div className="shelf-track">
          {loopMovies.map((movie, index) => (
            <button
              className="shelf-movie"
              key={`${movie.title}-${index}`}
              type="button"
              onClick={() => onSelect(movie)}
              aria-label={`Открыть фильм ${movie.title}`}
            >
              <img src={movie.poster} alt={`Постер фильма ${movie.title}`} loading="lazy" />
              <span>{movie.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


function MovieSpotlight({ movie, onClose }: { movie: Movie; onClose: () => void }) {
  return (
    <motion.div
      className="spotlight-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.article
        className="spotlight-card"
        style={{ "--accent": movie.color } as React.CSSProperties}
        initial={{ opacity: 0, y: 26, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.96 }}
        transition={{ duration: 0.25 }}
        onClick={(event) => event.stopPropagation()}
      >
        <button className="spotlight-close" type="button" onClick={onClose} aria-label="Закрыть карточку фильма">
          ×
        </button>
        <div className="spotlight-poster">
          <img src={movie.poster} alt={`Постер фильма ${movie.title}`} />
        </div>
        <div className="spotlight-copy">
          <span className="eyebrow">подробнее о фильме</span>
          <h3>{movie.title}</h3>
          <p className="movie-meta">{movie.year} · {movie.genre} · {movie.duration}</p>
          <p className="preview-description">{movie.description}</p>
          <p className="movie-vibe">{movie.vibe}</p>
          <p className="movie-why">V считает, что этот фильм {movie.why}.</p>
          <div className="tag-row">
            {movie.tags.map((tag) => <span key={tag}>{moodLabels[tag]}</span>)}
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

const moodLabels: Record<Mood, string> = {
  comfort: "уют",
  thrill: "напряжение",
  mind: "умное кино",
  romance: "эмоции",
  laugh: "юмор",
  epic: "эпик",
  dark: "мрак",
  family: "семейность",
  art: "арт",
};

const emptyScores = (): ScoreMap => ({
  comfort: 0,
  thrill: 0,
  mind: 0,
  romance: 0,
  laugh: 0,
  epic: 0,
  dark: 0,
  family: 0,
  art: 0,
});

function calculateScores(answers: AnswerMap) {
  const scores = emptyScores();

  Object.entries(answers).forEach(([questionIndex, optionIndex]) => {
    const option = questions[Number(questionIndex)]?.options[optionIndex];
    if (!option) return;

    Object.entries(option.scores).forEach(([mood, value]) => {
      scores[mood as Mood] += value ?? 0;
    });
  });

  return scores;
}

function matchMovies(scores: ScoreMap) {
  return movies
    .map((movie) => {
      const score = movie.tags.reduce((sum, tag) => sum + scores[tag], 0);
      const bonus = movie.tags.filter((tag) => scores[tag] > 7).length * 2;
      return { movie, score: score + bonus };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

function topMoods(scores: ScoreMap) {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([mood, score]) => ({ mood: mood as Mood, score }));
}

export default function MovieQuiz() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [showResult, setShowResult] = useState(false);
  const [theme, setTheme] = useState<ThemeName>("neon");
  const [selectedMovieTitle, setSelectedMovieTitle] = useState<string>("");
  const [spotlightMovie, setSpotlightMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("v-theme") as ThemeName | null;
    if (savedTheme && themes.some((item) => item.name === savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  const changeTheme = (nextTheme: ThemeName) => {
    setTheme(nextTheme);
    window.localStorage.setItem("v-theme", nextTheme);
  };

  const question = questions[step];
  const selected = answers[step];
  const answeredCount = Object.keys(answers).length;
  const progress = showResult ? 100 : Math.round((answeredCount / questions.length) * 100);

  const scores = useMemo(() => calculateScores(answers), [answers]);
  const recommendations = useMemo(() => matchMovies(scores), [scores]);
  const selectedRecommendation = recommendations.find(({ movie }) => movie.title === selectedMovieTitle) ?? recommendations[0];
  const moods = useMemo(() => topMoods(scores), [scores]);

  useEffect(() => {
    if (!showResult || recommendations.length === 0) return;
    if (!recommendations.some(({ movie }) => movie.title === selectedMovieTitle)) {
      setSelectedMovieTitle(recommendations[0].movie.title);
    }
  }, [recommendations, selectedMovieTitle, showResult]);

  const chooseAnswer = (optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [step]: optionIndex }));
  };

  const next = () => {
    if (selected === undefined) return;
    if (step === questions.length - 1) {
      setShowResult(true);
      return;
    }
    setStep((prev) => prev + 1);
  };

  const back = () => {
    if (showResult) {
      setShowResult(false);
      setStep(questions.length - 1);
      return;
    }
    setStep((prev) => Math.max(0, prev - 1));
  };

  const reset = () => {
    setStarted(false);
    setShowResult(false);
    setStep(0);
    setAnswers({});
    setSelectedMovieTitle("");
    setSpotlightMovie(null);
  };

  if (!started) {
    return (
      <section className="hero-shell" data-theme={theme}>
        <PosterBackdrop />
        <div className="aurora aurora-one" />
        <div className="aurora aurora-two" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="intro-card"
        >
          <div className="brand-row">
            <VLogo />
            <span>movie picker</span>
          </div>
          <ThemePicker value={theme} onChange={changeTheme} />
          <h1>Подбор фильма по 20 вопросам</h1>
          <p>
            Ответь на короткий квиз, а V соберет твой кинематографический профиль и предложит фильм под настроение прямо сейчас.
          </p>
          <div className="intro-grid">
            <div><Sparkles size={18} /><span>персональный вайб</span></div>
            <div><Timer size={18} /><span>3 минуты</span></div>
            <div><Clapperboard size={18} /><span>готовая рекомендация</span></div>
          </div>
          <FloatingMovieShelf onSelect={setSpotlightMovie} />
          <AnimatePresence>
            {spotlightMovie && <MovieSpotlight movie={spotlightMovie} onClose={() => setSpotlightMovie(null)} />}
          </AnimatePresence>
          <button className="primary-button" onClick={() => setStarted(true)}>
            Начать подбор
            <ArrowRight size={18} />
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="quiz-shell" data-theme={theme}>
      <PosterBackdrop />
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />

      <header className="topbar">
        <div className="brand-row small">
          <VLogo compact />
          <span>умный подбор фильма</span>
        </div>
        <div className="topbar-actions">
          <ThemePicker value={theme} onChange={changeTheme} />
          <button className="ghost-button" onClick={reset}>
          <RotateCcw size={16} />
          заново
          </button>
        </div>
      </header>

      <div className="progress-wrap">
        <div className="progress-label">
          <span>{showResult ? "результат" : `вопрос ${step + 1} из ${questions.length}`}</span>
          <span>{progress}%</span>
        </div>
        <div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
      </div>

      <AnimatePresence mode="wait">
        {showResult ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 22, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -22, filter: "blur(12px)" }}
            transition={{ duration: 0.45 }}
            className="result-layout"
          >
            <div className="result-head">
              <span className="eyebrow">V проанализировал ответы</span>
              <h2>Твой фильм на вечер</h2>
              <p>Главная рекомендация и еще два запасных варианта, если захочется другой оттенок настроения.</p>
            </div>

            <div className="movie-grid">
              {recommendations.map(({ movie, score }, index) => {
                const isActive = selectedRecommendation?.movie.title === movie.title;

                return (
                  <motion.button
                    key={movie.title}
                    type="button"
                    className={`movie-card ${index === 0 ? "featured" : ""} ${isActive ? "active" : ""}`}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    style={{ "--accent": movie.color } as React.CSSProperties}
                    onClick={() => setSelectedMovieTitle(movie.title)}
                    aria-label={`Открыть описание фильма ${movie.title}`}
                  >
                    <div className="movie-glow" />
                    <div className="movie-card-layout">
                      <div className="poster-frame">
                        <img src={movie.poster} alt={`Постер фильма ${movie.title}`} loading="lazy" />
                      </div>
                      <div className="movie-copy">
                        <div className="movie-top">
                          <span className="rank">#{index + 1}</span>
                          <span className="match"><Star size={14} /> {Math.min(99, 70 + score)}%</span>
                        </div>
                        <h3>{movie.title}</h3>
                        <p className="movie-meta">{movie.year} · {movie.genre} · {movie.duration}</p>
                        <p className="movie-vibe">{movie.vibe}</p>
                        <p className="movie-why">V считает, что этот фильм {movie.why}.</p>
                        <div className="tag-row">
                          {movie.tags.map((tag) => <span key={tag}>{moodLabels[tag]}</span>)}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <aside className="result-side">
              {selectedRecommendation && (
                <div className="movie-preview" style={{ "--accent": selectedRecommendation.movie.color } as React.CSSProperties}>
                  <span className="eyebrow">миниатюра фильма</span>
                  <div className="preview-poster">
                    <img src={selectedRecommendation.movie.poster} alt={`Постер фильма ${selectedRecommendation.movie.title}`} />
                  </div>
                  <h3>{selectedRecommendation.movie.title}</h3>
                  <p className="movie-meta">
                    {selectedRecommendation.movie.year} · {selectedRecommendation.movie.genre} · {selectedRecommendation.movie.duration}
                  </p>
                  <p className="preview-description">{selectedRecommendation.movie.description}</p>
                  <p className="movie-why">V считает, что этот фильм {selectedRecommendation.movie.why}.</p>
                </div>
              )}

              <div className="profile-card">
                <span className="eyebrow">твой профиль</span>
                <div className="mood-list">
                  {moods.map(({ mood, score }) => (
                    <div key={mood}>
                      <div className="mood-label"><span>{moodLabels[mood]}</span><span>{score}</span></div>
                      <div className="mood-track"><div style={{ width: `${Math.min(100, score * 6)}%` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            <div className="actions-row">
              <button className="secondary-button" onClick={back}><ArrowLeft size={17} /> изменить последний ответ</button>
              <button className="primary-button" onClick={reset}>пройти заново <RotateCcw size={17} /></button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 32, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -32, filter: "blur(10px)" }}
            transition={{ duration: 0.35 }}
            className="question-card"
          >
            <span className="eyebrow">вопрос {String(step + 1).padStart(2, "0")}</span>
            <h2>{question.title}</h2>
            <p>{question.subtitle}</p>

            <div className="options-grid">
              {question.options.map((option, index) => (
                <button
                  key={option.label}
                  className={`option-card ${selected === index ? "selected" : ""}`}
                  onClick={() => chooseAnswer(index)}
                >
                  <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                  <span className="option-text">
                    <strong>{option.label}</strong>
                    {option.hint && <small>{option.hint}</small>}
                  </span>
                </button>
              ))}
            </div>

            <div className="actions-row">
              <button className="secondary-button" onClick={back} disabled={step === 0}>
                <ArrowLeft size={17} /> назад
              </button>
              <button className="primary-button" onClick={next} disabled={selected === undefined}>
                {step === questions.length - 1 ? "получить фильм" : "дальше"}
                <ArrowRight size={17} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
