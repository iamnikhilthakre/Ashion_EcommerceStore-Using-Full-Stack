import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  clearError
} from "../redux/authSlice";

export default function Login() {
  const [showRegister, setShowRegister] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoading, error, isAuthenticated, registrationSuccess } = useSelector(
    (state) => state.auth
  );

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!loginData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(loginData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!loginData.password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(loginStart());

    setTimeout(() => {
      if (loginData.email === "test@example.com" && loginData.password === "password") {
        dispatch(loginSuccess({
          email: loginData.email,
          name: "Test User",
          isVerified: true
        }));
      } else if (loginData.email.includes("@") && loginData.password.length >= 6) {
        const code = generateVerificationCode();
        setGeneratedCode(code);
        setShowVerification(true);
        dispatch(loginSuccess({
          email: loginData.email,
          name: loginData.email.split("@")[0],
          isVerified: false
        }));
      } else {
        dispatch(loginFailure("Invalid email or password. Please try again."));
      }
    }, 1000);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!registerData.name) {
      newErrors.name = "Full name is required";
    } else if (registerData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!registerData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(registerData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!registerData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(registerData.password)) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(registerStart());

    setTimeout(() => {
      if (registerData.email.includes("@")) {
        const code = generateVerificationCode();
        setGeneratedCode(code);
        setShowVerification(true);
        dispatch(registerSuccess());
      } else {
        dispatch(registerFailure("Registration failed. Please try again."));
      }
    }, 1000);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    if (verificationCode === generatedCode) {
      dispatch(loginSuccess({
        email: registerData.email || loginData.email,
        name: registerData.name || loginData.email.split("@")[0],
        isVerified: true
      }));
      navigate(from, { replace: true });
    } else {
      setErrors({ ...errors, verification: "Invalid verification code. Please try again." });
    }
  };

  const resendCode = () => {
    const code = generateVerificationCode();
    setGeneratedCode(code);
    setErrors({ ...errors, verification: `New code sent: ${code}` });
  };

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f8f6f3",
      padding: "40px"
    },
    card: {
      width: "100%",
      maxWidth: "1200px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      backgroundColor: "#fff",
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
    },
    left: {
      backgroundColor: "#f1dfd7",
      padding: "60px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    },
    right: {
      padding: "60px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    },
    input: {
      width: "100%",
      padding: "14px",
      marginTop: "8px",
      marginBottom: "6px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      fontSize: "14px"
    },
    inputError: {
      borderColor: "#dc3545"
    },
    errorText: {
      color: "#dc3545",
      fontSize: "12px",
      marginBottom: "16px",
      marginTop: "0"
    },
    button: {
      width: "100%",
      padding: "14px",
      backgroundColor: "#000",
      color: "#fff",
      border: "none",
      borderRadius: "10px",
      fontSize: "18px",
      cursor: "pointer",
      marginTop: "10px"
    },
    buttonDisabled: {
      backgroundColor: "#ccc",
      cursor: "not-allowed"
    },
    link: {
      color: "red",
      cursor: "pointer",
      fontWeight: "bold"
    },
    label: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#333",
      marginBottom: "4px"
    },
    verificationBox: {
      textAlign: "center",
      padding: "20px"
    },
    codeInput: {
      width: "100%",
      maxWidth: "280px",
      height: "55px",
      fontSize: "28px",
      textAlign: "center",
      border: "2px solid #eee",
      borderRadius: "12px",
      margin: "0 auto 20px",
      display: "block",
      letterSpacing: "8px",
      fontWeight: "700",
      transition: "border-color 0.3s ease"
    },
    verificationIcon: {
      width: "80px",
      height: "80px",
      backgroundColor: "#fdeced",
      color: "#ca1515",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "32px",
      margin: "0 auto 24px"
    }
  };

  if (showVerification) {
    return (
      <div style={styles.container}>
        <div style={{ ...styles.card, maxWidth: "550px", gridTemplateColumns: "1fr" }}>
          <div style={styles.right} className="w-100">
            <div style={styles.verificationBox}>
              <div style={styles.verificationIcon}>
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3 className="fw-bold mb-2">Security Verification</h3>
              <p className="text-muted mb-4">
                Enter the 6-digit code sent to <br />
                <strong>{registerData.email || loginData.email}</strong>
              </p>
              
              <div className="bg-light p-3 rounded-3 mb-4 border border-danger border-opacity-10">
                <p className="small text-danger mb-0 fw-bold">
                  <i className="fas fa-info-circle me-2"></i>
                  Demo Code: <span className="fs-5 ms-1" style={{letterSpacing: "2px"}}>{generatedCode}</span>
                </p>
              </div>

              <form onSubmit={handleVerifyCode}>
                <input
                  type="text"
                  maxLength="6"
                  value={verificationCode}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, '');
                    setVerificationCode(val);
                  }}
                  placeholder="000000"
                  style={{
                    ...styles.codeInput,
                    borderColor: errors.verification ? "#dc3545" : "#eee"
                  }}
                />
                {errors.verification && (
                  <p className="text-danger small mb-4 fw-bold">
                    <i className="fas fa-exclamation-circle me-1"></i>
                    {errors.verification}
                  </p>
                )}
                <button 
                  type="submit" 
                  style={{
                    ...styles.button,
                    height: "55px",
                    fontSize: "16px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "1px"
                  }}
                >
                  Verify & Continue
                </button>
              </form>
              
              <div className="mt-4 pt-2">
                <p className="text-muted small mb-0">
                  Didn't receive the code? 
                  <button
                    className="btn btn-link text-danger fw-bold p-0 ms-2 text-decoration-none small"
                    onClick={resendCode}
                  >
                    Resend New Code
                  </button>
                </p>
              </div>
              
              <button
                className="btn btn-link text-muted mt-4 text-decoration-none small"
                onClick={() => {
                  setShowVerification(false);
                  setVerificationCode("");
                  setErrors({});
                }}
              >
                <i className="fas fa-arrow-left me-2"></i>
                Back to {showRegister ? "Registration" : "Login"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.left}>
          <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>Ashion</h1>
          <h2 style={{ fontSize: "42px", marginBottom: "20px" }}>
            {showRegister ? "Join Us" : "Welcome Back"}
          </h2>
          <p style={{ fontSize: "20px", color: "#555" }}>
            {showRegister
              ? "Create an account to enjoy personalized shopping and exclusive offers."
              : "Login to continue shopping the latest fashion trends."}
          </p>
        </div>

        <div style={styles.right}>
          <h2 className="mb-4">{showRegister ? "Create Account" : "Login"}</h2>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {showRegister ? (
            <>
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label style={styles.label}>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={registerData.name}
                    onChange={handleRegisterChange}
                    style={{
                      ...styles.input,
                      ...(errors.name ? styles.inputError : {})
                    }}
                  />
                  {errors.name && (
                    <p style={styles.errorText}>{errors.name}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label style={styles.label}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    style={{
                      ...styles.input,
                      ...(errors.email ? styles.inputError : {})
                    }}
                  />
                  {errors.email && (
                    <p style={styles.errorText}>{errors.email}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label style={styles.label}>Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Create password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    style={{
                      ...styles.input,
                      ...(errors.password ? styles.inputError : {})
                    }}
                  />
                  {errors.password && (
                    <p style={styles.errorText}>{errors.password}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label style={styles.label}>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    style={{
                      ...styles.input,
                      ...(errors.confirmPassword ? styles.inputError : {})
                    }}
                  />
                  {errors.confirmPassword && (
                    <p style={styles.errorText}>{errors.confirmPassword}</p>
                  )}
                </div>

                <button
                  type="submit"
                  style={{
                    ...styles.button,
                    ...(isLoading ? styles.buttonDisabled : {})
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Register"}
                </button>

                <p style={{ marginTop: "20px", textAlign: "center" }}>
                  Already have an account?{" "}
                  <span style={styles.link} onClick={() => {
                    setShowRegister(false);
                    setErrors({});
                    dispatch(clearError());
                  }}>
                    Login
                  </span>
                </p>
              </form>
            </>
          ) : (
            <>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label style={styles.label}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    style={{
                      ...styles.input,
                      ...(errors.email ? styles.inputError : {})
                    }}
                  />
                  {errors.email && (
                    <p style={styles.errorText}>{errors.email}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label style={styles.label}>Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    style={{
                      ...styles.input,
                      ...(errors.password ? styles.inputError : {})
                    }}
                  />
                  {errors.password && (
                    <p style={styles.errorText}>{errors.password}</p>
                  )}
                </div>

                <button
                  type="submit"
                  style={{
                    ...styles.button,
                    ...(isLoading ? styles.buttonDisabled : {})
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>

                <p style={{ marginTop: "20px", textAlign: "center" }}>
                  Don't have an account?{" "}
                  <span style={styles.link} onClick={() => {
                    setShowRegister(true);
                    setErrors({});
                    dispatch(clearError());
                  }}>
                    Register
                  </span>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}