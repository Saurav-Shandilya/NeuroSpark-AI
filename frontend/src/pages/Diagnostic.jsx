import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body, #root {
    width: 100%;
    min-height: 100vh;
    margin: 0;
    padding: 0;
  }

  .diag-bg {
    min-height: 100vh;
    width: 100%;
    background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
    font-family: 'DM Sans', sans-serif;
    padding: 40px 20px;
  }

  .diag-container {
    max-width: 780px;
    margin: 0 auto;
  }

  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    color: #94a3b8;
    font-family: 'Sora', sans-serif;
    font-size: 13px;
    font-weight: 600;
    padding: 9px 18px;
    border-radius: 10px;
    cursor: pointer;
    margin-bottom: 28px;
    transition: all 0.2s ease;
    text-decoration: none;
  }
  .back-btn:hover {
    background: rgba(255,255,255,0.1);
    color: #e2e8f0;
    transform: translateX(-2px);
  }

  .diag-header { margin-bottom: 36px; }

  .diag-badge {
    display: inline-block;
    background: rgba(99,102,241,0.18);
    border: 1px solid rgba(99,102,241,0.4);
    color: #a5b4fc;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 5px 14px;
    border-radius: 20px;
    margin-bottom: 14px;
    font-family: 'Sora', sans-serif;
  }

  .diag-title {
    font-family: 'Sora', sans-serif;
    font-size: 28px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 8px;
    letter-spacing: -0.5px;
  }

  .diag-subtitle { color: #94a3b8; font-size: 14.5px; }

  .progress-bar-wrap {
    background: rgba(255,255,255,0.07);
    border-radius: 99px;
    height: 6px;
    margin-bottom: 32px;
    overflow: hidden;
  }

  .progress-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #6366f1, #a78bfa);
    border-radius: 99px;
    transition: width 0.4s ease;
  }

  .progress-label {
    font-size: 12px;
    color: #64748b;
    margin-bottom: 8px;
    text-align: right;
    font-family: 'Sora', sans-serif;
  }

  /* Start Card */
  .start-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 24px;
    padding: 60px 40px;
    text-align: center;
    backdrop-filter: blur(10px);
  }

  .start-icon { font-size: 56px; margin-bottom: 20px; }

  .start-title {
    font-family: 'Sora', sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 10px;
  }

  .start-desc {
    color: #94a3b8;
    font-size: 14.5px;
    max-width: 400px;
    margin: 0 auto 32px;
    line-height: 1.6;
  }

  .start-btn {
    background: linear-gradient(135deg, #6366f1, #4f46e5);
    color: #fff;
    border: none;
    border-radius: 14px;
    padding: 15px 40px;
    font-family: 'Sora', sans-serif;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.24s ease;
    box-shadow: 0 4px 20px rgba(99,102,241,0.4);
  }
  .start-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(99,102,241,0.5); }
  .start-btn:active { transform: translateY(0); }

  /* ── LOADING OVERLAY ── */
  .loading-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 12, 41, 0.92);
    backdrop-filter: blur(8px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 999;
    gap: 0;
  }

  .loader-box {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(99,102,241,0.25);
    border-radius: 28px;
    padding: 52px 56px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    min-width: 300px;
  }

  .brain-pulse {
    font-size: 52px;
    animation: pulse 1.4s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1);   opacity: 1; }
    50%       { transform: scale(1.18); opacity: 0.7; }
  }

  .dots-row {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #6366f1;
    animation: dotBounce 1.2s ease-in-out infinite;
  }
  .dot:nth-child(2) { animation-delay: 0.2s; background: #818cf8; }
  .dot:nth-child(3) { animation-delay: 0.4s; background: #a78bfa; }

  @keyframes dotBounce {
    0%, 80%, 100% { transform: translateY(0);    opacity: 0.4; }
    40%           { transform: translateY(-10px); opacity: 1; }
  }

  .loading-title {
    font-family: 'Sora', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #e2e8f0;
  }

  .loading-sub {
    font-size: 13.5px;
    color: #64748b;
    font-family: 'DM Sans', sans-serif;
    line-height: 1.5;
  }

  .loading-bar-track {
    width: 220px;
    height: 4px;
    background: rgba(255,255,255,0.08);
    border-radius: 99px;
    overflow: hidden;
  }

  .loading-bar-fill {
    height: 100%;
    width: 40%;
    background: linear-gradient(90deg, #6366f1, #a78bfa);
    border-radius: 99px;
    animation: shimmer 1.6s ease-in-out infinite;
  }

  @keyframes shimmer {
    0%   { transform: translateX(-180%); }
    100% { transform: translateX(420%); }
  }

  /* Question Cards */
  .question-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    padding: 28px 30px;
    margin-bottom: 18px;
    backdrop-filter: blur(10px);
    transition: border-color 0.2s;
  }

  .question-card.answered { border-color: rgba(99,102,241,0.35); }

  .question-num {
    font-size: 11px;
    font-weight: 600;
    color: #6366f1;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-family: 'Sora', sans-serif;
    margin-bottom: 10px;
  }

  .question-text {
    font-size: 15.5px;
    font-weight: 500;
    color: #e2e8f0;
    margin-bottom: 20px;
    line-height: 1.6;
  }

  .options-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  @media (max-width: 520px) {
    .options-grid { grid-template-columns: 1fr; }
    .start-card { padding: 40px 22px; }
    .loader-box { padding: 40px 30px; min-width: unset; width: 90vw; }
  }

  .option-label {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    border: 1.5px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    background: rgba(255,255,255,0.03);
    color: #cbd5e1;
    font-size: 14px;
    line-height: 1.4;
  }

  .option-label:hover {
    border-color: rgba(99,102,241,0.5);
    background: rgba(99,102,241,0.08);
    color: #e2e8f0;
  }

  .option-label.selected {
    border-color: #6366f1;
    background: rgba(99,102,241,0.15);
    color: #a5b4fc;
  }

  .option-label input[type="radio"] { display: none; }

  .option-dot {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.2s;
  }

  .option-label.selected .option-dot { border-color: #6366f1; background: #6366f1; }

  .option-dot-inner {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #fff;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .option-label.selected .option-dot-inner { opacity: 1; }

  .option-key {
    font-family: 'Sora', sans-serif;
    font-weight: 600;
    font-size: 13px;
    color: #6366f1;
    min-width: 16px;
  }

  .submit-area {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }

  .answered-count { font-size: 13px; color: #64748b; font-family: 'Sora', sans-serif; }
  .answered-count span { color: #a5b4fc; font-weight: 600; }

  .submit-btn {
    background: linear-gradient(135deg, #6366f1, #4f46e5);
    color: #fff;
    border: none;
    border-radius: 13px;
    padding: 14px 36px;
    font-family: 'Sora', sans-serif;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.24s ease;
    box-shadow: 0 4px 18px rgba(99,102,241,0.35);
  }

  .submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(99,102,241,0.45); }
  .submit-btn:active { transform: translateY(0); }
  .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
`;

function LoadingOverlay() {
  return (
    <div className="loading-overlay">
      <div className="loader-box">
        <div className="brain-pulse">🧠</div>
        <div>
          <div className="loading-title">Generating Questions</div>
          <div className="loading-sub" style={{ marginTop: 6 }}>
            Crafting your personalized diagnostic…
          </div>
        </div>
        <div className="dots-row">
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </div>
        <div className="loading-bar-track">
          <div className="loading-bar-fill" />
        </div>
      </div>
    </div>
  );
}

function Diagnostic() {
  const location = useLocation();
  const navigate = useNavigate();
  const { topic } = location.state || {};

  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const generateDiagnostic = async () => {
    try {
      setLoading(true);
      const res = await API.post("/learning/generate-diagnostic", { topic });
      setQuestions(res.data.questions);
      setUserAnswers(new Array(res.data.questions.length).fill(""));
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Failed to generate diagnostic.");
      setLoading(false);
    }
  };

  const handleOptionChange = (qIndex, option) => {
    const updated = [...userAnswers];
    updated[qIndex] = option;
    setUserAnswers(updated);
  };

  const submitDiagnostic = async () => {
    try {
      setSubmitting(true);
      const res = await API.post("/learning/submit-diagnostic", {
        topic,
        questions,
        userAnswers,
      });
      navigate("/evaluation", {
        state: { topic, result: res.data, questions, type: "diagnostic" },
      });
    } catch (err) {
      console.error(err);
      alert("Submission failed.");
      setSubmitting(false);
    }
  };

  const answeredCount = userAnswers.filter(a => a !== "").length;
  const progressPct = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;

  return (
    <>
      <style>{styles}</style>

      {/* Full screen loading overlay */}
      {loading && <LoadingOverlay />}

      <div className="diag-bg">
        <div className="diag-container">

          {/* Back Button */}
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Back
          </button>

          {/* Header */}
          <div className="diag-header">
            <div className="diag-badge">Diagnostic Test</div>
            <h1 className="diag-title">{topic || "Topic"}</h1>
            <p className="diag-subtitle">Answer all questions to evaluate your current knowledge level</p>
          </div>

          {/* Start Screen */}
          {!questions.length && !loading && (
            <div className="start-card">
              <div className="start-icon">🧠</div>
              <h2 className="start-title">Ready to test your knowledge?</h2>
              <p className="start-desc">
                We'll generate diagnostic questions on{" "}
                <strong style={{ color: "#a5b4fc" }}>{topic}</strong> to understand
                your current level and personalize your learning path.
              </p>
              <button className="start-btn" onClick={generateDiagnostic}>
                Start Diagnostic
              </button>
            </div>
          )}

          {/* Questions */}
          {questions.length > 0 && (
            <>
              <div className="progress-label">{answeredCount} / {questions.length} answered</div>
              <div className="progress-bar-wrap">
                <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
              </div>

              {questions.map((q, index) => (
                <div key={index} className={`question-card${userAnswers[index] ? " answered" : ""}`}>
                  <div className="question-num">Question {index + 1} of {questions.length}</div>
                  <p className="question-text">{q.question}</p>
                  <div className="options-grid">
                    {Object.entries(q.options).map(([key, value]) => (
                      <label key={key} className={`option-label${userAnswers[index] === key ? " selected" : ""}`}>
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={key}
                          checked={userAnswers[index] === key}
                          onChange={() => handleOptionChange(index, key)}
                        />
                        <div className="option-dot">
                          <div className="option-dot-inner" />
                        </div>
                        <span className="option-key">{key}.</span>
                        {value}
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <div className="submit-area">
                <p className="answered-count">
                  <span>{answeredCount}</span> of <span>{questions.length}</span> questions answered
                </p>
                <button
                  className="submit-btn"
                  onClick={submitDiagnostic}
                  disabled={submitting || answeredCount < questions.length}
                >
                  {submitting ? "Submitting…" : "Submit Diagnostic"}
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
}

export default Diagnostic;