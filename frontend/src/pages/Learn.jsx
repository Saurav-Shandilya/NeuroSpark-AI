import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body, #root { width: 100%; min-height: 100vh; margin: 0; padding: 0; }

  .learn-bg {
    min-height: 100vh;
    width: 100%;
    background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
    font-family: 'DM Sans', sans-serif;
    padding: 40px 20px;
  }

  .learn-container { max-width: 780px; margin: 0 auto; }

  /* Back */
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
  .back-btn:hover { background: rgba(255,255,255,0.1); color: #e2e8f0; transform: translateX(-2px); }

  /* Header */
  .learn-badge {
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

  .learn-title {
    font-family: 'Sora', sans-serif;
    font-size: 30px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 8px;
    letter-spacing: -0.5px;
  }

  .learn-subtitle { color: #94a3b8; font-size: 14.5px; margin-bottom: 32px; }

  /* Weak Concepts Pills */
  .weak-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 32px;
  }

  .weak-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(248,113,113,0.1);
    border: 1px solid rgba(248,113,113,0.25);
    color: #fca5a5;
    font-size: 12.5px;
    font-weight: 500;
    padding: 5px 12px;
    border-radius: 20px;
    font-family: 'DM Sans', sans-serif;
  }

  .weak-dot { width: 6px; height: 6px; border-radius: 50%; background: #f87171; flex-shrink: 0; }

  /* Progress Steps */
  .steps-row {
    display: flex;
    align-items: center;
    gap: 0;
    margin-bottom: 36px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 16px;
    padding: 16px 24px;
  }

  .step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    flex: 1;
    position: relative;
  }

  .step:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 16px;
    left: 60%;
    width: 80%;
    height: 2px;
    background: rgba(255,255,255,0.08);
  }

  .step.done:not(:last-child)::after { background: rgba(99,102,241,0.5); }

  .step-circle {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 700;
    font-family: 'Sora', sans-serif;
    border: 2px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.04);
    color: #64748b;
    transition: all 0.3s;
    z-index: 1;
  }

  .step.done .step-circle {
    background: #6366f1;
    border-color: #6366f1;
    color: #fff;
    box-shadow: 0 0 16px rgba(99,102,241,0.5);
  }

  .step.active .step-circle {
    background: rgba(99,102,241,0.2);
    border-color: #6366f1;
    color: #a5b4fc;
    box-shadow: 0 0 16px rgba(99,102,241,0.3);
  }

  .step-label {
    font-size: 11px;
    color: #64748b;
    font-family: 'Sora', sans-serif;
    font-weight: 600;
    text-align: center;
    letter-spacing: 0.3px;
  }

  .step.done .step-label, .step.active .step-label { color: #a5b4fc; }

  /* Cards */
  .learn-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 22px;
    padding: 32px;
    margin-bottom: 20px;
    backdrop-filter: blur(10px);
    transition: border-color 0.3s;
  }

  .learn-card:hover { border-color: rgba(99,102,241,0.3); }

  .card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
  }

  .card-icon {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
  }

  .card-icon.purple { background: rgba(99,102,241,0.15); border: 1px solid rgba(99,102,241,0.3); }
  .card-icon.amber  { background: rgba(251,191,36,0.12); border: 1px solid rgba(251,191,36,0.25); }

  .card-title {
    font-family: 'Sora', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: #e2e8f0;
  }

  .card-subtitle { font-size: 12.5px; color: #64748b; margin-top: 2px; }

  /* Explanation text — collapsible */
  .explanation-text {
    color: #cbd5e1;
    font-size: 15px;
    line-height: 1.8;
    white-space: pre-wrap;
  }

  .read-more-btn {
    background: none;
    border: none;
    color: #6366f1;
    font-size: 13.5px;
    font-weight: 600;
    font-family: 'Sora', sans-serif;
    cursor: pointer;
    margin-top: 10px;
    padding: 0;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    transition: color 0.2s;
  }
  .read-more-btn:hover { color: #a5b4fc; }

  /* Example box */
  .example-box {
    background: rgba(251,191,36,0.06);
    border: 1px solid rgba(251,191,36,0.18);
    border-left: 3px solid #fbbf24;
    border-radius: 0 14px 14px 0;
    padding: 20px 22px;
    color: #fde68a;
    font-size: 15px;
    line-height: 1.8;
    white-space: pre-wrap;
  }

  /* Key Takeaways */
  .takeaway-list { display: flex; flex-direction: column; gap: 10px; }

  .takeaway-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    background: rgba(52,211,153,0.06);
    border: 1px solid rgba(52,211,153,0.15);
    border-radius: 12px;
    padding: 13px 16px;
    color: #a7f3d0;
    font-size: 14px;
    line-height: 1.5;
  }

  .takeaway-check {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: rgba(52,211,153,0.15);
    border: 1px solid rgba(52,211,153,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
    font-size: 11px;
  }

  /* CTA */
  .cta-card {
    background: linear-gradient(135deg, rgba(99,102,241,0.15), rgba(167,139,250,0.1));
    border: 1px solid rgba(99,102,241,0.3);
    border-radius: 22px;
    padding: 36px 32px;
    text-align: center;
    margin-top: 8px;
  }

  .cta-emoji { font-size: 44px; margin-bottom: 14px; }

  .cta-title {
    font-family: 'Sora', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 8px;
  }

  .cta-desc { color: #94a3b8; font-size: 14px; margin-bottom: 28px; line-height: 1.6; }

  .cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: linear-gradient(135deg, #6366f1, #4f46e5);
    color: #fff;
    border: none;
    border-radius: 14px;
    padding: 15px 36px;
    font-family: 'Sora', sans-serif;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.24s ease;
    box-shadow: 0 4px 20px rgba(99,102,241,0.4);
  }
  .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(99,102,241,0.5); }
  .cta-btn:active { transform: translateY(0); }
  .cta-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  /* Loading Overlay */
  .loading-overlay {
    position: fixed; inset: 0;
    background: rgba(15,12,41,0.92);
    backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center;
    z-index: 999;
  }

  .loader-box {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(99,102,241,0.25);
    border-radius: 28px;
    padding: 52px 56px;
    text-align: center;
    display: flex; flex-direction: column; align-items: center; gap: 22px;
    min-width: 300px;
  }

  .brain-pulse { font-size: 52px; animation: pulse 1.4s ease-in-out infinite; }
  @keyframes pulse { 0%,100%{transform:scale(1);opacity:1;} 50%{transform:scale(1.18);opacity:0.7;} }

  .dots-row { display: flex; gap: 10px; justify-content: center; }
  .dot { width:10px; height:10px; border-radius:50%; background:#6366f1; animation: dotBounce 1.2s ease-in-out infinite; }
  .dot:nth-child(2){animation-delay:0.2s;background:#818cf8;}
  .dot:nth-child(3){animation-delay:0.4s;background:#a78bfa;}
  @keyframes dotBounce { 0%,80%,100%{transform:translateY(0);opacity:0.4;} 40%{transform:translateY(-10px);opacity:1;} }

  .loading-title { font-family:'Sora',sans-serif; font-size:18px; font-weight:700; color:#e2e8f0; }
  .loading-sub   { font-size:13.5px; color:#64748b; }

  .loading-bar-track { width:220px; height:4px; background:rgba(255,255,255,0.08); border-radius:99px; overflow:hidden; }
  .loading-bar-fill  { height:100%; width:40%; background:linear-gradient(90deg,#6366f1,#a78bfa); border-radius:99px; animation:shimmer 1.6s ease-in-out infinite; }
  @keyframes shimmer { 0%{transform:translateX(-180%);} 100%{transform:translateX(420%);} }

  @media (max-width: 520px) {
    .learn-title { font-size: 22px; }
    .steps-row { padding: 14px 12px; gap: 0; }
    .step-label { font-size: 9px; }
    .learn-card { padding: 22px 18px; }
    .loader-box { padding: 40px 28px; min-width: unset; width: 90vw; }
  }
`;

function LoadingOverlay() {
  return (
    <div className="loading-overlay">
      <div className="loader-box">
        <div className="brain-pulse">⚡</div>
        <div>
          <div className="loading-title">Preparing Your Test</div>
          <div className="loading-sub" style={{ marginTop: 6 }}>Generating 10 MCQ questions…</div>
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

function Learn() {
  const location = useLocation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [generating, setGenerating] = useState(false);

  const { topic, weakConcepts, explanation, example } = location.state || {};

  const generateTest = async () => {
    try {
      setGenerating(true);
      const res = await API.post("/learning/generate-practice", {
        topic,
        weakConcepts,
      });
      navigate("/practice", {
        state: { topic, questions: res.data.questions },
      });
    } catch (err) {
      console.error(err);
      alert("Failed to generate test.");
      setGenerating(false);
    }
  };

  const shortExplanation = explanation?.slice(0, 320);
  const isLong = explanation?.length > 320;

  // Auto-generate key takeaways from weak concepts
  const takeaways = weakConcepts?.length
    ? weakConcepts.slice(0, 4)
    : ["Review the core concepts carefully", "Understand the examples provided", "Apply the knowledge in practice"];

  return (
    <>
      <style>{styles}</style>
      {generating && <LoadingOverlay />}

      <div className="learn-bg">
        <div className="learn-container">

          {/* Back */}
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Back
          </button>

          {/* Header */}
          <div className="learn-badge">Concept Learning</div>
          <h1 className="learn-title">{topic}</h1>
          <p className="learn-subtitle">Master the concept before taking your practice test</p>

          {/* Weak concept pills */}
          {weakConcepts?.length > 0 && (
            <div className="weak-row">
              {weakConcepts.map((w, i) => (
                <span key={i} className="weak-pill">
                  <span className="weak-dot" />{w}
                </span>
              ))}
            </div>
          )}

          {/* Progress Steps */}
          <div className="steps-row">
            {["Read Concept", "See Example", "Key Points", "Take Test"].map((label, i) => (
              <div key={i} className={`step ${i < 3 ? "done" : "active"}`}>
                <div className="step-circle">
                  {i < 3 ? (
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  ) : (i + 1)}
                </div>
                <span className="step-label">{label}</span>
              </div>
            ))}
          </div>

          {/* Explanation Card */}
          <div className="learn-card">
            <div className="card-header">
              <div className="card-icon purple">📖</div>
              <div>
                <div className="card-title">Explanation</div>
                <div className="card-subtitle">Understand the concept deeply</div>
              </div>
            </div>
            <p className="explanation-text">
              {expanded || !isLong ? explanation : shortExplanation + "…"}
            </p>
            {isLong && (
              <button className="read-more-btn" onClick={() => setExpanded(!expanded)}>
                {expanded ? "Show less ▲" : "Read more ▼"}
              </button>
            )}
          </div>

          {/* Example Card */}
          <div className="learn-card">
            <div className="card-header">
              <div className="card-icon amber">💡</div>
              <div>
                <div className="card-title">Example</div>
                <div className="card-subtitle">See it in action</div>
              </div>
            </div>
            <div className="example-box">{example}</div>
          </div>

          {/* Key Takeaways */}
          <div className="learn-card">
            <div className="card-header">
              <div className="card-icon purple">🎯</div>
              <div>
                <div className="card-title">Key Takeaways</div>
                <div className="card-subtitle">Focus areas to improve your score</div>
              </div>
            </div>
            <div className="takeaway-list">
              {takeaways.map((item, i) => (
                <div key={i} className="takeaway-item">
                  <div className="takeaway-check">✓</div>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="cta-card">
            <div className="cta-emoji">🚀</div>
            <div className="cta-title">Ready to test yourself?</div>
            <p className="cta-desc">
              You've reviewed the concept and examples.<br />
              Now put your knowledge to the test with 10 MCQ questions!
            </p>
            <button className="cta-btn" onClick={generateTest} disabled={generating}>
              <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
              </svg>
              {generating ? "Generating…" : "Now Take 10 MCQ Test"}
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default Learn;