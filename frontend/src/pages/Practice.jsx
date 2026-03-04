import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import {
  PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Area, AreaChart, BarChart, Bar
} from "recharts";

function Dashboard() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [progressData, setProgressData] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const COLORS = {
    primary: "#0456AC",
    primaryLight: "#0A7AE8",
    primaryDark: "#034694",
    white: "#FCFEFC",
    offWhite: "#F0F4F8",
    dark: "#0A0E1A",
    darker: "#050811",
    glass: "rgba(4, 86, 172, 0.15)",
    success: "#10B981",
    warning: "#F59E0B",
    danger: "#EF4444",
    gray: "#94A3B8"
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
    if (!topic.trim()) return;
    navigate("/diagnostic", { state: { topic } });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') startDiagnostic();
  };

  // Group progress by topic
  const grouped = progressData.reduce((acc, item) => {
    if (!acc[item.topic]) acc[item.topic] = [];
    acc[item.topic].push(item);
    return acc;
  }, {});

  const totalTopics = Object.keys(grouped).length;
  const totalAttempts = progressData.length;
  const averageScore = totalAttempts > 0
    ? Math.round(progressData.reduce((sum, item) => sum + item.score, 0) / totalAttempts)
    : 0;

  const getChartData = (attempts) => {
    return attempts.map((attempt, index) => ({
      name: `Test ${index + 1}`,
      score: attempt.score,
      fullDate: new Date(attempt.date).toLocaleDateString()
    }));
  };

  const getPerformanceDistribution = () => {
    const ranges = { excellent: 0, good: 0, average: 0, poor: 0 };
    progressData.forEach(item => {
      if (item.score >= 90) ranges.excellent++;
      else if (item.score >= 75) ranges.good++;
      else if (item.score >= 60) ranges.average++;
      else ranges.poor++;
    });
    return [
      { name: "Mastery (90%+)", value: ranges.excellent, color: COLORS.success },
      { name: "Proficient (75-89%)", value: ranges.good, color: COLORS.primary },
      { name: "Developing (60-74%)", value: ranges.average, color: COLORS.warning },
      { name: "Needs Focus (<60%)", value: ranges.poor, color: COLORS.danger }
    ].filter(item => item.value > 0);
  };

  return (
    <div style={{
      minHeight: "100vh",
      width: "100vw",
      background: `linear-gradient(180deg, ${COLORS.darker} 0%, ${COLORS.dark} 50%, #0f172a 100%)`,
      color: COLORS.white,
      fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
      overflowX: "hidden",
      position: "relative"
    }}>
      {/* Animated Background Mesh */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 50%, ${COLORS.primary}15 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, ${COLORS.primaryLight}10 0%, transparent 40%),
          radial-gradient(circle at 40% 20%, ${COLORS.primary}08 0%, transparent 30%)
        `,
        pointerEvents: "none",
        zIndex: 0
      }} />

      {/* Floating Particles Effect */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Ccircle cx=\"50\" cy=\"50\" r=\"1\" fill=\"%23ffffff\" opacity=\"0.1\"/%3E%3C/svg%3E')",
        backgroundSize: "100px 100px",
        opacity: 0.3,
        pointerEvents: "none",
        zIndex: 0
      }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>

        {/* Hero Section with Centered Search */}
        <div style={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
          position: "relative"
        }}>
          {/* Logo/Brand */}
          <div style={{
            marginBottom: "40px",
            textAlign: "center"
          }}>
            <h1 style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: "800",
              margin: "0 0 15px 0",
              background: `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.primaryLight} 50%, ${COLORS.primary} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.02em"
            }}>
              What would you like to learn?
            </h1>
            <p style={{
              fontSize: "1.2rem",
              color: COLORS.gray,
              margin: 0,
              fontWeight: "400"
            }}>
              Enter any topic to begin your personalized learning journey
            </p>
          </div>

          {/* Main Search Container - ChatGPT/Kimi Style */}
          <div style={{
            width: "100%",
            maxWidth: "800px",
            position: "relative"
          }}>
            {/* Glow Effect Behind Search */}
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: isSearchFocused ? "110%" : "100%",
              height: isSearchFocused ? "140%" : "120%",
              background: `radial-gradient(circle, ${COLORS.primary}40 0%, transparent 70%)`,
              filter: "blur(40px)",
              opacity: isSearchFocused ? 1 : 0.6,
              transition: "all 0.3s ease",
              zIndex: -1
            }} />

            {/* Search Bar */}
            <div style={{
              background: "rgba(15, 23, 42, 0.8)",
              backdropFilter: "blur(20px)",
              borderRadius: "24px",
              border: `2px solid ${isSearchFocused ? COLORS.primary : "rgba(255,255,255,0.1)"}`,
              padding: "8px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              boxShadow: isSearchFocused
                ? `0 0 0 4px ${COLORS.primary}30, 0 20px 60px rgba(4, 86, 172, 0.4)`
                : "0 10px 40px rgba(0,0,0,0.3)",
              transition: "all 0.3s ease"
            }}>
              {/* Search Icon */}
              <div style={{
                padding: "0 8px 0 16px",
                color: COLORS.gray,
                display: "flex",
                alignItems: "center"
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </div>

              <input
                type="text"
                placeholder="Enter a topic (e.g., Quantum Physics, Machine Learning, World History...)"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  color: COLORS.white,
                  fontSize: "1.1rem",
                  padding: "16px 0",
                  outline: "none",
                  fontFamily: "inherit"
                }}
              />

              {/* Send Button */}
              <button
                onClick={startDiagnostic}
                disabled={!topic.trim()}
                style={{
                  background: topic.trim()
                    ? `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)`
                    : "rgba(255,255,255,0.1)",
                  border: "none",
                  borderRadius: "16px",
                  width: "44px",
                  height: "44px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: topic.trim() ? "pointer" : "not-allowed",
                  transition: "all 0.3s ease",
                  transform: topic.trim() ? "scale(1)" : "scale(0.9)",
                  opacity: topic.trim() ? 1 : 0.5
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.white} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>

            {/* Quick Suggestions */}
            <div style={{
              display: "flex",
              gap: "10px",
              marginTop: "20px",
              flexWrap: "wrap",
              justifyContent: "center"
            }}>
              {["Mathematics", "Python Programming", "Data Science", "History", "Physics"].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setTopic(suggestion)}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "20px",
                    padding: "8px 16px",
                    color: COLORS.gray,
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    backdropFilter: "blur(10px)"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "rgba(4, 86, 172, 0.2)";
                    e.target.style.color = COLORS.white;
                    e.target.style.borderColor = COLORS.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "rgba(255,255,255,0.05)";
                    e.target.style.color = COLORS.gray;
                    e.target.style.borderColor = "rgba(255,255,255,0.1)";
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          {totalTopics > 0 && (
            <div style={{
              position: "absolute",
              bottom: "40px",
              animation: "bounce 2s infinite",
              color: COLORS.gray,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer"
            }} onClick={() => document.getElementById('stats-section').scrollIntoView({ behavior: 'smooth' })}>
              <span style={{ fontSize: "0.9rem" }}>View Your Progress</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </div>
          )}
        </div>

        {/* Stats & Progress Section */}
        {totalTopics > 0 && (
          <div id="stats-section" style={{
            padding: "60px 40px",
            maxWidth: "1400px",
            margin: "0 auto"
          }}>
            {/* Section Header */}
            <div style={{
              textAlign: "center",
              marginBottom: "50px"
            }}>
              <h2 style={{
                fontSize: "2rem",
                fontWeight: "700",
                margin: "0 0 10px 0",
                color: COLORS.white
              }}>Your Learning Analytics</h2>
              <div style={{
                width: "60px",
                height: "4px",
                background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
                margin: "0 auto",
                borderRadius: "2px"
              }} />
            </div>

            {/* Stats Cards */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "24px",
              marginBottom: "50px"
            }}>
              {[
                {
                  label: "Active Topics",
                  value: totalTopics,
                  icon: "🎯",
                  gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                },
                {
                  label: "Total Assessments",
                  value: totalAttempts,
                  icon: "📊",
                  gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                },
                {
                  label: "Average Mastery",
                  value: `${averageScore}%`,
                  icon: "🏆",
                  gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
                },
                {
                  label: "Learning Streak",
                  value: "12 Days",
                  icon: "🔥",
                  gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
                }
              ].map((stat, idx) => (
                <div key={idx} style={{
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(20px)",
                  borderRadius: "20px",
                  padding: "30px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  position: "relative",
                  overflow: "hidden",
                  transition: "transform 0.3s ease"
                }}>
                  <div style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "100px",
                    height: "100px",
                    background: stat.gradient,
                    opacity: 0.2,
                    filter: "blur(40px)",
                    borderRadius: "50%"
                  }} />
                  <div style={{ fontSize: "2.5rem", marginBottom: "10px" }}>{stat.icon}</div>
                  <div style={{
                    fontSize: "2.5rem",
                    fontWeight: "800",
                    color: COLORS.white,
                    marginBottom: "5px",
                    background: stat.gradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}>{stat.value}</div>
                  <div style={{ color: COLORS.gray, fontSize: "1rem" }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Charts Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
              gap: "30px",
              marginBottom: "50px"
            }}>
              {/* Performance Distribution */}
              <div style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(20px)",
                borderRadius: "24px",
                padding: "30px",
                border: "1px solid rgba(255,255,255,0.1)"
              }}>
                <h3 style={{
                  margin: "0 0 20px 0",
                  fontSize: "1.3rem",
                  color: COLORS.white,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}>
                  <span style={{ color: COLORS.primary }}>●</span> Performance Distribution
                </h3>
                <div style={{ height: "300px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getPerformanceDistribution()}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={110}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {getPerformanceDistribution().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0.3)" strokeWidth={2} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: "rgba(10, 14, 26, 0.95)",
                          border: `1px solid ${COLORS.primary}`,
                          borderRadius: "12px",
                          color: COLORS.white,
                          padding: "12px"
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "20px",
                  flexWrap: "wrap",
                  marginTop: "10px"
                }}>
                  {getPerformanceDistribution().map((item, idx) => (
                    <div key={idx} style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "0.85rem",
                      color: COLORS.gray
                    }}>
                      <div style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: item.color
                      }} />
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity Chart */}
              <div style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(20px)",
                borderRadius: "24px",
                padding: "30px",
                border: "1px solid rgba(255,255,255,0.1)"
              }}>
                <h3 style={{
                  margin: "0 0 20px 0",
                  fontSize: "1.3rem",
                  color: COLORS.white,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}>
                  <span style={{ color: COLORS.primary }}>●</span> Recent Activity
                </h3>
                <div style={{ height: "300px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={progressData.slice(-10).map((item, i) => ({ ...item, index: i }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="topic" stroke={COLORS.gray} fontSize={11} angle={-45} textAnchor="end" height={80} />
                      <YAxis stroke={COLORS.gray} fontSize={12} />
                      <Tooltip
                        cursor={{ fill: "rgba(255,255,255,0.05)" }}
                        contentStyle={{
                          background: "rgba(10, 14, 26, 0.95)",
                          border: `1px solid ${COLORS.primary}`,
                          borderRadius: "12px",
                          color: COLORS.white
                        }}
                      />
                      <Bar
                        dataKey="score"
                        fill={COLORS.primary}
                        radius={[8, 8, 0, 0]}
                        animationDuration={1500}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Topic Cards Grid */}
            <h3 style={{
              fontSize: "1.5rem",
              margin: "0 0 25px 0",
              color: COLORS.white,
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}>
              <span style={{ color: COLORS.primary }}>▸</span> Your Learning Paths
            </h3>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "24px"
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
                      background: isHovered
                        ? "linear-gradient(135deg, rgba(4, 86, 172, 0.2) 0%, rgba(10, 122, 232, 0.1) 100%)"
                        : "rgba(255,255,255,0.03)",
                      backdropFilter: "blur(20px)",
                      borderRadius: "20px",
                      padding: "28px",
                      border: `1px solid ${isHovered ? COLORS.primary : "rgba(255,255,255,0.1)"}`,
                      cursor: "pointer",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      transform: isHovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
                      boxShadow: isHovered
                        ? `0 25px 50px -12px rgba(4, 86, 172, 0.5)`
                        : "0 4px 20px rgba(0,0,0,0.2)",
                      position: "relative",
                      overflow: "hidden"
                    }}
                  >
                    {/* Animated Gradient Background */}
                    <div style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(135deg, ${COLORS.primary}10 0%, transparent 50%, ${COLORS.primaryLight}05 100%)`,
                      opacity: isHovered ? 1 : 0,
                      transition: "opacity 0.4s ease"
                    }} />

                    <div style={{ position: "relative", zIndex: 1 }}>
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "20px"
                      }}>
                        <h4 style={{
                          margin: 0,
                          fontSize: "1.25rem",
                          fontWeight: "600",
                          color: COLORS.white,
                          maxWidth: "70%"
                        }}>{topicName}</h4>
                        <div style={{
                          background: latest.score >= 80
                            ? `linear-gradient(135deg, ${COLORS.success}40, ${COLORS.success}20)`
                            : latest.score >= 60
                              ? `linear-gradient(135deg, ${COLORS.warning}40, ${COLORS.warning}20)`
                              : `linear-gradient(135deg, ${COLORS.danger}40, ${COLORS.danger}20)`,
                          color: latest.score >= 80 ? COLORS.success : latest.score >= 60 ? COLORS.warning : COLORS.danger,
                          padding: "6px 14px",
                          borderRadius: "20px",
                          fontSize: "0.8rem",
                          fontWeight: "700",
                          border: `1px solid ${latest.score >= 80 ? COLORS.success : latest.score >= 60 ? COLORS.warning : COLORS.danger}40`
                        }}>
                          {latest.score >= 80 ? "Mastered" : latest.score >= 60 ? "Progressing" : "Learning"}
                        </div>
                      </div>

                      {/* Sparkline */}
                      <div style={{ height: "70px", marginBottom: "20px" }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={sparklineData}>
                            <defs>
                              <linearGradient id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <Area
                              type="monotone"
                              dataKey="score"
                              stroke={COLORS.primary}
                              fill={`url(#gradient-${index})`}
                              strokeWidth={3}
                              animationDuration={2000}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>

                      <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "15px",
                        paddingTop: "15px",
                        borderTop: "1px solid rgba(255,255,255,0.1)"
                      }}>
                        {[
                          { label: "Latest", value: `${latest.score}%`, color: COLORS.white },
                          { label: "Best", value: `${best}%`, color: COLORS.success },
                          { label: "Tests", value: attempts.length, color: COLORS.primaryLight }
                        ].map((stat, i) => (
                          <div key={i} style={{ textAlign: "center" }}>
                            <div style={{
                              fontSize: "1.3rem",
                              fontWeight: "700",
                              color: stat.color,
                              marginBottom: "4px"
                            }}>{stat.value}</div>
                            <div style={{ fontSize: "0.75rem", color: COLORS.gray, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {totalTopics === 0 && (
          <div style={{
            textAlign: "center",
            padding: "100px 20px",
            color: COLORS.gray
          }}>
            <div style={{ fontSize: "4rem", marginBottom: "20px" }}>🚀</div>
            <h3 style={{ color: COLORS.white, marginBottom: "10px" }}>Ready to Start?</h3>
            <p>Enter a topic above to begin your first diagnostic assessment</p>
          </div>
        )}
      </div>

      {/* Detailed Modal */}
      {
        selectedTopic && (() => {
          const attempts = selectedTopic.attempts;
          const initial = attempts[0];
          const latest = attempts[attempts.length - 1];
          const improvement = latest.score - initial.score;
          const chartData = getChartData(attempts);

          return (
            <div style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.8)",
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              padding: "20px",
              animation: "fadeIn 0.3s ease"
            }} onClick={() => setSelectedTopic(null)}>
              <div style={{
                background: `linear-gradient(180deg, #1e293b 0%, ${COLORS.dark} 100%)`,
                borderRadius: "24px",
                width: "100%",
                maxWidth: "800px",
                maxHeight: "90vh",
                overflow: "auto",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: `0 25px 50px -12px rgba(4, 86, 172, 0.5)`,
                animation: "slideUp 0.4s ease"
              }} onClick={(e) => e.stopPropagation()}>

                {/* Modal Header */}
                <div style={{
                  padding: "30px 30px 0 30px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start"
                }}>
                  <div>
                    <h2 style={{
                      margin: "0 0 8px 0",
                      fontSize: "1.8rem",
                      color: COLORS.white,
                      fontWeight: "700"
                    }}>{selectedTopic.name}</h2>
                    <p style={{ margin: 0, color: COLORS.gray }}>Detailed Performance Analysis</p>
                  </div>
                  <button
                    onClick={() => setSelectedTopic(null)}
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      border: "none",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      color: COLORS.white,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.5rem",
                      transition: "all 0.2s",
                      backdropFilter: "blur(10px)"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "rgba(239, 68, 68, 0.3)";
                      e.target.style.transform = "rotate(90deg)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "rgba(255,255,255,0.1)";
                      e.target.style.transform = "rotate(0deg)";
                    }}
                  >
                    ×
                  </button>
                </div>

                <div style={{ padding: "30px" }}>
                  {/* Stats Row */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "15px",
                    marginBottom: "30px"
                  }}>
                    {[
                      { label: "Tests Taken", value: attempts.length, icon: "📝" },
                      { label: "First Score", value: `${initial.score}%`, icon: "🎯" },
                      { label: "Current", value: `${latest.score}%`, icon: "📈", highlight: true },
                      { label: "Improvement", value: `${improvement > 0 ? '+' : ''}${improvement}%`, icon: "🚀", color: improvement > 0 ? COLORS.success : improvement < 0 ? COLORS.danger : COLORS.gray }
                    ].map((stat, i) => (
                      <div key={i} style={{
                        background: stat.highlight
                          ? `linear-gradient(135deg, ${COLORS.primary}30, ${COLORS.primaryLight}20)`
                          : "rgba(255,255,255,0.05)",
                        borderRadius: "16px",
                        padding: "20px",
                        textAlign: "center",
                        border: stat.highlight ? `1px solid ${COLORS.primary}50` : "1px solid rgba(255,255,255,0.1)"
                      }}>
                        <div style={{ fontSize: "1.5rem", marginBottom: "8px" }}>{stat.icon}</div>
                        <div style={{
                          fontSize: "1.4rem",
                          fontWeight: "700",
                          color: stat.color || COLORS.white,
                          marginBottom: "4px"
                        }}>{stat.value}</div>
                        <div style={{ fontSize: "0.8rem", color: COLORS.gray }}>{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Progress Chart */}
                  <div style={{
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "16px",
                    padding: "25px",
                    marginBottom: "25px",
                    border: "1px solid rgba(255,255,255,0.1)"
                  }}>
                    <h4 style={{ margin: "0 0 20px 0", color: COLORS.white }}>Score Progression</h4>
                    <div style={{ height: "250px" }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                          <defs>
                            <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.4} />
                              <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                          <XAxis dataKey="name" stroke={COLORS.gray} fontSize={12} />
                          <YAxis domain={[0, 100]} stroke={COLORS.gray} fontSize={12} />
                          <Tooltip
                            contentStyle={{
                              background: "rgba(10, 14, 26, 0.95)",
                              border: `1px solid ${COLORS.primary}`,
                              borderRadius: "12px",
                              color: COLORS.white
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="score"
                            stroke={COLORS.primary}
                            fill="url(#progressGradient)"
                            strokeWidth={3}
                          />
                          <Line
                            type="monotone"
                            dataKey="score"
                            stroke={COLORS.white}
                            strokeWidth={2}
                            dot={{ fill: COLORS.primary, strokeWidth: 2, r: 5 }}
                            activeDot={{ r: 8, fill: COLORS.primaryLight }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Attempt History */}
                  <div>
                    <h4 style={{ margin: "0 0 15px 0", color: COLORS.white }}>Test History</h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {[...attempts].reverse().map((attempt, idx) => (
                        <div key={idx} style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "16px 20px",
                          background: "rgba(255,255,255,0.05)",
                          borderRadius: "12px",
                          borderLeft: `4px solid ${attempt.score >= 80 ? COLORS.success : attempt.score >= 60 ? COLORS.warning : COLORS.danger}`,
                          transition: "all 0.2s ease"
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                            <div style={{
                              width: "36px",
                              height: "36px",
                              borderRadius: "50%",
                              background: attempt.score >= 80 ? `${COLORS.success}20` : attempt.score >= 60 ? `${COLORS.warning}20` : `${COLORS.danger}20`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "0.9rem",
                              fontWeight: "700",
                              color: attempt.score >= 80 ? COLORS.success : attempt.score >= 60 ? COLORS.warning : COLORS.danger
                            }}>
                              {attempts.length - idx}
                            </div>
                            <div>
                              <div style={{ color: COLORS.white, fontWeight: "500" }}>Attempt {attempts.length - idx}</div>
                              <div style={{ color: COLORS.gray, fontSize: "0.85rem" }}>{new Date(attempt.date).toLocaleDateString()}</div>
                            </div>
                          </div>
                          <div style={{
                            fontSize: "1.3rem",
                            fontWeight: "700",
                            color: attempt.score >= 80 ? COLORS.success : attempt.score >= 60 ? COLORS.warning : COLORS.danger
                          }}>
                            {attempt.score}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedTopic(null)}
                    style={{
                      width: "100%",
                      marginTop: "25px",
                      padding: "16px",
                      background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)`,
                      color: COLORS.white,
                      border: "none",
                      borderRadius: "12px",
                      fontSize: "1rem",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      boxShadow: `0 4px 15px rgba(4, 86, 172, 0.4)`
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
                    Close Analysis
                  </button>
                </div>
              </div>
            </div>
          );
        })()
      }

      {/* CSS Animations */}
      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div >
  );
}

export default Dashboard;