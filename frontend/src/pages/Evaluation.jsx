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

  .eval-bg {
    min-height: 100vh;
    width: 100%;
    background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
    font-family: 'DM Sans', sans-serif;
    padding: 40px 20px;
  }

  .eval-container {
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
  }
  .back-btn:hover {
    background: rgba(255,255,255,0.1);
    color: #e2e8f0;
    transform: translateX(-2px);
  }

  /* Header */
  .eval-header { margin-bottom: 28px; }

  .eval-badge {
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

  .eval-title {
    font-family: 'Sora', sans-serif;
    font-size: 28px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 6px;
    letter-spacing: -0.5px;
  }

  .eval-subtitle { color: #94a3b8; font-size: 14.5px; }

  /* Score Cards Row */
  .score-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
    margin-bottom: 28px;
  }

  .score-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    padding: 28px 24px;
    text-align: center;
    backdrop-filter: blur(10px);
  }

  .score-card-label {
    font-size: 11px;
    font-weight: 600;
    color: #64748b;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-family: 'Sora', sans-serif;
    margin-bottom: 12px;
  }

  .score-value {
    font-family: 'Sora', sans-serif;
    font-size: 42px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 8px;
  }

  .score-value.good { color: #34d399; }
  .score-value.mid  { color: #fbbf24; }
  .score-value.low  { color: #f87171; }
  .score-value.up   { color: #34d399; }
  .score-value.down { color: #f87171; }
  .score-value.neutral { color: #94a3b8; }

  .score-desc { font-size: 12.5px; color: #64748b; }

  /* Progress Ring */
  .ring-wrap {
    position: relative;
    width: 80px;
    height: 80px;
    margin: 0 auto 10px;
  }

  .ring-wrap svg { transform: rotate(-90deg); }

  .ring-bg { fill: none; stroke: rgba(255,255,255,0.06); stroke-width: 7; }
  .ring-fill { fill: none; stroke-width: 7; stroke-linecap: round; transition: stroke-dashoffset 1s ease; }

  .ring-text {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Sora', sans-serif;
    font-size: 17px;
    font-weight: 700;
  }

  /* Weak Concepts */
  .section-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    padding: 28px 30px;
    margin-bottom: 20px;
    backdrop-filter: blur(10px);
  }

  .section-title {
    font-family: 'Sora', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: #e2e8f0;
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .concepts-list { display: flex; flex-direction: column; gap: 10px; }

  .concept-item {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(248,113,113,0.08);
    border: 1px solid rgba(248,113,113,0.2);
    border-radius: 12px;
    padding: 12px 16px;
    color: #fca5a5;
    font-size: 14px;
  }

  .concept-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #f87171;
    flex-shrink: 0;
  }

  .all-good {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(52,211,153,0.08);
    border: 1px solid rgba(52,211,153,0.2);
    border-radius: 12px;
    padding: 16px 20px;
    color: #6ee7b7;
    font-size: 14.5px;
    font-weight: 500;
  }

  /* Actions */
  .actions-row {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 8px;
  }

  .action-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 24px;
    border-radius: 13px;
    font-family: 'Sora', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.24s ease;
  }

  .action-btn.primary {
    background: linear-gradient(135deg, #6366f1, #4f46e5);
    color: #fff;
    box-shadow: 0 4px 18px rgba(99,102,241,0.35);
  }
  .action-btn.primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(99,102,241,0.45);
  }

  .action-btn.green {
    background: linear-gradient(135deg, #059669, #047857);
    color: #fff;
    box-shadow: 0 4px 18px rgba(5,150,105,0.3);
  }
  .action-btn.green:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(5,150,105,0.4);
  }

  .action-btn.ghost {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    color: #94a3b8;
  }
  .action-btn.ghost:hover {
    background: rgba(255,255,255,0.1);
    color: #e2e8f0;
    transform: translateY(-2px);
  }

  .action-btn:disabled { opacity: 0.55; cursor: not-allowed; transform: none !important; }

  /* Loading overlay */
  .loading-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15,12,41,0.92);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
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
    gap: 22px;
    min-width: 300px;
  }

  .brain-pulse { font-size: 52px; animation: pulse 1.4s ease-in-out infinite; }
  @keyframes pulse {
    0%,100% { transform: scale(1); opacity: 1; }
    50%      { transform: scale(1.18); opacity: 0.7; }
  }

  .dots-row { display: flex; gap: 10px; justify-content: center; }
  .dot { width: 10px; height: 10px; border-radius: 50%; background: #6366f1; animation: dotBounce 1.2s ease-in-out infinite; }
  .dot:nth-child(2) { animation-delay: 0.2s; background: #818cf8; }
  .dot:nth-child(3) { animation-delay: 0.4s; background: #a78bfa; }
  @keyframes dotBounce {
    0%,80%,100% { transform: translateY(0); opacity: 0.4; }
    40%         { transform: translateY(-10px); opacity: 1; }
  }

  .loading-title { font-family: 'Sora', sans-serif; font-size: 18px; font-weight: 700; color: #e2e8f0; }
  .loading-sub   { font-size: 13.5px; color: #64748b; }

  .loading-bar-track { width: 220px; height: 4px; background: rgba(255,255,255,0.08); border-radius: 99px; overflow: hidden; }
  .loading-bar-fill  { height: 100%; width: 40%; background: linear-gradient(90deg,#6366f1,#a78bfa); border-radius: 99px; animation: shimmer 1.6s ease-in-out infinite; }
  @keyframes shimmer { 0% { transform: translateX(-180%); } 100% { transform: translateX(420%); } }

  /* No data */
  .no-data-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 24px;
    padding: 60px 40px;
    text-align: center;
  }
  .no-data-title { font-family: 'Sora', sans-serif; font-size: 20px; font-weight: 700; color: #e2e8f0; margin-bottom: 10px; }
  .no-data-sub   { color: #64748b; font-size: 14px; margin-bottom: 28px; }

  @media (max-width: 520px) {
    .score-row { grid-template-columns: 1fr 1fr; }
    .loader-box { padding: 40px 28px; min-width: unset; width: 90vw; }
    .actions-row { flex-direction: column; }
    .action-btn { width: 100%; justify-content: center; }
  }
`;

function ScoreRing({ score }) {
  const r = 34;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score >= 75 ? "#34d399" : score >= 50 ? "#fbbf24" : "#f87171";
  return (
    <div className="ring-wrap">
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle className="ring-bg" cx="40" cy="40" r={r} />
        <circle className="ring-fill" cx="40" cy="40" r={r}
          stroke={color}
          strokeDasharray={circ}
          strokeDashoffset={offset} />
      </svg>
      <div className="ring-text" style={{ color }}>{score}%</div>
    </div>
  );
}

function LoadingOverlay({ text = "Generating Practice Test" }) {
  return (
    <div className="loading-overlay">
      <div className="loader-box">
        <div className="brain-pulse">🧠</div>
        <div>
          <div className="loading-title">{text}</div>
          <div className="loading-sub" style={{ marginTop: 6 }}>Please wait a moment…</div>
        </div>
        <div className="dots-row">
          <div className="dot" /><div className="dot" /><div className="dot" />
        </div>
        <div className="loading-bar-track">
          <div className="loading-bar-fill" />
        </div>
      </div>
    </div>
  );
}

function Evaluation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [generating, setGenerating] = useState(false);

  const { topic, result, questions, type } = location.state || {};

  if (!result) {
    return (
      <>
        <style>{styles}</style>
        <div className="eval-bg">
          <div className="eval-container">
            <button className="back-btn" onClick={() => navigate(-1)}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
              Back
            </button>
            <div className="no-data-card">
              <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
              <div className="no-data-title">No evaluation data found.</div>
              <div className="no-data-sub">There's nothing to display here yet.</div>
              <button className="action-btn primary" onClick={() => navigate("/dashboard")}>
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  const generatePractice = async () => {
    try {
      setGenerating(true);
      const res = await API.post("/learning/generate-practice", {
        topic,
        weakConcepts: result.weakConcepts || [],
      });
      navigate("/practice", {
        state: { topic, questions: res.data.questions },
      });
    } catch (err) {
      console.error(err);
      alert("Practice generation failed.");
      setGenerating(false);
    }
  };

  const scoreClass = result.score >= 75 ? "good" : result.score >= 50 ? "mid" : "low";
  const improvClass = result.improvement > 0 ? "up" : result.improvement < 0 ? "down" : "neutral";
  const improvSign  = result.improvement > 0 ? `+${result.improvement}%` : `${result.improvement}%`;

  return (
    <>
      <style>{styles}</style>
      {generating && <LoadingOverlay text="Generating Practice Test" />}

      <div className="eval-bg">
        <div className="eval-container">

          {/* Back */}
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Back
          </button>

          {/* Header */}
          <div className="eval-header">
            <div className="eval-badge">Evaluation Result</div>
            <h1 className="eval-title">{topic}</h1>
            <p className="eval-subtitle">Here's how you performed on this topic</p>
          </div>

          {/* Score Cards */}
          <div className="score-row">
            <div className="score-card">
              <div className="score-card-label">Your Score</div>
              <ScoreRing score={result.score} />
              <div className="score-desc">
                {result.score >= 75 ? "Great job! 🎉" : result.score >= 50 ? "Almost there!" : "Keep practicing"}
              </div>
            </div>

            {result.improvement !== undefined && (
              <div className="score-card">
                <div className="score-card-label">Improvement</div>
                <div className={`score-value ${improvClass}`}>{improvSign}</div>
                <div className="score-desc">
                  {result.improvement > 0 ? "Better than last time" : result.improvement < 0 ? "Needs more work" : "Same as before"}
                </div>
              </div>
            )}

            <div className="score-card">
              <div className="score-card-label">Weak Areas</div>
              <div className={`score-value ${result.weakConcepts.length === 0 ? "good" : "low"}`}>
                {result.weakConcepts.length}
              </div>
              <div className="score-desc">
                {result.weakConcepts.length === 0 ? "No weak areas 🏆" : "Concepts to review"}
              </div>
            </div>
          </div>

          {/* Weak Concepts */}
          <div className="section-card">
            <div className="section-title">
              <span>⚠️</span> Weak Concepts
            </div>
            {result.weakConcepts.length === 0 ? (
              <div className="all-good">
                <span>🎉</span>
                Excellent! No weak concepts found — you've mastered this topic.
              </div>
            ) : (
              <div className="concepts-list">
                {result.weakConcepts.map((item, index) => (
                  <div className="concept-item" key={index}>
                    <div className="concept-dot" />
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="section-card">
            <div className="section-title"><span>🚀</span> What's Next?</div>
            <div className="actions-row">
              {type === "diagnostic" && (
                <>
                  <button className="action-btn green" onClick={() => navigate("/learn", {
                    state: {
                      topic,
                      weakConcepts: result.weakConcepts,
                      explanation: result.conceptExplanation,
                      example: result.example
                    }
                  })}>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                    Explore Concept
                  </button>
                  <button className="action-btn primary" onClick={generatePractice} disabled={generating}>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                    </svg>
                    {generating ? "Generating…" : "Take Practice Test"}
                  </button>
                </>
              )}

              {type === "practice" && (
                <button className="action-btn primary" onClick={generatePractice} disabled={generating}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                  </svg>
                  {generating ? "Generating…" : "Test Again"}
                </button>
              )}

              <button className="action-btn ghost" onClick={() => navigate("/dashboard")}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                Back to Dashboard
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Evaluation;