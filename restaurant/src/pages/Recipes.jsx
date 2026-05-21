import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiClock, FiStar, FiChevronDown, FiChevronUp } from "react-icons/fi";
import allRecipes from "../data/recipes";

const categories = ["All", "Italian", "French", "British", "Seafood", "Japanese", "Breakfast"];

// Individual card with expandable description
const RecipeCard = ({ dish, index }) => {
  const [expanded, setExpanded] = useState(false);

  // Short preview — first sentence only
  const shortDesc = dish.description.split(".")[0] + ".";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="group bg-white border border-[#f0e8d8] hover:border-[#c8a96e] transition-colors duration-300 flex flex-col"
    >
      {/* Image — clicking navigates to detail page */}
      <Link to={`/recipes/${dish.id}`} className="block overflow-hidden">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <p className="text-[#c8a96e] text-xs uppercase tracking-widest mb-1">{dish.category}</p>

        {/* Title — also navigates */}
        <Link to={`/recipes/${dish.id}`}>
          <h3 className="text-base font-serif font-bold text-[#1a1a1a] mb-2 hover:text-[#c8a96e] transition-colors">
            {dish.name}
          </h3>
        </Link>

        {/* Description — collapsed by default, expands on click */}
        <div className="mb-3">
          <AnimatePresence initial={false}>
            {expanded ? (
              <motion.p
                key="full"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="text-xs text-[#666] leading-relaxed"
              >
                {dish.description}
              </motion.p>
            ) : (
              <motion.p
                key="short"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs text-[#888] leading-relaxed"
              >
                {shortDesc}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-[#c8a96e] text-xs font-medium mt-2 hover:text-[#b8955a] transition-colors"
          >
            {expanded ? (
              <><FiChevronUp size={13} /> Show less</>
            ) : (
              <><FiChevronDown size={13} /> Read more</>
            )}
          </button>
        </div>

        {/* Meta + View Recipe */}
        <div className="mt-auto pt-3 border-t border-[#f0e8d8] flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-[#888]">
            <span className="flex items-center gap-1">
              <FiClock className="text-[#c8a96e]" /> {dish.time}
            </span>
            <span className="flex items-center gap-1">
              <FiStar className="text-[#c8a96e]" /> {dish.rating}
            </span>
          </div>
          <Link
            to={`/recipes/${dish.id}`}
            className="text-xs uppercase tracking-widest text-[#c8a96e] hover:text-[#b8955a] font-medium transition-colors"
          >
            View →
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const Recipes = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [query, setQuery] = useState(initialSearch);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = allRecipes.filter((r) => {
    const matchesSearch = r.name.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = activeCategory === "All" || r.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      {/* Page header */}
      <div className="bg-white border-b border-[#e8e0d0] py-16 text-center">
        <p className="text-[#c8a96e] text-xs uppercase tracking-[0.3em] mb-3">Explore</p>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1a1a1a]">All Recipes</h1>
        <div className="w-12 h-0.5 bg-[#c8a96e] mx-auto mt-5" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Search */}
        <div className="flex items-center bg-white border border-[#e0d5c0] max-w-lg mx-auto mb-8 shadow-sm">
          <FiSearch className="ml-4 text-[#c8a96e]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search recipes..."
            className="flex-1 px-4 py-3 text-sm outline-none bg-transparent text-[#333] placeholder-[#aaa]"
          />
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-xs uppercase tracking-widest border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#c8a96e] text-white border-[#c8a96e]"
                  : "border-[#ddd] text-[#666] hover:border-[#c8a96e] hover:text-[#c8a96e]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="text-center text-[#888] py-20">No recipes found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filtered.map((dish, i) => (
              <RecipeCard key={dish.id} dish={dish} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;
