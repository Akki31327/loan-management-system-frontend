import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      setLoading(true);

      const response = await api.post("/login", formData);

      login(response.data.user, response.data.token);

      toast.success("Login successful");

      navigate("/dashboard");
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";

      setErrorMessage(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <ToastContainer />

      <div className="login-card">

        {/* LEFT BRAND SECTION */}
        <div className="login-left">
          <h2>Loan Collection System</h2>
          <p>Secure & fast payment collection dashboard</p>
        </div>

        {/* RIGHT FORM SECTION */}
        <div className="login-right">
          <h3>Welcome Back</h3>
          <p className="sub-text">Please login to your account</p>

          {errorMessage && (
            <div className="alert alert-danger py-2">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* EMAIL */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control input-style"
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-3">
              <label className="form-label">Password</label>

              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control input-style"
                  placeholder="Enter password"
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="btn btn-light border"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button
              className="btn btn-primary w-100 login-btn"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Login"}
            </button>

          </form>
        </div>
      </div>

      {/* STYLE */}
      <style>{`
        .login-wrapper {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #0f172a, #1e293b);
          padding: 20px;
        }

        .login-card {
          display: flex;
          width: 900px;
          max-width: 100%;
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }

        .login-left {
          flex: 1;
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: white;
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .login-left h2 {
          font-size: 28px;
          font-weight: 700;
        }

        .login-left p {
          margin-top: 10px;
          opacity: 0.9;
        }

        .login-right {
          flex: 1;
          padding: 40px;
        }

        .login-right h3 {
          font-weight: 700;
        }

        .sub-text {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 20px;
        }

        .input-style {
          padding: 10px 12px;
          border-radius: 8px;
        }

        .login-btn {
          padding: 10px;
          border-radius: 8px;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}

export default Login;