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
                    padding: "16px 5%",
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
                            gap: "8px",
                            cursor: "pointer",
                            transition: "transform 0.3s ease",
                            flexShrink: 0
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    >
                        {/* Logo Icon */}
                        <div style={{
                            width: "clamp(32px, 5vw, 40px)",
                            height: "clamp(32px, 5vw, 40px)",
                            borderRadius: "10px",
                            background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1.2rem",
                            boxShadow: `0 4px 15px rgba(4, 86, 172, 0.4)`
                        }}>
                            🧠
                        </div>
                        <div className="logo-text-container">
                            <h1 style={{
                                margin: 0,
                                fontSize: "clamp(1.1rem, 4vw, 1.4rem)",
                                fontWeight: "700",
                                background: `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.primaryLight} 100%)`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                letterSpacing: "-0.02em",
                                whiteSpace: "nowrap"
                            }}>
                                NeuroSpark AI
                            </h1>
                            <p className="hide-mobile" style={{
                                margin: 0,
                                fontSize: "0.7rem",
                                color: COLORS.gray,
                                letterSpacing: "0.5px"
                            }}>
                                Adaptive Learning
                            </p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="desktop-nav" style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px"
                    }}>
                        {navItems.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                style={{
                                    padding: "8px 16px",
                                    borderRadius: "10px",
                                    border: "none",
                                    background: isActive(item.path)
                                        ? `linear-gradient(135deg, ${COLORS.primary}40, ${COLORS.primary}20)`
                                        : "transparent",
                                    color: isActive(item.path) ? COLORS.white : COLORS.gray,
                                    fontSize: "0.9rem",
                                    fontWeight: isActive(item.path) ? "600" : "500",
                                    cursor: "pointer",
                                    transition: "all 0.3s ease",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    position: "relative",
                                    overflow: "hidden"
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

                        <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.1)", margin: "0 6px" }} />

                        <button
                            onClick={handleLogout}
                            style={{
                                padding: "8px 16px",
                                background: "rgba(239, 68, 68, 0.1)",
                                color: COLORS.danger,
                                border: `1px solid ${COLORS.danger}30`,
                                borderRadius: "10px",
                                fontSize: "0.85rem",
                                fontWeight: "600",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                display: "flex",
                                alignItems: "center",
                                gap: "6px"
                            }}
                        >
                            Logout
                        </button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        style={{
                            display: "none",
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: COLORS.white,
                            fontSize: "1.2rem",
                            cursor: "pointer",
                            padding: "8px",
                            borderRadius: "10px",
                            width: "40px",
                            height: "40px",
                            display: "none", // Will be shown by media query
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        {mobileMenuOpen ? "✕" : "☰"}
                    </button>
                </div>

                {/* Mobile Navigation Dropdown */}
                {mobileMenuOpen && (
                    <div className="mobile-nav-dropdown" style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        background: "rgba(10, 14, 26, 0.98)",
                        backdropFilter: "blur(20px)",
                        borderBottom: `1px solid rgba(4, 86, 172, 0.3)`,
                        padding: "20px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                        animation: "slideDown 0.3s ease-out"
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
                                    padding: "14px 20px",
                                    background: isActive(item.path) ? `rgba(4, 86, 172, 0.2)` : "rgba(255,255,255,0.03)",
                                    border: `1px solid ${isActive(item.path) ? COLORS.primary : "rgba(255,255,255,0.05)"}`,
                                    color: isActive(item.path) ? COLORS.white : COLORS.gray,
                                    fontSize: "1rem",
                                    textAlign: "left",
                                    cursor: "pointer",
                                    borderRadius: "12px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    transition: "all 0.2s ease"
                                }}
                            >
                                <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                        <button
                            onClick={handleLogout}
                            style={{
                                width: "100%",
                                padding: "14px 20px",
                                background: "rgba(239, 68, 68, 0.1)",
                                border: `1px solid rgba(239, 68, 68, 0.3)`,
                                color: COLORS.danger,
                                fontSize: "1rem",
                                textAlign: "left",
                                cursor: "pointer",
                                borderRadius: "12px",
                                marginTop: "5px",
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                fontWeight: "600"
                            }}
                        >
                            <span style={{ fontSize: "1.2rem" }}>🚪</span>
                            Logout
                        </button>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main style={{
                paddingTop: "80px",
                position: "relative",
                zIndex: 1,
                minHeight: "100vh"
            }}>
                <Outlet />
            </main>

            <style>{`
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 850px) {
                    .desktop-nav {
                        display: none !important;
                    }
                    .mobile-menu-btn {
                        display: flex !important;
                    }
                    header > div {
                        padding: 12px 20px !important;
                    }
                    .hide-mobile {
                        display: none !important;
                    }
                    .logo-text-container h1 {
                        font-size: 1.2rem !important;
                    }
                }

                @media (max-width: 480px) {
                    header > div {
                        padding: 12px 15px !important;
                    }
                }
            `}</style>
        </div>
    );
}

export default Layout;