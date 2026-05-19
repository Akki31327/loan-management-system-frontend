import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="app-navbar">

      {/* LEFT BRAND */}
      <div className="nav-left">
        <div className="brand" onClick={() => navigate("/dashboard")}>
          💰 Loan System
        </div>
      </div>

      {/* CENTER MENU */}
      <div className="nav-center">

        <button
          className={`nav-btn ${isActive("/dashboard") ? "active" : ""}`}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>

        {user?.role === "admin" && (
          <button
            className={`nav-btn ${isActive("/loans") ? "active" : ""}`}
            onClick={() => navigate("/loans")}
          >
            Loans
          </button>
        )}

        <button
          className={`nav-btn ${isActive("/collections") ? "active" : ""}`}
          onClick={() => navigate("/collections")}
        >
          Collections
        </button>

                {user?.role === "admin" && (
          <button
            className={`nav-btn ${isActive("/register") ? "active" : ""}`}
            onClick={() => navigate("/register")}
          >
            Add Agent
          </button>
        )}
        

      </div>

      {/* RIGHT USER SECTION */}
      <div className="nav-right">
        <div className="user-box">
          <div className="avatar">
            {user?.name?.charAt(0)}
          </div>

          <div className="user-info">
            <div className="name">{user?.name}</div>
            <div className="role">{user?.role}</div>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* STYLE */}
      <style>{`
        .app-navbar {
          height: 65px;
          background: #0f172a;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          color: white;
          box-shadow: 0 2px 15px rgba(0,0,0,0.2);
        }

        .brand {
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          color: #38bdf8;
        }

        .nav-center {
          display: flex;
          gap: 12px;
        }

        .nav-btn {
          background: transparent;
          border: 1px solid transparent;
          color: #cbd5e1;
          padding: 6px 14px;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.2s;
        }

        .nav-btn:hover {
          background: rgba(255,255,255,0.1);
          color: white;
        }

        .nav-btn.active {
          background: #2563eb;
          color: white;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .user-box {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #2563eb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }

        .user-info .name {
          font-size: 14px;
          font-weight: 600;
        }

        .user-info .role {
          font-size: 12px;
          color: #94a3b8;
        }

        .logout-btn {
          background: #ef4444;
          border: none;
          padding: 6px 12px;
          border-radius: 8px;
          color: white;
          font-size: 13px;
          cursor: pointer;
          transition: 0.2s;
        }

        .logout-btn:hover {
          background: #dc2626;
        }
      `}</style>
    </nav>
  );
}

export default Navbar;