import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  registerUser,
  clearError,
  resetRegistration,
} from "../store/slices/authSlice";
import FormInput from "../components/FormInput";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isRegistered } = useSelector((state) => state.auth);

  // Redirect jika sudah login
  useEffect(() => {
    if (isRegistered) {
      navigate("/login");
    }
  }, [isRegistered, navigate]);

  // Clear error saat component mount
  useEffect(() => {
    dispatch(resetRegistration());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return;
    }

    const result = await dispatch(registerUser({ name, email, password }));

    if (registerUser.fulfilled.match(result)) {
      toast.success("Register berhasil!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-primary">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-2">
            <FormInput
              label="Name"
              type="name"
              name="name"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              required={true}
            />
            <FormInput
              label="Email"
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required={true}
            />
            <FormInput
              label="Password"
              type="password"
              name="password"
              placeholder={"Password"}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required={true}
            />
            {error && (
              <div className="alert alert-error">
                <span className="text-sm">{error}</span>
              </div>
            )}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Loading..." : "Register"}
            </button>
            <p className="text-sm text-center">
              Have an account?{" "}
              <Link to="/login" className="text-primary">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
