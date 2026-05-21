import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiUser, FiImage, FiEye, FiEyeOff } from "react-icons/fi";

const Register = () => {
  const { register, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", photoURL: "", password: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6) errs.password = "Minimum 6 characters";
    else if (!/[A-Z]/.test(form.password)) errs.password = "Must include an uppercase letter";
    if (form.password !== form.confirm) errs.confirm = "Passwords do not match";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      await register(form.email, form.password);
      await updateUserProfile(form.name, form.photoURL);
      toast.success("Account created! Welcome to Bouffe.");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const field = (key, label, type, icon, placeholder, extra) => (
    <div>
      <label className="text-xs uppercase tracking-widest text-[#888] block mb-2">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aaa]">{icon}</span>
        <input
          type={type}
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          className="w-full border border-[#e0d5c0] pl-10 pr-4 py-3 text-sm text-[#333] outline-none focus:border-[#c8a96e] transition-colors"
          placeholder={placeholder}
        />
        {extra}
      </div>
      {errors[key] && <p className="text-red-400 text-xs mt-1">{errors[key]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white border border-[#e8e0d0] p-10"
      >
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-serif font-bold text-[#1a1a1a]">Bouffe</Link>
          <p className="text-[#c8a96e] text-xs uppercase tracking-[0.3em] mt-2">Join Us</p>
          <h1 className="text-2xl font-serif font-bold text-[#1a1a1a] mt-2">Create Account</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {field("name", "Full Name", "text", <FiUser />, "Your full name")}
          {field("email", "Email", "email", <FiMail />, "your@email.com")}
          {field("photoURL", "Photo URL (optional)", "url", <FiImage />, "https://...")}

          {/* Password with toggle */}
          <div>
            <label className="text-xs uppercase tracking-widest text-[#888] block mb-2">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aaa]" />
              <input
                type={showPass ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full border border-[#e0d5c0] pl-10 pr-10 py-3 text-sm text-[#333] outline-none focus:border-[#c8a96e] transition-colors"
                placeholder="Min 6 chars, 1 uppercase"
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aaa] hover:text-[#c8a96e]">
                {showPass ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Confirm password */}
          <div>
            <label className="text-xs uppercase tracking-widest text-[#888] block mb-2">Confirm Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aaa]" />
              <input
                type="password"
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                className="w-full border border-[#e0d5c0] pl-10 pr-4 py-3 text-sm text-[#333] outline-none focus:border-[#c8a96e] transition-colors"
                placeholder="Repeat password"
              />
            </div>
            {errors.confirm && <p className="text-red-400 text-xs mt-1">{errors.confirm}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#c8a96e] hover:bg-[#b8955a] disabled:opacity-60 text-white py-3 text-xs uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-2"
          >
            {loading ? <span className="loading loading-spinner loading-sm" /> : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-[#888] mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-[#c8a96e] hover:underline font-medium">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
