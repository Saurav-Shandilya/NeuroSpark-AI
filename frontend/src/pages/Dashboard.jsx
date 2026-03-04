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
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const res = await API.get("/learning/dashboard");
      setProgressData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const startDiagnostic = () => {
    if (!topic) return alert("Enter a topic");
    navigate("/diagnostic", { state: { topic } });
  };

  // Group progress by topic
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
      padding: "40px",
      width: "100%",
      boxSizing: "border-box",
      color: COLORS.white,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      {/* Header Section */}
      <div style={{
        marginBottom: "40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexWrap: "wrap",
        gap: "20px"
      }}>
        <div>
          <h1 style={{
            margin: "0 0 10px 0",
            fontSize: "2.5rem",
            fontWeight: "700",
            background: `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.accent} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            Learning Dashboard
          </h1>
          <p style={{ color: COLORS.gray, margin: 0, fontSize: "1.1rem" }}>
            Track your progress and master new topics
          </p>
        </div>

        {/* Quick Stats */}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {[
            { label: "Topics", value: totalTopics, icon: "📚" },
            { label: "Attempts", value: totalAttempts, icon: "📝" },
            { label: "Avg Score", value: `${averageScore}%`, icon: "📊" }
          ].map((stat, idx) => (
            <div key={idx} style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(10px)",
              padding: "20px 30px",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.1)",
              textAlign: "center",
              minWidth: "120px"
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "5px" }}>{stat.icon}</div>
              <div style={{ fontSize: "1.8rem", fontWeight: "700", color: COLORS.white }}>{stat.value}</div>
              <div style={{ color: COLORS.gray, fontSize: "0.9rem" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Start New Topic Section */}
      <div style={{
        background: "rgba(4, 86, 172, 0.15)",
        backdropFilter: "blur(20px)",
        padding: "30px",
        borderRadius: "20px",
        border: `1px solid ${COLORS.primary}`,
        marginBottom: "40px",
        display: "flex",
        gap: "20px",
        alignItems: "center",
        flexWrap: "wrap",
        boxShadow: `0 8px 32px rgba(4, 86, 172, 0.3)`
      }}>
        <div style={{ flex: 1, minWidth: "250px" }}>
          <h3 style={{ margin: "0 0 10px 0", color: COLORS.white }}>Start New Learning Journey</h3>
          <p style={{ margin: 0, color: COLORS.gray, fontSize: "0.95rem" }}>
            Enter a topic to begin your personalized diagnostic assessment
          </p>
        </div>
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Enter Topic (e.g., Calculus, Python, History)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            style={{
              padding: "15px 20px",
              borderRadius: "12px",
              border: "2px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.05)",
              color: COLORS.white,
              fontSize: "1rem",
              minWidth: "280px",
              outline: "none",
              transition: "all 0.3s ease"
            }}
            onFocus={(e) => e.target.style.borderColor = COLORS.primary}
            onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
          />
          <button
            onClick={startDiagnostic}
            style={{
              padding: "15px 30px",
              borderRadius: "12px",
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
              gap: "8px"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = `0 6px 20px rgba(4, 86, 172, 0.6)`;
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = `0 4px 15px rgba(4, 86, 172, 0.4)`;
            }}
          >
            <span>🚀</span> Start Diagnostic
          </button>
        </div>
      </div>

      {/* Performance Overview Chart */}
      {totalAttempts > 0 && (
        <div style={{
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(20px)",
          padding: "30px",
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.1)",
          marginBottom: "40px"
        }}>
          <h3 style={{ margin: "0 0 20px 0", color: COLORS.white }}>Performance Distribution</h3>
          <div style={{ height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={getPerformanceDistribution()}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {getPerformanceDistribution().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "rgba(15, 23, 42, 0.9)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: COLORS.white
                  }}
                />
                <Legend
                  verticalAlign="middle"
                  align="right"
                  layout="vertical"
                  wrapperStyle={{ color: COLORS.white }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Progress Cards Grid */}
      <h3 style={{ margin: "0 0 20px 0", color: COLORS.white, fontSize: "1.5rem" }}>Your Topics</h3>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
        gap: "25px",
        marginBottom: "40px"
      }}>
        {Object.keys(grouped).map((topicName, index) => {
          const attempts = grouped[topicName];
          const latest = attempts[attempts.length - 1];
          const best = Math.max(...attempts.map(a => a.score));
          const isHovered = hoveredCard === index;

          // Sparkline data
          const sparklineData = attempts.map((a, i) => ({ score: a.score, index: i }));

          return (
            <div
              key={index}
              onClick={() => setSelectedTopic({ name: topicName, attempts })}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: isHovered ? "rgba(4, 86, 172, 0.2)" : "rgba(255,255,255,0.03)",
                backdropFilter: "blur(20px)",
                padding: "25px",
                borderRadius: "20px",
                border: `1px solid ${isHovered ? COLORS.primary : "rgba(255,255,255,0.1)"}`,
                cursor: "pointer",
                transition: "all 0.3s ease",
                transform: isHovered ? "translateY(-5px)" : "translateY(0)",
                boxShadow: isHovered ? `0 20px 40px rgba(4, 86, 172, 0.3)` : "0 4px 20px rgba(0,0,0,0.2)",
                position: "relative",
                overflow: "hidden"
              }}
            >
              {/* Background Gradient Effect */}
              <div style={{
                position: "absolute",
                top: "-50%",
                right: "-50%",
                width: "200%",
                height: "200%",
                background: `radial-gradient(circle, ${COLORS.primary}20 0%, transparent 70%)`,
                opacity: isHovered ? 1 : 0,
                transition: "opacity 0.3s ease"
              }} />

              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "20px"
                }}>
                  <h3 style={{
                    margin: 0,
                    color: COLORS.white,
                    fontSize: "1.3rem",
                    fontWeight: "600"
                  }}>{topicName}</h3>
                  <span style={{
                    background: latest.score >= 80 ? `${COLORS.success}30` : latest.score >= 60 ? `${COLORS.warning}30` : `${COLORS.danger}30`,
                    color: latest.score >= 80 ? COLORS.success : latest.score >= 60 ? COLORS.warning : COLORS.danger,
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontSize: "0.85rem",
                    fontWeight: "600"
                  }}>
                    {latest.score >= 80 ? "Excellent" : latest.score >= 60 ? "Good" : "Needs Work"}
                  </span>
                </div>

                {/* Mini Sparkline */}
                <div style={{ height: "60px", marginBottom: "20px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sparklineData}>
                      <Area
                        type="monotone"
                        dataKey="score"
                        stroke={COLORS.primary}
                        fill={`${COLORS.primary}30`}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "15px"
                }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{
                      fontSize: "1.4rem",
                      fontWeight: "700",
                      color: COLORS.white
                    }}>{latest.score}%</div>
                    <div style={{ color: COLORS.gray, fontSize: "0.8rem" }}>Latest</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{
                      fontSize: "1.4rem",
                      fontWeight: "700",
                      color: COLORS.success
                    }}>{best}%</div>
                    <div style={{ color: COLORS.gray, fontSize: "0.8rem" }}>Best</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{
                      fontSize: "1.4rem",
                      fontWeight: "700",
                      color: COLORS.accent
                    }}>{attempts.length}</div>
                    <div style={{ color: COLORS.gray, fontSize: "0.8rem" }}>Attempts</div>
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
            backgroundColor: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(5px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px"
          }} onClick={() => setSelectedTopic(null)}>
            <div style={{
              background: `linear-gradient(135deg, #1e293b 0%, ${COLORS.dark} 100%)`,
              padding: "40px",
              borderRadius: "24px",
              width: "100%",
              maxWidth: "700px",
              maxHeight: "90vh",
              overflow: "auto",
              color: COLORS.white,
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
            }} onClick={(e) => e.stopPropagation()}>

              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "30px",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                paddingBottom: "20px"
              }}>
                <div>
                  <h2 style={{ margin: "0 0 5px 0", fontSize: "1.8rem" }}>{selectedTopic.name}</h2>
                  <p style={{ margin: 0, color: COLORS.gray }}>Detailed Performance Analytics</p>
                </div>
                <button
                  onClick={() => setSelectedTopic(null)}
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "none",
                    color: COLORS.white,
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    fontSize: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.2)"}
                  onMouseLeave={(e) => e.target.style.background = "rgba(255,255,255,0.1)"}
                >
                  ×
                </button>
              </div>

              {/* Stats Grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "20px",
                marginBottom: "30px"
              }}>
                <div style={{
                  background: "rgba(255,255,255,0.05)",
                  padding: "20px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.1)"
                }}>
                  <p style={{ margin: "0 0 5px 0", color: COLORS.gray, fontSize: "0.9rem" }}>Total Tests</p>
                  <p style={{ margin: 0, fontSize: "2rem", fontWeight: "700" }}>{attempts.length}</p>
                </div>
                <div style={{
                  background: "rgba(255,255,255,0.05)",
                  padding: "20px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.1)"
                }}>
                  <p style={{ margin: "0 0 5px 0", color: COLORS.gray, fontSize: "0.9rem" }}>Improvement</p>
                  <p style={{
                    margin: 0,
                    fontSize: "2rem",
                    fontWeight: "700",
                    color: improvement > 0 ? COLORS.success : improvement < 0 ? COLORS.danger : COLORS.white
                  }}>
                    {improvement > 0 ? "+" : ""}{improvement}%
                  </p>
                </div>
                <div style={{
                  background: "rgba(255,255,255,0.05)",
                  padding: "20px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.1)"
                }}>
                  <p style={{ margin: "0 0 5px 0", color: COLORS.gray, fontSize: "0.9rem" }}>Initial Score</p>
                  <p style={{ margin: 0, fontSize: "2rem", fontWeight: "700" }}>{initial.score}%</p>
                </div>
                <div style={{
                  background: "rgba(255,255,255,0.05)",
                  padding: "20px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.1)"
                }}>
                  <p style={{ margin: "0 0 5px 0", color: COLORS.gray, fontSize: "0.9rem" }}>Current Score</p>
                  <p style={{ margin: 0, fontSize: "2rem", fontWeight: "700", color: COLORS.primary }}>{latest.score}%</p>
                </div>
              </div>

              {/* Progress Chart */}
              <div style={{
                background: "rgba(255,255,255,0.03)",
                padding: "20px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.1)",
                marginBottom: "20px"
              }}>
                <h4 style={{ margin: "0 0 15px 0", color: COLORS.white }}>Score Progression</h4>
                <div style={{ height: "250px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="name" stroke={COLORS.gray} fontSize={12} />
                      <YAxis domain={[0, 100]} stroke={COLORS.gray} fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          background: "rgba(15, 23, 42, 0.9)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "8px",
                          color: COLORS.white
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke={COLORS.primary}
                        strokeWidth={3}
                        dot={{ fill: COLORS.primary, strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8, fill: COLORS.accent }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Attempt History */}
              <div style={{ marginBottom: "20px" }}>
                <h4 style={{ margin: "0 0 15px 0", color: COLORS.white }}>Attempt History</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {[...attempts].reverse().map((attempt, idx) => (
                    <div key={idx} style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "15px",
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: "8px",
                      borderLeft: `4px solid ${attempt.score >= 80 ? COLORS.success : attempt.score >= 60 ? COLORS.warning : COLORS.danger}`
                    }}>
                      <span style={{ color: COLORS.gray }}>Attempt {attempts.length - idx}</span>
                      <span style={{
                        fontWeight: "600",
                        color: attempt.score >= 80 ? COLORS.success : attempt.score >= 60 ? COLORS.warning : COLORS.danger
                      }}>{attempt.score}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedTopic(null)}
                style={{
                  width: "100%",
                  padding: "15px",
                  background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
                  color: COLORS.white,
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => e.target.style.opacity = "0.9"}
                onMouseLeave={(e) => e.target.style.opacity = "1"}
              >
                Close Analytics
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

export default Dashboard;