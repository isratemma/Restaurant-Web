import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { FiChevronDown } from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/");
    } catch {
      toast.error("Failed to logout");
    }
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium tracking-widest uppercase transition-colors duration-200 ${
      isActive ? "text-[#c8a96e]" : "text-[#2c2c2c] hover:text-[#c8a96e]"
    }`;

  return (
    <nav className="bg-[#faf9f6] border-b border-[#e8e0d0] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu button */}
          <button
            className="lg:hidden text-[#2c2c2c]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiX size={24} /> : <HiOutlineMenuAlt3 size={24} />}
          </button>

          {/* Left nav links */}
          <div className="hidden lg:flex items-center gap-8">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/recipes" className={navLinkClass}>Recipes</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
          </div>

          {/* Logo - centered */}
          <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2 text-3xl font-bold tracking-tight text-[#2c2c2c] font-serif"
          >
            Bouffe
          </Link>

          {/* Right nav links */}
          <div className="hidden lg:flex items-center gap-8">
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
            {user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="flex items-center gap-2 cursor-pointer">
                  <img
                    src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || "User"}&background=c8a96e&color=fff`}
                    alt="profile"
                    className="w-9 h-9 rounded-full object-cover border-2 border-[#c8a96e]"
                  />
                  <FiChevronDown className="text-[#2c2c2c]" />
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow-lg bg-white rounded-box w-48 mt-2 border border-[#e8e0d0]"
                >
                  <li className="px-3 py-2 text-xs text-gray-400 font-medium uppercase tracking-wider">
                    {user.displayName || "User"}
                  </li>
                  <li><Link to="/dashboard" className="text-sm text-[#2c2c2c] hover:text-[#c8a96e]">Dashboard</Link></li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-sm text-red-500 hover:text-red-600 text-left w-full px-4 py-2"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn btn-sm bg-[#c8a96e] hover:bg-[#b8955a] text-white border-none rounded-none px-6 tracking-widest text-xs uppercase"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile right side */}
          <div className="lg:hidden flex items-center gap-3">
            {user ? (
              <img
                src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || "User"}&background=c8a96e&color=fff`}
                alt="profile"
                className="w-8 h-8 rounded-full object-cover border-2 border-[#c8a96e]"
              />
            ) : (
              <Link to="/login" className="text-xs uppercase tracking-widest text-[#c8a96e] font-medium">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#faf9f6] border-t border-[#e8e0d0] px-6 py-4 flex flex-col gap-4">
          {["/", "/recipes", "/about", "/contact"].map((path, i) => (
            <NavLink
              key={i}
              to={path}
              className={navLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              {path === "/" ? "Home" : path.replace("/", "").charAt(0).toUpperCase() + path.slice(2)}
            </NavLink>
          ))}
          {user && (
            <>
              <NavLink to="/dashboard" className={navLinkClass} onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
              <button onClick={handleLogout} className="text-sm text-red-500 text-left uppercase tracking-widest">Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
