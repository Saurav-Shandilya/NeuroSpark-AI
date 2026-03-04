import React from 'react';

const COLORS = {
    primary: "#0456AC",
    primaryLight: "#0A7AE8",
    white: "#FCFEFC",
    dark: "#0A0E1A",
    gray: "#94A3B8",
    danger: "#EF4444",
};

function Profile() {
    return (
        <div style={{
            padding: "40px",
            color: COLORS.white,
            width: "100%",
            boxSizing: "border-box",
            maxWidth: "1400px",
            margin: "0 auto"
        }}>
            <h1 style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                marginBottom: "30px",
                background: `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.primaryLight} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
            }}>Your Profile</h1>

            <div style={{
                background: "rgba(255,255,255,0.03)",
                padding: "40px",
                borderRadius: "24px",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(20px)",
                display: "flex",
                flexDirection: "column",
                gap: "30px"
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "30px", flexWrap: "wrap" }}>
                    <div style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${COLORS.primary}40, ${COLORS.primaryLight}20)`,
                        border: `2px solid ${COLORS.primary}80`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "4rem",
                        boxShadow: `0 10px 30px rgba(4, 86, 172, 0.3)`
                    }}>
                        👤
                    </div>
                    <div>
                        <h2 style={{ margin: "0 0 10px 0", fontSize: "2rem", color: COLORS.white }}>Student User</h2>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", color: COLORS.gray, marginBottom: "15px" }}>
                            <span>✉️ student@neurospark.ai</span>
                            <span>•</span>
                            <span>🎓 Pro Learner</span>
                        </div>
                        <button style={{
                            padding: "10px 24px",
                            background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)`,
                            border: "none",
                            borderRadius: "12px",
                            color: COLORS.white,
                            fontSize: "1rem",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            boxShadow: `0 4px 15px rgba(4, 86, 172, 0.4)`
                        }}
                            onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; }}
                            onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; }}
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>

                <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", width: "100%" }} />

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
                    {[
                        { label: "Learning Streak", value: "12 Days", icon: "🔥" },
                        { label: "Total Points", value: "2,450 XP", icon: "⭐" },
                        { label: "Topics Mastered", value: "8 Subjects", icon: "📚" }
                    ].map((stat, i) => (
                        <div key={i} style={{
                            background: "rgba(255,255,255,0.03)",
                            padding: "20px",
                            borderRadius: "16px",
                            border: "1px solid rgba(255,255,255,0.05)",
                            display: "flex",
                            alignItems: "center",
                            gap: "15px"
                        }}>
                            <div style={{ fontSize: "2rem" }}>{stat.icon}</div>
                            <div>
                                <div style={{ fontSize: "0.9rem", color: COLORS.gray, marginBottom: "4px" }}>{stat.label}</div>
                                <div style={{ fontSize: "1.4rem", fontWeight: "700", color: COLORS.white }}>{stat.value}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Profile;
