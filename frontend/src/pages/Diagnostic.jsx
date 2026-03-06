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
    padding: clamp(20px, 5vw, 60px) clamp(15px, 3vw, 20px);
    color: #FCFEFC;
    overflow-x: hidden;
  }

  .diag-container {
    max-width: 800px;
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
    padding: 10px 20px;
    border-radius: 12px;
    cursor: pointer;
    margin-bottom: 32px;
    transition: all 0.2s ease;
    text-decoration: none;
  }
  .back-btn:hover {
    background: rgba(255,255,255,0.1);
    color: #fff;
    transform: translateX(-3px);
  }

  .diag-header { margin-bottom: clamp(24px, 6vw, 40px); }

  .diag-badge {
    display: inline-block;
    background: rgba(99,102,241,0.15);
    border: 1px solid rgba(99,102,241,0.3);
    color: #a5b4fc;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    padding: 6px 14px;
    border-radius: 20px;
    margin-bottom: 16px;
    font-family: 'Sora', sans-serif;
  }

  .diag-title {
    font-family: 'Sora', sans-serif;
    font-size: clamp(1.8rem, 5vw, 2.5rem);
    font-weight: 700;
    color: #fff;
    margin-bottom: 10px;
    letter-spacing: -0.5px;
    line-height: 1.2;
  }

  .diag-subtitle { color: #94a3b8; font-size: clamp(0.9rem, 2vw, 1rem); line-height: 1.5; }

  .progress-bar-wrap {
    background: rgba(255,255,255,0.05);
    border-radius: 99px;
    height: 8px;
    margin-bottom: 32px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.05);
  }

  .progress-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #6366f1, #a78bfa);
    border-radius: 99px;
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .progress-label {
    font-size: 12px;
    color: #64748b;
    margin-bottom: 10px;
    text-align: right;
    font-family: 'Sora', sans-serif;
    font-weight: 500;
  }

  /* Start Card */
  .start-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 28px;
    padding: clamp(40px, 10vw, 80px) clamp(20px, 5vw, 40px);
    text-align: center;
    backdrop-filter: blur(20px);
  }

  .start-icon { font-size: clamp(3rem, 10vw, 4.5rem); margin-bottom: 24px; }

  .start-title {
    font-family: 'Sora', sans-serif;
    font-size: clamp(1.3rem, 4vw, 1.8rem);
    font-weight: 700;
    color: #fff;
    margin-bottom: 12px;
  }

  .start-desc {
    color: #94a3b8;
    font-size: clamp(0.9rem, 2vw, 1.05rem);
    max-width: 450px;
    margin: 0 auto 40px;
    line-height: 1.7;
  }

  .start-btn {
    background: linear-gradient(135deg, #6366f1, #4f46e5);
    color: #fff;
    border: none;
    border-radius: 16px;
    padding: 18px 48px;
    font-family: 'Sora', sans-serif;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 8px 25px rgba(99,102,241,0.4);
    width: clamp(200px, 100%, 300px);
  }
  .start-btn:hover { transform: translateY(-3px); box-shadow: 0 12px 35px rgba(99,102,241,0.5); }

  /* Loading Overlay */
  .loading-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 12, 41, 0.95);
    backdrop-filter: blur(8px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 999;
  }

  .loader-box {
    background: rgba(15, 23, 42, 0.95);
    border: 1px solid rgba(99,102,241,0.2);
    border-radius: 32px;
    padding: clamp(30px, 8vw, 60px);
    text-align: center;
    width: min(90vw, 400px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
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

  /* Question Cards */
  .question-card {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 24px;
    padding: clamp(20px, 5vw, 32px);
    margin-bottom: 20px;
    backdrop-filter: blur(20px);
    transition: all 0.3s ease;
  }

  .question-card.answered { border-color: rgba(99,102,241,0.4); background: rgba(99,102,241,0.02); }

  .question-num {
    font-size: 11px;
    font-weight: 700;
    color: #818cf8;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    font-family: 'Sora', sans-serif;
    margin-bottom: 12px;
  }

  .question-text {
    font-size: clamp(1rem, 2.5vw, 1.15rem);
    font-weight: 500;
    color: #f1f5f9;
    margin-bottom: 24px;
    line-height: 1.6;
  }

  .options-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(clamp(250px, 100%, 300px), 1fr));
    gap: 12px;
  }

  .option-label {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: clamp(12px, 3vw, 16px);
    border: 1.5px solid rgba(255,255,255,0.06);
    border-radius: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
    background: rgba(255,255,255,0.02);
    color: #94a3b8;
    font-size: clamp(0.85rem, 2vw, 0.95rem);
    line-height: 1.5;
  }

  .option-label:hover {
    border-color: rgba(99,102,241,0.4);
    background: rgba(99,102,241,0.05);
    color: #e2e8f0;
  }

  .option-label.selected {
    border-color: #6366f1;
    background: rgba(99,102,241,0.12);
    color: #fff;
    box-shadow: 0 4px 12px rgba(99,102,241,0.15);
  }

  .option-label input[type="radio"] { display: none; }

  .option-dot {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .option-label.selected .option-dot { border-color: #6366f1; background: #6366f1; }

  .option-dot-inner {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #fff;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .option-label.selected .option-dot-inner { opacity: 1; }

  .option-key {
    font-family: 'Sora', sans-serif;
    font-weight: 700;
    font-size: clamp(0.8rem, 2vw, 0.9rem);
    color: #818cf8;
    min-width: 20px;
  }

  .submit-area {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
    padding: 20px 0 60px;
  }

  .answered-count {
    font-size: 14px;
    color: #64748b;
    font-family: 'Sora', sans-serif;
  }
  .answered-count span { color: #a5b4fc; font-weight: 700; }

  .submit-btn {
    background: linear-gradient(135deg, #6366f1, #4f46e5);
    color: #fff;
    border: none;
    border-radius: 14px;
    padding: 16px 40px;
    font-family: 'Sora', sans-serif;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    width: clamp(200px, 100%, auto);
    box-shadow: 0 8px 25px rgba(99,102,241,0.3);
  }

  .submit-btn:hover:not(:disabled) { transform: translateY(-3px); box-shadow: 0 12px 35px rgba(99,102,241,0.45); }
  .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  @media (max-width: 600px) {
    .submit-area { flex-direction: column; text-align: center; gap: 24px; }
    .submit-btn { width: 100%; padding: 18px; }
    .diag-bg { padding-top: 20px; }
  }
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
              <path d="M19 12H5M12 5l-7 7 7 7" />
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