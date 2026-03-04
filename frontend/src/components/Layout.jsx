import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Layout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const COLORS = {
        primary: "#0456AC",
        primaryLight: "#0A7AE8",
        white: "#FCFEFC",
        dark: "#0A0E1A",
        darker: "#050811",
        glass: "rgba(4, 86, 172, 0.15)",
        danger: "#EF4444",
        gray: "#94A3B8"
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    useEffect(() => {
        if (location.pathname !== "/" && location.pathname !== "/login" && !localStorage.getItem("token")) {
            navigate("/login");
        }
    }, [location.pathname, navigate]);

    // Track scroll for header transparency effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Do not render the header on the landing page or login page
    if (location.pathname === "/" || location.pathname === "/login") {
        return <Outlet />;
    }

    const navItems = [
        { path: "/dashboard", label: "Dashboard", icon: "📊" },
        { path: "/profile", label: "Profile", icon: "👤" },
        { path: "/settings", label: "Settings", icon: "⚙️" }
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div style={{
            minHeight: "100vh",
            background: `linear-gradient(180deg, ${COLORS.darker} 0%, ${COLORS.dark} 100%)`,
            color: COLORS.white,
            fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif"
        }}>
            {/* Animated Background */}
            <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `
                    radial-gradient(circle at 10% 20%, ${COLORS.primary}10 0%, transparent 40%),
                    radial-gradient(circle at 90% 80%, ${COLORS.primaryLight}08 0%, transparent 40%)
                `,
                pointerEvents: "none",
                zIndex: 0
            }} />

            {/* Glassmorphism Header */}
            <header style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                background: scrolled
                    ? "rgba(5, 8, 17, 0.85)"
                    : "rgba(5, 8, 17, 0.6)",
                backdropFilter: "blur(20px)",
                borderBottom: `1px solid ${scrolled ? "rgba(4, 86, 172, 0.3)" : "rgba(255,255,255,0.05)"}`,
                transition: "all 0.3s ease",
                boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.3)" : "none"
            }}>
                <div style={{
                    maxWidth: "1400px",
                    margin: "0 auto",
                    padding: "16px 40px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    {/* Logo */}
                    <div
                        onClick={() => navigate("/dashboard")}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            cursor: "pointer",
                            transition: "transform 0.3s ease"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    >
                        {/* Logo Icon */}
                        <div style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "12px",
                            background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1.5rem",
                            boxShadow: `0 4px 15px rgba(4, 86, 172, 0.4)`
                        }}>
                            🧠
                        </div>
                        <div>
                            <h1 style={{
                                margin: 0,
                                fontSize: "1.4rem",
                                fontWeight: "700",
                                background: `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.primaryLight} 100%)`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                letterSpacing: "-0.02em"
                            }}>
                                NeuroSpark AI
                            </h1>
                            <p style={{
                                margin: 0,
                                fontSize: "0.75rem",
                                color: COLORS.gray,
                                letterSpacing: "0.5px"
                            }}>
                                Adaptive Learning Platform
                            </p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                    }}>
                        {navItems.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                style={{
                                    padding: "10px 20px",
                                    borderRadius: "10px",
                                    border: "none",
                                    background: isActive(item.path)
                                        ? `linear-gradient(135deg, ${COLORS.primary}40, ${COLORS.primary}20)`
                                        : "transparent",
                                    color: isActive(item.path) ? COLORS.white : COLORS.gray,
                                    fontSize: "0.95rem",
                                    fontWeight: isActive(item.path) ? "600" : "500",
                                    cursor: "pointer",
                                    transition: "all 0.3s ease",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    position: "relative",
                                    overflow: "hidden"
                                }}
                                onMouseEnter={(e) => {
                                    if (!isActive(item.path)) {
                                        e.target.style.color = COLORS.white;
                                        e.target.style.background = "rgba(255,255,255,0.05)";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive(item.path)) {
                                        e.target.style.color = COLORS.gray;
                                        e.target.style.background = "transparent";
                                    }
                                }}
                            >
                                <span>{item.icon}</span>
                                {item.label}
                                {isActive(item.path) && (
                                    <div style={{
                                        position: "absolute",
                                        bottom: 0,
                                        left: "20%",
                                        right: "20%",
                                        height: "2px",
                                        background: `linear-gradient(90deg, transparent, ${COLORS.primaryLight}, transparent)`,
                                        borderRadius: "2px"
                                    }} />
                                )}
                            </button>
                        ))}

                        {/* Divider */}
                        <div style={{
                            width: "1px",
                            height: "24px",
                            background: "rgba(255,255,255,0.1)",
                            margin: "0 8px"
                        }} />

                        {/* User Profile & Logout */}
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px"
                        }}>
                            <div style={{
                                width: "36px",
                                height: "36px",
                                borderRadius: "50%",
                                background: `linear-gradient(135deg, ${COLORS.primary}30, ${COLORS.primaryLight}20)`,
                                border: `2px solid ${COLORS.primary}50`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                transition: "all 0.3s ease"
                            }}>
                                <span style={{ fontSize: "1rem" }}>👤</span>
                            </div>

                            <button
                                onClick={handleLogout}
                                style={{
                                    padding: "10px 20px",
                                    background: "rgba(239, 68, 68, 0.1)",
                                    color: COLORS.danger,
                                    border: `1px solid ${COLORS.danger}40`,
                                    borderRadius: "10px",
                                    fontSize: "0.9rem",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    transition: "all 0.3s ease",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px"
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = COLORS.danger;
                                    e.target.style.color = COLORS.white;
                                    e.target.style.transform = "translateY(-1px)";
                                    e.target.style.boxShadow = `0 4px 15px rgba(239, 68, 68, 0.4)`;
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = "rgba(239, 68, 68, 0.1)";
                                    e.target.style.color = COLORS.danger;
                                    e.target.style.transform = "translateY(0)";
                                    e.target.style.boxShadow = "none";
                                }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                    <polyline points="16 17 21 12 16 7"></polyline>
                                    <line x1="21" y1="12" x2="9" y2="12"></line>
                                </svg>
                                Logout
                            </button>
                        </div>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        style={{
                            display: "none", // Hidden on desktop
                            background: "transparent",
                            border: "none",
                            color: COLORS.white,
                            fontSize: "1.5rem",
                            cursor: "pointer",
                            padding: "8px"
                        }}
                    >
                        {mobileMenuOpen ? "✕" : "☰"}
                    </button>
                </div>

                {/* Mobile Navigation Dropdown */}
                {mobileMenuOpen && (
                    <div style={{
                        display: "none", // Show on mobile via media query
                        padding: "20px",
                        background: "rgba(5, 8, 17, 0.95)",
                        backdropFilter: "blur(20px)",
                        borderTop: "1px solid rgba(255,255,255,0.1)"
                    }}>
                        {navItems.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => {
                                    navigate(item.path);
                                    setMobileMenuOpen(false);
                                }}
                                style={{
                                    width: "100%",
                                    padding: "15px",
                                    background: isActive(item.path) ? `rgba(4, 86, 172, 0.3)` : "transparent",
                                    border: "none",
                                    color: isActive(item.path) ? COLORS.white : COLORS.gray,
                                    fontSize: "1rem",
                                    textAlign: "left",
                                    cursor: "pointer",
                                    borderRadius: "10px",
                                    marginBottom: "8px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px"
                                }}
                            >
                                <span>{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                        <button
                            onClick={handleLogout}
                            style={{
                                width: "100%",
                                padding: "15px",
                                background: "rgba(239, 68, 68, 0.2)",
                                border: "none",
                                color: COLORS.danger,
                                fontSize: "1rem",
                                textAlign: "left",
                                cursor: "pointer",
                                borderRadius: "10px",
                                marginTop: "10px",
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                fontWeight: "600"
                            }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                <polyline points="16 17 21 12 16 7"></polyline>
                                <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                            Logout
                        </button>
                    </div>
                )}
            </header>

            {/* Main Content with Top Padding for Fixed Header */}
            <main style={{
                paddingTop: "100px",
                position: "relative",
                zIndex: 1,
                minHeight: "100vh"
            }}>
                <Outlet />
            </main>

            {/* Add responsive styles */}
            <style>{`
                @media (max-width: 968px) {
                    header nav {
                        display: none !important;
                    }
                    header button[onClick*="mobileMenuOpen"] {
                        display: block !important;
                    }
                    header div[style*="mobileMenuOpen"] {
                        display: block !important;
                    }
                }
            `}</style>
        </div>
    );
}

export default Layout;