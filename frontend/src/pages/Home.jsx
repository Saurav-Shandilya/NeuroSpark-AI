import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function HomePage() {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    const COLORS = {
        primary: "#0456AC",
        primaryLight: "#0A7AE8",
        white: "#FCFEFC",
        dark: "#0A0E1A",
        darker: "#050811",
        accent: "#00D4FF",
        gray: "#94A3B8"
    };

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div style={{
            width: "100%",
            minHeight: "100vh",
            margin: 0,
            padding: 0,
            background: COLORS.darker,
            color: COLORS.white,
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            overflowX: "hidden",
            boxSizing: "border-box",
            position: "relative"
        }}>
            {/* Background */}
            <div style={{
                position: "fixed",
                inset: 0,
                width: "100%",
                height: "100%",
                background: `
                    radial-gradient(ellipse at 50% 50%, ${COLORS.primary}12 0%, transparent 60%),
                    radial-gradient(ellipse at 20% 80%, ${COLORS.accent}08 0%, transparent 40%)
                `,
                zIndex: 0
            }} />

            {/* Grid Pattern */}
            <div style={{
                position: "fixed",
                inset: 0,
                width: "100%",
                height: "100%",
                backgroundImage: `
                    linear-gradient(rgba(4, 86, 172, 0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(4, 86, 172, 0.03) 1px, transparent 1px)
                `,
                backgroundSize: "50px 50px",
                maskImage: "radial-gradient(ellipse at 50% 50%, black 30%, transparent 70%)",
                WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 30%, transparent 70%)",
                zIndex: 0
            }} />

            {/* Navigation */}
            <nav className="home-nav">
                <div className="nav-logo" onClick={() => navigate("/")}>
                    <div className="logo-icon">🧠</div>
                    <span className="logo-text">NeuroSpark</span>
                </div>

                <div className="nav-btns">
                    <button className="btn-signin" onClick={() => navigate("/login")}>
                        Sign In
                    </button>
                    <button className="btn-getstarted" onClick={() => navigate("/login")}>
                        Get Started
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero-section">
                {/* Badge */}
                <div className="hero-badge" style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(20px)",
                    transition: "all 0.8s ease 0.2s"
                }}>
                    <span className="badge-dot" />
                    <span className="badge-text">AI-Powered Learning Platform</span>
                </div>

                {/* Main Headline */}
                <h1 className="hero-title" style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(30px)",
                    transition: "all 1s ease 0.4s"
                }}>
                    Master Anything with <br className="mobile-only" />
                    <span className="title-gradient">Intelligent Diagnostics</span>
                </h1>

                {/* Subheadline */}
                <p className="hero-subtitle" style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(30px)",
                    transition: "all 1s ease 0.6s"
                }}>
                    Experience the future of education. Our AI analyzes your knowledge,
                    identifies gaps, and creates personalized learning paths.
                </p>

                {/* CTA Buttons */}
                <div className="cta-group" style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(30px)",
                    transition: "all 1s ease 0.8s"
                }}>
                    <button className="cta-primary" onClick={() => navigate("/login")}>
                        <span>Start Learning Free</span>
                        <span>→</span>
                    </button>

                    <button className="cta-secondary">
                        Watch Demo
                    </button>
                </div>

                {/* Social Proof */}
                <div className="social-proof" style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(30px)",
                    transition: "all 1s ease 1s"
                }}>
                    <div className="social-content">
                        <div className="avatar-group">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className={`avatar avatar-${i}`}>
                                    {["👨‍🎓", "👩‍💻", "🧑‍🔬", "👩‍🏫", "🎓"][i - 1]}
                                </div>
                            ))}
                        </div>
                        <div className="social-text">
                            <div className="social-title">50,000+ Students</div>
                            <div className="social-subtitle">joined this month</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="features-grid">
                    {[
                        { icon: "🎯", title: "AI Diagnostics", desc: "Smart analysis of knowledge gaps" },
                        { icon: "📈", title: "Track Progress", desc: "Visual analytics of your growth" },
                        { icon: "🧠", title: "Adaptive Learning", desc: "Personalized paths that evolve" },
                        { icon: "⚡", title: "Instant Feedback", desc: "Real-time insights and guidance" }
                    ].map((feature, index) => (
                        <div key={index} className="feature-card">
                            <div className="feature-icon">{feature.icon}</div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-desc">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CSS Animations & Global Media Queries */}
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.6; transform: scale(1.3); }
                }

                .mobile-only { display: none; }

                /* Base Styles */
                .home-nav {
                    position: relative;
                    z-index: 100;
                    padding: 20px 40px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    max-width: 1400px;
                    margin: 0 auto;
                    box-sizing: border-box;
                }

                .nav-logo {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                }

                .logo-icon {
                    width: 36px;
                    height: 36px;
                    border-radius: 10px;
                    background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.3rem;
                    box-shadow: 0 4px 20px rgba(4, 86, 172, 0.4);
                }

                .logo-text {
                    font-size: 1.2rem;
                    fontWeight: 700;
                    color: ${COLORS.white};
                }

                .nav-btns {
                    display: flex;
                    gap: 12px;
                }

                .nav-btns button {
                    padding: 10px 20px;
                    border-radius: 8px;
                    font-size: 0.9rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    white-space: nowrap;
                }

                .btn-signin {
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: ${COLORS.white};
                }

                .btn-getstarted {
                    background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%);
                    border: none;
                    color: ${COLORS.white};
                    font-weight: 600 !important;
                    box-shadow: 0 4px 15px rgba(4, 86, 172, 0.4);
                }

                .hero-section {
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 60px 20px 100px;
                    text-align: center;
                    position: relative;
                    z-index: 10;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    box-sizing: border-box;
                }

                .hero-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 16px;
                    background: rgba(4, 86, 172, 0.15);
                    border: 1px solid ${COLORS.primary}40;
                    borderRadius: 50px;
                    margin-bottom: 24px;
                }

                .badge-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: ${COLORS.accent};
                    animation: pulse 2s infinite;
                }

                .badge-text {
                    font-size: 0.85rem;
                    color: ${COLORS.white};
                    font-weight: 500;
                }

                .hero-title {
                    font-size: clamp(2rem, 8vw, 4.5rem);
                    font-weight: 800;
                    line-height: 1.1;
                    margin: 0 0 20px 0;
                    letter-spacing: -0.02em;
                    max-width: 95%;
                    word-wrap: break-word;
                    overflow-wrap: anywhere;
                    color: ${COLORS.white};
                }

                .title-gradient {
                    background: linear-gradient(135deg, ${COLORS.accent} 0%, ${COLORS.primaryLight} 50%, ${COLORS.primary} 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .hero-subtitle {
                    font-size: clamp(0.95rem, 2.5vw, 1.1rem);
                    color: ${COLORS.gray};
                    line-height: 1.6;
                    max-width: 600px;
                    width: 100%;
                    margin: 0 0 32px 0;
                }

                .cta-group {
                    display: flex;
                    gap: 12px;
                    flex-wrap: wrap;
                    justify-content: center;
                    margin-bottom: 40px;
                    width: 100%;
                }

                .cta-group button {
                    padding: 14px 28px;
                    border-radius: 10px;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    transition: all 0.3s ease;
                }

                .cta-primary {
                    background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%);
                    border: none;
                    color: ${COLORS.white};
                    box-shadow: 0 8px 25px rgba(4, 86, 172, 0.4);
                }

                .cta-secondary {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.15);
                    color: ${COLORS.white};
                }

                .social-proof {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 16px;
                    width: 100%;
                }

                .social-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .avatar-group { display: flex; }

                .avatar {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%);
                    border: 2px solid ${COLORS.darker};
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.8rem;
                }

                .avatar-2, .avatar-3, .avatar-4, .avatar-5 { margin-left: -10px; }

                .social-text { text-align: left; }
                .social-title { font-weight: 600; color: ${COLORS.white}; font-size: 0.9rem; }
                .social-subtitle { font-size: 0.75rem; color: ${COLORS.gray}; }

                .features-section {
                    width: 100%;
                    padding: 60px 20px;
                    position: relative;
                    z-index: 10;
                    box-sizing: border-box;
                }

                .features-grid {
                    width: 100%;
                    max-width: 1000px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                    gap: 16px;
                }

                .feature-card {
                    background: rgba(255,255,255,0.02);
                    backdrop-filter: blur(20px);
                    border-radius: 16px;
                    padding: 28px 24px;
                    border: 1px solid rgba(255,255,255,0.08);
                    text-align: center;
                    transition: all 0.3s ease;
                }

                .feature-icon {
                    width: 56px;
                    height: 56px;
                    border-radius: 14px;
                    background: linear-gradient(135deg, ${COLORS.primary}30 0%, ${COLORS.primaryLight}20 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.8rem;
                    margin: 0 auto 16px;
                    border: 1px solid ${COLORS.primary}40;
                }

                .feature-title { font-size: 1.1rem; font-weight: 700; margin: 0 0 8px 0; color: ${COLORS.white}; }
                .feature-desc { color: ${COLORS.gray}; font-size: 0.9rem; line-height: 1.5; margin: 0; }

                /* Media Queries */
                @media (max-width: 1024px) {
                    .hero-title { font-size: 3.5rem; }
                }

                @media (max-width: 768px) {
                    .home-nav { padding: 15px 20px; }
                    .hero-section { padding: 40px 15px 80px; }
                    .features-grid { grid-template-columns: 1fr; }
                    .social-proof { transform: scale(0.9); }
                }

                @media (max-width: 640px) {
                    .mobile-only { display: block; }
                    .home-nav {
                        padding: 12px 15px !important;
                        justify-content: space-between !important;
                        gap: 10px !important;
                    }
                    .nav-logo {
                        gap: 6px !important;
                    }
                    .logo-icon {
                        width: 32px !important;
                        height: 32px !important;
                        font-size: 1.1rem !important;
                    }
                    .logo-text {
                        font-size: 1rem !important;
                    }
                    .nav-btns {
                        gap: 6px !important;
                    }
                    .nav-btns button {
                        padding: 8px 12px !important;
                        font-size: 0.8rem !important;
                    }
                    .hero-title {
                        font-size: clamp(1.5rem, 10vw, 2.2rem) !important;
                        line-height: 1.2 !important;
                        padding: 0 10px !important;
                        margin-bottom: 20px !important;
                    }
                    .hero-subtitle {
                        padding: 0 15px !important;
                        font-size: 0.95rem !important;
                        line-height: 1.5 !important;
                    }
                    .cta-group {
                        flex-direction: column !important;
                        padding: 0 15px !important;
                        gap: 12px !important;
                    }
                    .cta-group button { 
                        width: 100% !important; 
                        padding: 16px !important;
                    }
                }

                @media (max-width: 400px) {
                    .logo-text { display: none !important; }
                    .home-nav { padding: 10px !important; }
                }

                @media (max-width: 320px) {
                    .hero-title { font-size: 1.35rem !important; }
                    .hero-badge { transform: scale(0.85) !important; margin-bottom: 16px !important; }
                    .nav-btns button { 
                        padding: 6px 10px !important;
                        font-size: 0.75rem !important;
                    }
                }
            `}</style>
        </div>
    );
}

export default HomePage;