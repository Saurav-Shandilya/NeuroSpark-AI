import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body, #root {
    width: 100%;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    background: none;
  }

  .auth-bg {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #b8d0ff 0%, #d4b8f0 50%, #f0b8d4 100%);
    font-family: 'DM Sans', sans-serif;
    padding: 20px;
  }

  .auth-card {
    background: #fff;
    border-radius: 28px;
    padding: 42px 38px;
    width: 100%;
    max-width: 420px;
    box-shadow: 0 24px 64px rgba(80,60,180,0.16), 0 4px 16px rgba(0,0,0,0.06);
    animation: slideUp 0.45s cubic-bezier(0.22,1,0.36,1);
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .auth-title {
    font-family: 'Sora', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: #12122a;
    text-align: center;
    margin-bottom: 6px;
    letter-spacing: -0.4px;
  }

  .auth-subtitle {
    text-align: center;
    font-size: 13.5px;
    color: #9095b8;
    margin-bottom: 26px;
  }

  .tab-row {
    display: flex;
    background: #f1f3fb;
    border-radius: 14px;
    padding: 4px;
    margin-bottom: 28px;
    gap: 4px;
  }

  .tab-btn {
    flex: 1;
    padding: 11px 0;
    border: none;
    border-radius: 11px;
    font-family: 'Sora', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.28s cubic-bezier(0.22,1,0.36,1);
    background: transparent;
    color: #9095b8;
  }

  .tab-btn.active {
    background: #2a5cdb;
    color: #fff;
    box-shadow: 0 4px 16px rgba(42,92,219,0.32);
  }

  .form-group { margin-bottom: 14px; }

  .form-label {
    display: block;
    font-size: 12px;
    font-weight: 500;
    color: #6b6f8e;
    margin-bottom: 6px;
    letter-spacing: 0.3px;
    text-transform: uppercase;
  }

  .input-wrap { position: relative; }

  .form-input {
    width: 100%;
    padding: 13px 16px;
    border: 1.5px solid #e4e7f5;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14.5px;
    color: #12122a;
    background: #fafbff;
    outline: none;
    transition: border-color 0.22s, box-shadow 0.22s, background 0.22s;
  }

  .form-input::placeholder { color: #c0c5de; }

  .form-input:focus {
    border-color: #2a5cdb;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(42,92,219,0.09);
  }

  .eye-btn {
    position: absolute;
    right: 13px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: #c0c5de;
    padding: 0;
    display: flex;
    align-items: center;
    transition: color 0.2s;
  }
  .eye-btn:hover { color: #2a5cdb; }

  .forgot-row { text-align: right; margin-top: 6px; margin-bottom: 20px; }

  .forgot-link {
    font-size: 13px;
    color: #2a5cdb;
    font-weight: 500;
    cursor: pointer;
    background: none;
    border: none;
    font-family: 'DM Sans', sans-serif;
    padding: 0;
  }
  .forgot-link:hover { text-decoration: underline; }

  .submit-btn {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #3a6cf4 0%, #1a3faa 100%);
    color: #fff;
    border: none;
    border-radius: 13px;
    font-family: 'Sora', sans-serif;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.24s ease;
    box-shadow: 0 4px 18px rgba(42,92,219,0.28);
    margin-bottom: 16px;
    margin-top: 6px;
  }

  .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(42,92,219,0.38); }
  .submit-btn:active { transform: translateY(0); }

  .divider {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 16px 0;
    color: #c0c5dc;
    font-size: 12px;
    font-family: 'DM Sans', sans-serif;
  }
  .divider::before, .divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e8eaf4;
  }

  .google-wrap {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  .bottom-text { text-align: center; font-size: 13.5px; color: #7a7fa8; }

  .bottom-link {
    color: #2a5cdb;
    font-weight: 600;
    cursor: pointer;
    background: none;
    border: none;
    font-size: 13.5px;
    font-family: 'DM Sans', sans-serif;
    padding: 0;
  }
  .bottom-link:hover { text-decoration: underline; }
`;

function EyeIcon({ open }) {
  return open ? (
    <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  ) : (
    <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (isSignup) {
        await API.post("/auth/signup", { name, email, password });
        alert("Signup successful. Please login.");
        setIsSignup(false);
      } else {
        const res = await API.post("/auth/login", { email, password });
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await API.post("/auth/google", {
        credential: credentialResponse.credential
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Google Login failed");
    }
  };

  const handleGoogleError = () => {
    alert("Google Login Failed");
  };

  return (
    <>
      <style>{styles}</style>
      <div className="auth-bg">
        <div className="auth-card">

          <h1 className="auth-title">
            {isSignup ? "Create Account" : "Welcome Back 👋"}
          </h1>
          <p className="auth-subtitle">
            {isSignup ? "Join us today — it's free!" : "Sign in to your account to continue"}
          </p>

          <div className="tab-row">
            <button className={`tab-btn${!isSignup ? " active" : ""}`} onClick={() => setIsSignup(false)}>
              Login
            </button>
            <button className={`tab-btn${isSignup ? " active" : ""}`} onClick={() => setIsSignup(true)}>
              Signup
            </button>
          </div>

          {isSignup && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                className="form-input"
                type="text"
                placeholder="John Doe"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              className="form-input"
              type="email"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-wrap">
              <input
                className="form-input"
                type={showPass ? "text" : "password"}
                placeholder="Enter password"
                style={{ paddingRight: 42 }}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="eye-btn" onClick={() => setShowPass(!showPass)}>
                <EyeIcon open={showPass} />
              </button>
            </div>
          </div>

          {!isSignup && (
            <div className="forgot-row">
              <button className="forgot-link">Forgot password?</button>
            </div>
          )}

          <button className="submit-btn" onClick={handleSubmit}>
            {isSignup ? "Create Account" : "Login"}
          </button>

          <div className="divider">or continue with</div>

          <div className="google-wrap">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />
          </div>

          <p className="bottom-text">
            {isSignup ? "Already have an account? " : "Don't have an account? "}
            <button className="bottom-link" onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? "Login now" : "Signup now"}
            </button>
          </p>

        </div>
      </div>
    </>
  );
}

export default Login;