import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email address";
    if (!form.password) errs.password = "Password is required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white border border-[#e8e0d0] p-10"
      >
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-serif font-bold text-[#1a1a1a]">Bouffe</Link>
          <p className="text-[#c8a96e] text-xs uppercase tracking-[0.3em] mt-2">Welcome Back</p>
          <h1 className="text-2xl font-serif font-bold text-[#1a1a1a] mt-2">Sign In</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-xs uppercase tracking-widest text-[#888] block mb-2">Email</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aaa]" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-[#e0d5c0] pl-10 pr-4 py-3 text-sm text-[#333] outline-none focus:border-[#c8a96e] transition-colors"
                placeholder="your@email.com"
              />
            </div>
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="text-xs uppercase tracking-widest text-[#888] block mb-2">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aaa]" />
              <input
                type={showPass ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full border border-[#e0d5c0] pl-10 pr-10 py-3 text-sm text-[#333] outline-none focus:border-[#c8a96e] transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aaa] hover:text-[#c8a96e]"
              >
                {showPass ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#c8a96e] hover:bg-[#b8955a] disabled:opacity-60 text-white py-3 text-xs uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-2"
          >
            {loading ? <span className="loading loading-spinner loading-sm" /> : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-[#888] mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#c8a96e] hover:underline font-medium">Register</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
