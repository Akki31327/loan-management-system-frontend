import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import { toast, ToastContainer } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    password_confirmation: "",
    role: "field_agent",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    if (!formData.name) return "Name is required";
    if (!formData.email) return "Email is required";
    if (!formData.mobile) return "Mobile is required";
    if (formData.mobile.length !== 10) return "Mobile must be 10 digits";
    if (!formData.password) return "Password is required";
    if (formData.password.length < 6) return "Password must be at least 6 chars";
    if (formData.password !== formData.password_confirmation)
      return "Passwords do not match";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }

    try {
      setLoading(true);

      await api.post("/register", formData);

      toast.success("Agent registered successfully");

      setFormData({
        name: "",
        email: "",
        mobile: "",
        password: "",
        password_confirmation: "",
        role: "field_agent",
      });

      navigate("/loans"); // or dashboard
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />

      <div className="container mt-4">

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Register New Agent</h2>
        </div>

        {/* CARD */}
        <div className="card shadow">
          <div className="card-body">

            <form onSubmit={handleSubmit}>

              <div className="row">

                {/* NAME */}
                <div className="col-md-6 mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                {/* EMAIL */}
                <div className="col-md-6 mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                {/* MOBILE */}
                <div className="col-md-6 mb-3">
                  <label>Mobile</label>
                  <input
                    type="number"
                    name="mobile"
                    className="form-control"
                    value={formData.mobile}
                    onChange={handleChange}
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 10))
                    }
                  />
                </div>

                {/* ROLE */}
                <div className="col-md-6 mb-3">
                  <label>Role</label>
                  <select
                    name="role"
                    className="form-select"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="field_agent">Field Agent</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                {/* PASSWORD */}
                <div className="col-md-6 mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="col-md-6 mb-3">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="password_confirmation"
                    className="form-control"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                  />
                </div>

              </div>

              {/* BUTTONS */}
              <div className="d-flex justify-content-end gap-2 mt-3">

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate("/loans")}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Agent"}
                </button>

              </div>

            </form>

          </div>
        </div>

      </div>
    </>
  );
}

export default Register;