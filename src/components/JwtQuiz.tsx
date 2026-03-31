"use client";

import { useState, useEffect } from "react";
import { QUIZ_QUESTIONS, type QuizQuestion } from "../data/quizQuestions";

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function JwtQuiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>(QUIZ_QUESTIONS);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState<QuizQuestion[]>([]);

  // Shuffle questions on mount (client-side only to avoid hydration mismatch)
  useEffect(() => {
    setQuestions(shuffleArray(QUIZ_QUESTIONS));
  }, []);

  const q = questions[currentIdx];
  const total = questions.length;

  function handleSelect(idx: number) {
    if (answered) return;
    setSelectedOption(idx);
    setAnswered(true);
    setAnsweredCount((c) => c + 1);
    if (idx === q.correctIndex) {
      setScore((s) => s + 1);
    } else {
      setWrongAnswers((w) => [...w, q]);
    }
  }

  function handleNext() {
    if (currentIdx >= total - 1) {
      setFinished(true);
      return;
    }
    setCurrentIdx((i) => i + 1);
    setSelectedOption(null);
    setAnswered(false);
  }

  function handleRestart() {
    setQuestions(shuffleArray(QUIZ_QUESTIONS));
    setCurrentIdx(0);
    setSelectedOption(null);
    setAnswered(false);
    setScore(0);
    setAnsweredCount(0);
    setFinished(false);
    setWrongAnswers([]);
  }

  const pct = Math.round((answeredCount / total) * 100);

  if (finished) {
    const scorePct = Math.round((score / total) * 100);
    const emoji = scorePct >= 90 ? "🏆" : scorePct >= 70 ? "🎉" : scorePct >= 50 ? "👍" : "📚";
    const msg =
      scorePct >= 90
        ? "Xuất sắc! Bạn nắm rất vững JWT!"
        : scorePct >= 70
          ? "Tốt lắm! Bạn hiểu khá rõ về JWT."
          : scorePct >= 50
            ? "Khá ổn! Hãy ôn lại một số khái niệm nhé."
            : "Hãy đọc lại nội dung và thử lại nhé!";

    return (
      <div className="quiz">
        <div className="quiz__result">
          <span className="text-6xl mb-4 block">{emoji}</span>
          <h3 className="text-3xl font-bold text-white mb-2">Kết quả</h3>
          <p className="text-xl text-slate-300 mb-1">
            Bạn trả lời đúng <span className="text-green-400 font-bold">{score}</span> / {total} câu ({scorePct}%)
          </p>
          <p className="text-slate-400 mb-6">{msg}</p>

          {/* Score bar */}
          <div className="quiz__score-bar">
            <div
              className="quiz__score-fill"
              style={{ width: `${scorePct}%`, background: scorePct >= 70 ? "#22c55e" : scorePct >= 50 ? "#f97316" : "#ef4444" }}
            />
          </div>

          {wrongAnswers.length > 0 && (
            <div className="quiz__wrong-list">
              <h4 className="text-sm font-semibold text-slate-400 mb-3">📝 Câu trả lời sai — nên ôn lại:</h4>
              {wrongAnswers.map((wq) => (
                <div key={wq.id} className="quiz__wrong-item">
                  <p className="text-sm text-slate-300 font-medium">{wq.question}</p>
                  <p className="text-xs text-green-400 mt-1">
                    ✓ Đáp án đúng: {wq.options[wq.correctIndex]}
                  </p>
                </div>
              ))}
            </div>
          )}

          <button onClick={handleRestart} className="quiz__restart-btn">
            🔄 Làm lại Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz">
      {/* Progress */}
      <div className="quiz__header">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-400">
            Câu {currentIdx + 1} / {total}
          </span>
          <span className="text-sm text-slate-400">
            Điểm: <span className="text-green-400 font-bold">{score}</span>
          </span>
        </div>
        <div className="quiz__progress-bar">
          <div className="quiz__progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="text-xs text-slate-500 mt-1 inline-block">
          Chủ đề: {q.topic}
        </span>
      </div>

      {/* Question */}
      <div className="quiz__question">
        <h3 className="text-lg md:text-xl font-semibold text-white leading-relaxed">
          {q.question}
        </h3>
      </div>

      {/* Options */}
      <div className="quiz__options">
        {q.options.map((opt, i) => {
          let cls = "quiz__option";
          if (answered) {
            if (i === q.correctIndex) cls += " quiz__option--correct";
            else if (i === selectedOption) cls += " quiz__option--wrong";
            else cls += " quiz__option--dimmed";
          } else if (i === selectedOption) {
            cls += " quiz__option--selected";
          }

          return (
            <button key={i} className={cls} onClick={() => handleSelect(i)}>
              <span className="quiz__option-letter">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="quiz__option-text">{opt}</span>
              {answered && i === q.correctIndex && <span className="quiz__option-icon">✓</span>}
              {answered && i === selectedOption && i !== q.correctIndex && (
                <span className="quiz__option-icon quiz__option-icon--wrong">✗</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {answered && (
        <div className={`quiz__explanation ${selectedOption === q.correctIndex ? "quiz__explanation--correct" : "quiz__explanation--wrong"}`}>
          <div className="flex items-start gap-2">
            <span className="text-xl">{selectedOption === q.correctIndex ? "✅" : "❌"}</span>
            <div>
              <p className="font-semibold text-white mb-1">
                {selectedOption === q.correctIndex ? "Chính xác!" : "Chưa đúng!"}
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">{q.explanation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Next button */}
      {answered && (
        <div className="quiz__nav">
          <button onClick={handleNext} className="quiz__next-btn">
            {currentIdx >= total - 1 ? "📊 Xem kết quả" : "Câu tiếp theo →"}
          </button>
        </div>
      )}
    </div>
  );
}
