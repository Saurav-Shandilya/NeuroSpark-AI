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

  .prac-bg {
    min-height: 100vh;
    width: 100vw;
    background: linear-gradient(135deg, #0A0E1A, #050811, #0f172a);
    font-family: 'DM Sans', sans-serif;
    padding: clamp(20px, 5vw, 60px) clamp(15px, 3vw, 20px);
    color: #FCFEFC;
    overflow-x: hidden;
  }

  .prac-container {
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

  .prac-header { margin-bottom: clamp(24px, 6vw, 40px); }

  .prac-badge {
    display: inline-block;
    background: rgba(4, 86, 172, 0.15);
    border: 1px solid rgba(4, 86, 172, 0.3);
    color: #0A7AE8;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    padding: 6px 14px;
    border-radius: 20px;
    margin-bottom: 16px;
    font-family: 'Sora', sans-serif;
  }

  .prac-title {
    font-family: 'Sora', sans-serif;
    font-size: clamp(1.8rem, 5vw, 2.5rem);
    font-weight: 700;
    color: #fff;
    margin-bottom: 10px;
    letter-spacing: -0.5px;
    line-height: 1.2;
  }

  .prac-subtitle { color: #94a3b8; font-size: clamp(0.9rem, 2vw, 1rem); line-height: 1.5; }

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
    background: linear-gradient(90deg, #0456AC, #0A7AE8);
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

  .question-card.answered { border-color: rgba(10, 122, 232, 0.4); background: rgba(10, 122, 232, 0.02); }

  .question-num {
    font-size: 11px;
    font-weight: 700;
    color: #0A7AE8;
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
    border-color: rgba(10, 122, 232, 0.4);
    background: rgba(10, 122, 232, 0.05);
    color: #e2e8f0;
  }

  .option-label.selected {
    border-color: #0A7AE8;
    background: rgba(4, 86, 172, 0.12);
    color: #fff;
    box-shadow: 0 4px 12px rgba(10, 122, 232, 0.15);
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

  .option-label.selected .option-dot { border-color: #0A7AE8; background: #0A7AE8; }

  .submit-area {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
    padding: 20px 0 60px;
  }

  .submit-btn {
    background: linear-gradient(135deg, #0456AC, #0A7AE8);
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
    box-shadow: 0 8px 25px rgba(4, 86, 172, 0.3);
  }

  @media (max-width: 600px) {
    .submit-area { flex-direction: column; text-align: center; }
    .submit-btn { width: 100%; }
    .prac-bg { padding-top: 20px; }
  }
`;

function Practice() {
  const location = useLocation();
  const navigate = useNavigate();
  // Expect topic and questions to be passed from Learn/Evaluation page
  const { topic, questions } = location.state || {};

  // If we navigated here manually without state, redirect to dashboard
  if (!topic || !questions || questions.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "100px", color: "white" }}>
        <h2>No questions available for practice.</h2>
        <button onClick={() => navigate("/dashboard")} style={{
          marginTop: "20px", padding: "10px 20px", background: "#0456AC",
          color: "white", border: "none", borderRadius: "8px", cursor: "pointer"
        }}>
          Return to Dashboard
        </button>
      </div>
    );
  }

  const [userAnswers, setUserAnswers] = useState(new Array(questions.length).fill(""));
  const [submitting, setSubmitting] = useState(false);

  const handleOptionChange = (qIndex, option) => {
    const updated = [...userAnswers];
    updated[qIndex] = option;
    setUserAnswers(updated);
  };

  const submitPractice = async () => {
    try {
      setSubmitting(true);
      const res = await API.post("/learning/submit-practice", {
        topic,
        questions,
        userAnswers,
      });
      // Redirect to evaluation page with the results
      navigate("/evaluation", {
        state: { topic, result: res.data, questions, type: "practice" },
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
      <div className="prac-bg">
        <div className="prac-container">

          {/* Back Button */}
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to Dashboard
          </button>

          {/* Header */}
          <div className="prac-header">
            <div className="prac-badge">Practice Session</div>
            <h1 className="prac-title">{topic || "Practice Topic"}</h1>
            <p className="prac-subtitle">Test yourself with these questions</p>
          </div>

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
              onClick={submitPractice}
              disabled={submitting || answeredCount < questions.length}
            >
              {submitting ? "Submitting…" : "Submit Practice"}
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default Practice;