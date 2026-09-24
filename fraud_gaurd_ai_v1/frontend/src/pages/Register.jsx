import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Account created successfully!");
    navigate("/Login");
  };

  return (
     <div className="min-h-screen flex items-center justify-end pr-40 relative overflow-hidden">

      <form
        onSubmit={handleSubmit}
        className="panel p-7 w-full max-w-md flex flex-col gap-4"
      >

        {/* Heading */}
        <div className="text-center mb-2">
          <p className="eyebrow mb-1">
            Analyst console
          </p>

          <h1 className="font-display text-xl font-semibold">
            Create Account
          </h1>

          <p className="text-sm text-text-muted mt-1">
            Create your FraudGuard account
          </p>
        </div>

        {/* Name */}
        <div>
          <label className="text-sm text-text-muted">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="input-field mt-1"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm text-text-muted">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="input-field mt-1"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-sm text-text-muted">
            Password
          </label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            className="input-field mt-1"
            required
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="text-sm text-text-muted">
            Confirm Password
          </label>

          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            className="input-field mt-1"
            required
          />
        </div>

        {/* Create Account Button */}
        <button
          type="submit"
          className="btn-primary w-full mt-2"
        >
          Create Account
        </button>

        {/* Login Link */}
        <p className="text-center text-sm text-text-muted">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-signal hover:underline"
          >
            Sign in
          </button>
        </p>

      </form>
    </div>
  );
}

export default Register;