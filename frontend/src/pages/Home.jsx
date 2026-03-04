import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                backgroundColor: "#121212",
                color: "white",
                textAlign: "center",
                padding: "0 20px",
            }}
        >
            <h1
                style={{
                    fontSize: "4rem",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    background: "linear-gradient(90deg, #4f46e5, #0ea5e9)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
            >
                NeuroSpark AI
            </h1>
            <p style={{ fontSize: "1.2rem", color: "#ccc", maxWidth: "600px", marginBottom: "40px" }}>
                Your personal AI-powered learning platform. Take diagnostic tests, explore weak concepts, and master any topic with dynamically generated practice exams tailored specifically to your progress.
            </p>

            <div style={{ display: "flex", gap: "20px" }}>
                <button
                    onClick={() => navigate("/login")}
                    style={{
                        padding: "15px 30px",
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        backgroundColor: "#4f46e5",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        boxShadow: "0 4px 14px 0 rgba(79, 70, 229, 0.39)",
                        transition: "all 0.2s ease-in-out",
                    }}
                    onMouseOver={(e) => (e.target.style.transform = "translateY(-2px)")}
                    onMouseOut={(e) => (e.target.style.transform = "translateY(0)")}
                >
                    Get Started / Login
                </button>
            </div>
        </div>
    );
}

export default Home;
