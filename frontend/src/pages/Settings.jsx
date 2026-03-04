import React, { useState } from 'react';

const COLORS = {
    primary: "#0456AC",
    primaryLight: "#0A7AE8",
    white: "#FCFEFC",
    dark: "#0A0E1A",
    gray: "#94A3B8",
    success: "#10B981",
    danger: "#EF4444",
};

function Settings() {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(true);

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
            }}>Settings</h1>

            <div style={{
                background: "rgba(255,255,255,0.03)",
                borderRadius: "24px",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(20px)",
                overflow: "hidden"
            }}>
                <div style={{ padding: "30px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                    <h3 style={{ margin: "0 0 20px 0", fontSize: "1.3rem", color: COLORS.white }}>Preferences</h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                                <h4 style={{ margin: "0 0 5px 0", color: COLORS.white }}>Email Notifications</h4>
                                <p style={{ margin: 0, color: COLORS.gray, fontSize: "0.9rem" }}>Receive weekly progress reports and alerts</p>
                            </div>
                            <div
                                onClick={() => setNotifications(!notifications)}
                                style={{
                                    width: "50px",
                                    height: "26px",
                                    background: notifications ? COLORS.primary : "rgba(255,255,255,0.2)",
                                    borderRadius: "13px",
                                    position: "relative",
                                    cursor: "pointer",
                                    transition: "all 0.3s ease"
                                }}
                            >
                                <div style={{
                                    width: "20px",
                                    height: "20px",
                                    background: COLORS.white,
                                    borderRadius: "50%",
                                    position: "absolute",
                                    top: "3px",
                                    left: notifications ? "27px" : "3px",
                                    transition: "all 0.3s ease",
                                    boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
                                }} />
                            </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                                <h4 style={{ margin: "0 0 5px 0", color: COLORS.white }}>Dark Theme</h4>
                                <p style={{ margin: 0, color: COLORS.gray, fontSize: "0.9rem" }}>Use dark mode across the application</p>
                            </div>
                            <div
                                onClick={() => setDarkMode(!darkMode)}
                                style={{
                                    width: "50px",
                                    height: "26px",
                                    background: darkMode ? COLORS.primary : "rgba(255,255,255,0.2)",
                                    borderRadius: "13px",
                                    position: "relative",
                                    cursor: "pointer",
                                    transition: "all 0.3s ease"
                                }}
                            >
                                <div style={{
                                    width: "20px",
                                    height: "20px",
                                    background: COLORS.white,
                                    borderRadius: "50%",
                                    position: "absolute",
                                    top: "3px",
                                    left: darkMode ? "27px" : "3px",
                                    transition: "all 0.3s ease",
                                    boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
                                }} />
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ padding: "30px" }}>
                    <h3 style={{ margin: "0 0 20px 0", fontSize: "1.3rem", color: COLORS.danger }}>Danger Zone</h3>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(239, 68, 68, 0.05)", padding: "20px", borderRadius: "12px", border: `1px solid ${COLORS.danger}30` }}>
                        <div>
                            <h4 style={{ margin: "0 0 5px 0", color: COLORS.white }}>Delete Account</h4>
                            <p style={{ margin: 0, color: COLORS.gray, fontSize: "0.9rem" }}>Permanently remove your account and all data</p>
                        </div>
                        <button style={{
                            padding: "10px 20px",
                            background: "rgba(239, 68, 68, 0.1)",
                            color: COLORS.danger,
                            border: `1px solid ${COLORS.danger}50`,
                            borderRadius: "10px",
                            cursor: "pointer",
                            fontWeight: "600",
                            transition: "all 0.2s ease"
                        }}
                            onMouseEnter={(e) => { e.target.style.background = COLORS.danger; e.target.style.color = COLORS.white; }}
                            onMouseLeave={(e) => { e.target.style.background = "rgba(239, 68, 68, 0.1)"; e.target.style.color = COLORS.danger; }}
                        >
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
