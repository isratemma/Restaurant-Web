import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { GiKnifeFork } from "react-icons/gi";

const Hero = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/recipes?search=${query}`);
  };

  return (
    <section className="relative min-h-[90vh] bg-[#faf9f6] flex items-center justify-center overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[#f0e6d0] opacity-60 blur-2xl" />
      <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-[#e8d5b0] opacity-40 blur-3xl" />

      {/* Floating food illustrations (emoji-based for now) */}
      <motion.div
        className="absolute top-16 left-8 text-6xl opacity-70 hidden md:block"
        animate={{ y: [0, -15, 0], rotate: [-5, 5, -5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >🥐</motion.div>
      <motion.div
        className="absolute top-24 right-12 text-5xl opacity-70 hidden md:block"
        animate={{ y: [0, 12, 0], rotate: [5, -5, 5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >🍋</motion.div>
      <motion.div
        className="absolute bottom-24 left-16 text-5xl opacity-60 hidden md:block"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >🍪</motion.div>
      <motion.div
        className="absolute bottom-16 right-20 text-6xl opacity-60 hidden md:block"
        animate={{ y: [0, 10, 0], rotate: [-3, 3, -3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >🥚</motion.div>
      <motion.div
        className="absolute top-1/2 left-4 text-4xl opacity-50 hidden lg:block"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >🌿</motion.div>
      <motion.div
        className="absolute top-1/3 right-6 text-4xl opacity-50 hidden lg:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >🍓</motion.div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          className="text-[#c8a96e] text-xs uppercase tracking-[0.3em] font-medium mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Welcome to Bouffe
        </motion.p>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-[#1a1a1a] leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Cooking makes
          <br />
          <span className="text-[#c8a96e]">good</span> of you.
        </motion.h1>

        <motion.p
          className="text-[#666] text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Discover an extensive collection of recipes from around the world. Unleash your culinary creativity with our easy-to-use recipe search tool at Bouffe. Get inspired today!
        </motion.p>

        {/* Search bar */}
        <motion.form
          onSubmit={handleSearch}
          className="flex items-center max-w-xl mx-auto bg-white border border-[#e0d5c0] shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <GiKnifeFork className="ml-4 text-[#c8a96e] text-xl flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find what do you want to cook today"
            className="flex-1 px-4 py-4 text-sm text-[#333] bg-transparent outline-none placeholder-[#aaa]"
          />
          <button
            type="submit"
            className="bg-[#c8a96e] hover:bg-[#b8955a] text-white px-6 py-4 transition-colors"
          >
            <FiSearch size={18} />
          </button>
        </motion.form>

        <motion.p
          className="text-xs text-[#aaa] mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Please write the recipe you want to search and press enter
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
