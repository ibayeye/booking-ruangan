import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, clearError } from "../store/slices/authSlice";
import FormInput from "../components/FormInput";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "admin") {
        navigate("/admin/bookings");
      } else {
        navigate("/rooms");
      }
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error("Email atau password salah!");
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warning("Email dan password wajib diisi!");
      return;
    }

    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();

      toast.success("Login berhasil! Selamat datang kembali.");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-primary">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-2">
            <FormInput
              label="Email"
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required={true}
            />
            <FormInput
              label="Password"
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required={true}
            />

            {/* Remove toast dari JSX, pindah ke useEffect */}

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              ) : (
                "Login"
              )}
            </button>
            <p className="text-sm text-center">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-primary">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
