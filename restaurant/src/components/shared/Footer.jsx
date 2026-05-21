import { Link } from "react-router";
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterestP } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-[#a0a0a0]">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-serif font-bold text-white mb-4">Bouffe</h2>
          <p className="text-sm leading-relaxed">
            Discover the art of fine dining. Explore recipes, flavors, and culinary stories from around the world.
          </p>
          <div className="flex gap-4 mt-6">
            {[FaFacebookF, FaInstagram, FaTwitter, FaPinterestP].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full border border-[#333] flex items-center justify-center hover:border-[#c8a96e] hover:text-[#c8a96e] transition-colors"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-xs uppercase tracking-widest font-semibold mb-5">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            {[["Home", "/"], ["Recipes", "/recipes"], ["About", "/about"], ["Contact", "/contact"]].map(([label, path]) => (
              <li key={label}>
                <Link to={path} className="hover:text-[#c8a96e] transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white text-xs uppercase tracking-widest font-semibold mb-5">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li>123 Culinary Street, Food City</li>
            <li>+1 (555) 123-4567</li>
            <li>hello@bouffe.com</li>
            <li>Mon–Sat: 10am – 10pm</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white text-xs uppercase tracking-widest font-semibold mb-5">Newsletter</h3>
          <p className="text-sm mb-4">Subscribe to get the latest recipes and updates.</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 bg-[#2a2a2a] text-white text-sm px-4 py-2 outline-none border border-[#333] focus:border-[#c8a96e]"
            />
            <button className="bg-[#c8a96e] hover:bg-[#b8955a] text-white px-4 py-2 text-xs uppercase tracking-widest transition-colors">
              Go
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-[#2a2a2a] py-6 text-center text-xs text-[#555]">
        © {new Date().getFullYear()} Bouffe. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
