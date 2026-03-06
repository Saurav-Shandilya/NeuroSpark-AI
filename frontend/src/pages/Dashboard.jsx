import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import {
  PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart, BarChart, Bar
} from "recharts";

function Dashboard() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [progressData, setProgressData] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [user, setUser] = useState(null);

  const COLORS = {
    primary: "#0456AC",      // Deep Royal Blue
    white: "#FCFEFC",        // Off-White
    accent: "#0A7AE8",       // Lighter Blue
    success: "#10B981",
    warning: "#F59E0B",
    danger: "#EF4444",
    dark: "#0F172A",
    gray: "#64748B"
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [userRes, progressRes] = await Promise.all([
        API.get("/auth/me").catch(() => ({ data: null })), // Don't crash if unauthenticated
        API.get("/learning/dashboard")
      ]);
      setUser(userRes.data);
      setProgressData(progressRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const startDiagnostic = () => {
    if (!topic) return alert("Enter a topic");
    navigate("/diagnostic", { state: { topic } });
  };

  const grouped = progressData.reduce((acc, item) => {
    if (!acc[item.topic]) acc[item.topic] = [];
    acc[item.topic].push(item);
    return acc;
  }, {});

  // Calculate overall stats
  const totalTopics = Object.keys(grouped).length;
  const totalAttempts = progressData.length;
  const averageScore = totalAttempts > 0
    ? Math.round(progressData.reduce((sum, item) => sum + item.score, 0) / totalAttempts)
    : 0;
  const topScore = totalAttempts > 0
    ? Math.max(...progressData.map(item => item.score))
    : 0;

  // Prepare chart data for selected topic
  const getChartData = (attempts) => {
    return attempts.map((attempt, index) => ({
      name: `Attempt ${index + 1}`,
      score: attempt.score,
      date: new Date(attempt.date).toLocaleDateString()
    }));
  };

  // Performance distribution for pie chart
  const getPerformanceDistribution = () => {
    const ranges = { excellent: 0, good: 0, average: 0, poor: 0 };
    progressData.forEach(item => {
      if (item.score >= 90) ranges.excellent++;
      else if (item.score >= 75) ranges.good++;
      else if (item.score >= 60) ranges.average++;
      else ranges.poor++;
    });
    return [
      { name: "Excellent (90%+)", value: ranges.excellent, color: COLORS.success },
      { name: "Good (75-89%)", value: ranges.good, color: COLORS.primary },
      { name: "Average (60-74%)", value: ranges.average, color: COLORS.warning },
      { name: "Poor (<60%)", value: ranges.poor, color: COLORS.danger }
    ].filter(item => item.value > 0);
  };

  return (
    <div style={{
      minHeight: "100vh",
      padding: "clamp(20px, 5vw, 40px)",
      width: "100%",
      boxSizing: "border-box",
      color: COLORS.white,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      {/* Header Section */}
      <div className="dash-header" style={{
        marginBottom: "40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexWrap: "wrap",
        gap: "30px"
      }}>
        <div style={{ flex: "1 1 300px" }}>
          <h1 style={{
            margin: "0 0 10px 0",
            fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
            fontWeight: "700",
            background: `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.accent} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: "1.2"
          }}>
            {user?.name ? `Welcome back, ${user.name.split(' ')[0]}! 👋` : 'Learning Dashboard'}
          </h1>
          <p style={{ color: COLORS.gray, margin: 0, fontSize: "clamp(0.95rem, 2vw, 1.1rem)" }}>
            Track your progress and master new topics
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div style={{
          display: "flex",
          gap: "20px",
          width: "100%",
          flexWrap: "wrap",
          alignItems: "stretch"
        }}>
          <div className="stats-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "16px",
            flex: "1 1 500px"
          }}>
            {[
              { label: "Topics", value: totalTopics, icon: "📚" },
              { label: "Attempts", value: totalAttempts, icon: "📝" },
              { label: "Avg Score", value: `${averageScore}%`, icon: "📊" },
              { label: "Top Score", value: `${topScore}%`, icon: "🏆" }
            ].map((stat, idx) => (
              <div key={idx} style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(10px)",
                padding: "20px 15px",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.08)",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
              }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "8px" }}>{stat.icon}</div>
                <div style={{ fontSize: "1.5rem", fontWeight: "700", color: COLORS.white }}>{stat.value}</div>
                <div style={{ color: COLORS.gray, fontSize: "0.85rem", fontWeight: "500" }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {totalAttempts > 0 && (
            <div className="performance-box" style={{
              background: "rgba(255,255,255,0.02)",
              backdropFilter: "blur(20px)",
              padding: "16px",
              borderRadius: "24px",
              border: "1px solid rgba(255,255,255,0.08)",
              flex: "1 1 320px",
              maxHeight: "220px",
              display: "flex",
              flexDirection: "column"
            }}>
              <h4 style={{ margin: "0 0 10px 0", color: COLORS.white, fontSize: "0.9rem", fontWeight: "600", textAlign: "center" }}>Distribution</h4>
              <div style={{ height: "140px", width: "100%" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={getPerformanceDistribution()}
                      cx="50%"
                      cy="50%"
                      innerRadius="45%"
                      outerRadius="75%"
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {getPerformanceDistribution().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "rgba(15, 23, 42, 0.95)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px",
                        fontSize: "12px"
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Start New Topic Section */}
      <div className="start-topic-card" style={{
        background: "rgba(4, 86, 172, 0.12)",
        backdropFilter: "blur(20px)",
        padding: "clamp(20px, 4vw, 32px)",
        borderRadius: "24px",
        border: `1px solid ${COLORS.primary}40`,
        marginBottom: "40px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        boxShadow: `0 8px 32px rgba(0,0,0,0.2)`
      }}>
        <div style={{ textAlign: "left" }}>
          <h3 style={{ margin: "0 0 8px 0", color: COLORS.white, fontSize: "1.2rem" }}>Start New Learning Journey</h3>
          <p style={{ margin: 0, color: COLORS.gray, fontSize: "0.9rem", lineHeight: "1.5" }}>
            Enter any topic to begin your personalized AI diagnostic assessment
          </p>
        </div>
        <div className="input-group" style={{
          display: "flex",
          gap: "12px",
          width: "100%",
          flexWrap: "wrap"
        }}>
          <input
            type="text"
            placeholder="What do you want to learn today?"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            style={{
              padding: "16px 20px",
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.05)",
              color: COLORS.white,
              fontSize: "1rem",
              flex: "1 1 300px",
              outline: "none",
              transition: "all 0.3s ease"
            }}
          />
          <button
            onClick={startDiagnostic}
            style={{
              padding: "16px 32px",
              borderRadius: "14px",
              border: "none",
              background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
              color: COLORS.white,
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: `0 4px 15px rgba(4, 86, 172, 0.4)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              flex: "0 0 auto",
              minWidth: "180px"
            }}
          >
            🚀 <span className="hide-mobile">Start Journey</span><span className="show-mobile-inline">Go!</span>
          </button>
        </div>
      </div>


      {/* Progress Cards Grid */}
      <h3 style={{ margin: "0 0 24px 0", color: COLORS.white, fontSize: "1.3rem", fontWeight: "600" }}>Learning Topics</h3>
      <div className="topics-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(clamp(280px, 100%, 360px), 1fr))",
        gap: "20px",
        marginBottom: "60px"
      }}>
        {Object.keys(grouped).map((topicName, index) => {
          const attempts = grouped[topicName];
          const latest = attempts[attempts.length - 1];
          const best = Math.max(...attempts.map(a => a.score));
          const isHovered = hoveredCard === index;
          const sparklineData = attempts.map((a, i) => ({ score: a.score, index: i }));

          return (
            <div
              key={index}
              onClick={() => setSelectedTopic({ name: topicName, attempts })}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: isHovered ? "rgba(4, 86, 172, 0.12)" : "rgba(255,255,255,0.02)",
                backdropFilter: "blur(20px)",
                padding: "24px",
                borderRadius: "24px",
                border: `1px solid ${isHovered ? COLORS.primary : "rgba(255,255,255,0.08)"}`,
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                boxShadow: isHovered ? `0 12px 24px -10px rgba(4, 122, 232, 0.4)` : "none",
                position: "relative",
                overflow: "hidden"
              }}
            >
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "16px",
                  gap: "10px"
                }}>
                  <h3 style={{
                    margin: 0,
                    color: COLORS.white,
                    fontSize: "1.15rem",
                    fontWeight: "600",
                    lineHeight: "1.4"
                  }}>{topicName}</h3>
                  <span style={{
                    flexShrink: 0,
                    background: latest.score >= 80 ? `${COLORS.success}20` : latest.score >= 60 ? `${COLORS.warning}20` : `${COLORS.danger}20`,
                    color: latest.score >= 80 ? COLORS.success : latest.score >= 60 ? COLORS.warning : COLORS.danger,
                    padding: "4px 10px",
                    borderRadius: "12px",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    border: `1px solid ${latest.score >= 80 ? COLORS.success : latest.score >= 60 ? COLORS.warning : COLORS.danger}40`
                  }}>
                    {latest.score >= 80 ? "Pro" : latest.score >= 60 ? "Good" : "Lrn"}
                  </span>
                </div>

                {/* Mini Sparkline */}
                <div style={{ height: "50px", marginBottom: "20px", width: "100%" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sparklineData}>
                      <defs>
                        <linearGradient id={`grad-${index}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="score"
                        stroke={COLORS.primary}
                        fill={`url(#grad-${index})`}
                        strokeWidth={2.5}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "10px",
                  paddingTop: "16px",
                  borderTop: "1px solid rgba(255,255,255,0.05)"
                }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "1.1rem", fontWeight: "700", color: COLORS.white }}>{latest.score}%</div>
                    <div style={{ color: COLORS.gray, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>Latest</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "1.1rem", fontWeight: "700", color: COLORS.success }}>{best}%</div>
                    <div style={{ color: COLORS.gray, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>Best</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "1.1rem", fontWeight: "700", color: COLORS.accent }}>{attempts.length}</div>
                    <div style={{ color: COLORS.gray, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>Runs</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Progress Modal */}
      {selectedTopic && (() => {
        const attempts = selectedTopic.attempts;
        const initial = attempts[0];
        const latest = attempts[attempts.length - 1];
        const improvement = latest.score - initial.score;
        const chartData = getChartData(attempts);

        return (
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(5, 8, 17, 0.9)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "clamp(10px, 3vw, 20px)"
          }} onClick={() => setSelectedTopic(null)}>
            <div className="modal-content" style={{
              background: "#0F172A",
              padding: "clamp(20px, 5vw, 40px)",
              borderRadius: "32px",
              width: "100%",
              maxWidth: "750px",
              maxHeight: "95vh",
              overflowY: "auto",
              color: COLORS.white,
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
              position: "relative"
            }} onClick={(e) => e.stopPropagation()}>

              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "32px",
                gap: "20px"
              }}>
                <div>
                  <h2 style={{ margin: "0 0 8px 0", fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: "700" }}>{selectedTopic.name}</h2>
                  <p style={{ margin: 0, color: COLORS.gray, fontSize: "0.95rem" }}>Deep Performance Analytics</p>
                </div>
                <button
                  onClick={() => setSelectedTopic(null)}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: COLORS.white,
                    width: "44px",
                    height: "44px",
                    borderRadius: "14px",
                    cursor: "pointer",
                    fontSize: "1.2rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s"
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Stats Grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                gap: "16px",
                marginBottom: "32px"
              }}>
                <div className="modal-stat-card">
                  <p className="modal-stat-label">Total Tests</p>
                  <p className="modal-stat-value">{attempts.length}</p>
                </div>
                <div className="modal-stat-card">
                  <p className="modal-stat-label">Net Gain</p>
                  <p className="modal-stat-value" style={{ color: improvement >= 0 ? COLORS.success : COLORS.danger }}>
                    {improvement > 0 ? "+" : ""}{improvement}%
                  </p>
                </div>
                <div className="modal-stat-card">
                  <p className="modal-stat-label">Start Point</p>
                  <p className="modal-stat-value">{initial.score}%</p>
                </div>
                <div className="modal-stat-card" style={{ border: `1px solid ${COLORS.primary}40`, background: `${COLORS.primary}10` }}>
                  <p className="modal-stat-label">Current Mastery</p>
                  <p className="modal-stat-value" style={{ color: COLORS.accent }}>{latest.score}%</p>
                </div>
              </div>

              {/* Progress Chart */}
              <div style={{
                background: "rgba(255,255,255,0.03)",
                padding: "24px",
                borderRadius: "24px",
                border: "1px solid rgba(255,255,255,0.08)",
                marginBottom: "32px"
              }}>
                <h4 style={{ margin: "0 0 20px 0", color: COLORS.white, fontSize: "1rem", fontWeight: "600" }}>Mastery Curve</h4>
                <div style={{ height: "250px", width: "100%" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="name" stroke={COLORS.gray} fontSize={10} axisLine={false} tickLine={false} />
                      <YAxis domain={[0, 100]} stroke={COLORS.gray} fontSize={10} axisLine={false} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          background: "#1e293b",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "12px",
                          color: COLORS.white
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke={COLORS.primary}
                        strokeWidth={4}
                        dot={{ fill: COLORS.primary, strokeWidth: 0, r: 5 }}
                        activeDot={{ r: 7, strokeWidth: 0, fill: COLORS.accent }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <button
                onClick={() => setSelectedTopic(null)}
                style={{
                  width: "100%",
                  padding: "18px",
                  background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
                  color: COLORS.white,
                  border: "none",
                  borderRadius: "16px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: `0 10px 20px rgba(4, 122, 232, 0.3)`
                }}
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        );
      })()}

      <style>{`
        .modal-stat-card {
           background: rgba(255,255,255,0.03);
           padding: 20px;
           borderRadius: 20px;
           border: 1px solid rgba(255,255,255,0.06);
           text-align: center;
        }
        .modal-stat-label {
           margin: 0 0 6px 0;
           color: #94A3B8;
           font-size: 0.8rem;
           text-transform: uppercase;
           letter-spacing: 0.5px;
           font-weight: 500;
        }
        .modal-stat-value {
           margin: 0;
           fontSize: 1.8rem;
           fontWeight: 800;
        }
        .hide-mobile { display: inline; }
        .show-mobile-inline { display: none; }
        
        @media (max-width: 768px) {
          .dash-header { gap: 20px !important; }
          .stats-grid { max-width: 100% !important; }
          .modal-stat-value { font-size: 1.4rem !important; }
        }

        @media (max-width: 500px) {
          .hide-mobile { display: none !important; }
          .show-mobile-inline { display: inline !important; }
          .input-group button { width: 100% !important; }
          .modal-content { padding: 20px !important; border-radius: 24px !important; }
        }
      `}</style>
    </div>

  );
}

export default Dashboard;