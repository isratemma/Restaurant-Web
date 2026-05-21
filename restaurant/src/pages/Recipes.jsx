import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { motion } from "framer-motion";
import { FiSearch, FiClock, FiUser, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import allRecipes from "../data/recipes";

const categories = ["All", "Italian", "French", "British", "Seafood", "Japanese", "Breakfast"];

// ─── Featured Slider ────────────────────────────────────────────────────────
const FeaturedSlider = ({ recipes }) => {
  const [current, setCurrent] = useState(0);
  const featured = recipes.slice(0, 5);

  const prev = () => setCurrent((c) => (c === 0 ? featured.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === featured.length - 1 ? 0 : c + 1));

  // Show 3 cards at a time (current-1, current, current+1)
  const getVisible = () => {
    return [-1, 0, 1].map((offset) => {
      const idx = (current + offset + featured.length) % featured.length;
      return { recipe: featured[idx], offset };
    });
  };

  return (
    <div className="mb-16">
      {/* Images row */}
      <div className="relative overflow-hidden">
        <div className="grid grid-cols-3 gap-0 h-64 md:h-80">
          {getVisible().map(({ recipe, offset }) => (
            <div key={recipe.id + offset} className="overflow-hidden relative">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-full object-cover"
              />
              {/* Category badge */}
              <span className="absolute top-3 left-3 bg-[#c8a96e] text-white text-[10px] uppercase tracking-widest px-2 py-1 font-medium">
                {recipe.category}
              </span>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white flex items-center justify-center shadow-md transition-all z-10"
        >
          <FiChevronLeft className="text-[#1a1a1a]" size={18} />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white flex items-center justify-center shadow-md transition-all z-10"
        >
          <FiChevronRight className="text-[#1a1a1a]" size={18} />
        </button>
      </div>

      {/* Text row below images */}
      <div className="grid grid-cols-3 gap-0 border-b border-[#e8e0d0]">
        {getVisible().map(({ recipe, offset }) => (
          <div
            key={recipe.id + offset + "text"}
            className="px-6 py-5 border-r border-[#e8e0d0] last:border-r-0"
          >
            <Link to={`/recipes/${recipe.id}`}>
              <h3 className="font-serif font-bold text-[#1a1a1a] text-base md:text-lg leading-snug mb-2 hover:text-[#c8a96e] transition-colors line-clamp-2">
                {recipe.name}
              </h3>
            </Link>
            <div className="flex items-center gap-3 text-[#aaa] text-xs mb-3">
              <span className="flex items-center gap-1">
                <FiUser size={11} /> Chef Bouffe
              </span>
              <span>·</span>
              <span>10 Comments</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <FiClock size={11} /> {recipe.time}
              </span>
            </div>
            <p className="text-xs text-[#888] leading-relaxed line-clamp-3">
              {recipe.description}
            </p>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-5">
        {featured.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              i === current ? "bg-[#c8a96e] w-5" : "bg-[#ddd]"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// ─── Recipe Grid Card ────────────────────────────────────────────────────────
const RecipeCard = ({ dish, index }) => {
  const [expanded, setExpanded] = useState(false);
  const shortDesc = dish.description.substring(0, 100) + "...";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="group"
    >
      {/* Image with badge — clicking goes to detail page */}
      <Link to={`/recipes/${dish.id}`}>
        <div className="relative overflow-hidden mb-3">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-3 left-3 bg-[#c8a96e] text-white text-[10px] uppercase tracking-widest px-2 py-1 font-medium">
            {dish.category}
          </span>
        </div>
        <h3 className="font-serif font-bold text-[#1a1a1a] text-sm md:text-base leading-snug mb-2 group-hover:text-[#c8a96e] transition-colors line-clamp-2">
          {dish.name}
        </h3>
        <div className="flex items-center gap-2 text-[#aaa] text-xs mb-2">
          <span className="flex items-center gap-1"><FiUser size={10} /> Chef Bouffe</span>
          <span>·</span>
          <span className="flex items-center gap-1"><FiClock size={10} /> {dish.time}</span>
        </div>
      </Link>

      {/* Description with expand toggle — does NOT navigate */}
      <div>
        <p className="text-xs text-[#888] leading-relaxed">
          {expanded ? dish.description : shortDesc}
        </p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[#c8a96e] text-xs font-medium mt-1 hover:text-[#b8955a] transition-colors underline underline-offset-2"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      </div>
    </motion.div>
  );
};

// ─── Main Page ───────────────────────────────────────────────────────────────
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
    <div className="min-h-screen bg-white">
      {/* Page header */}
      <div className="bg-white border-b border-[#e8e0d0] py-14 text-center">
        <p className="text-[#c8a96e] text-xs uppercase tracking-[0.3em] mb-3">Explore</p>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1a1a1a]">All Recipes</h1>
        <div className="w-12 h-0.5 bg-[#c8a96e] mx-auto mt-5" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
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

        {filtered.length === 0 ? (
          <p className="text-center text-[#888] py-20">No recipes found.</p>
        ) : (
          <>
            {/* Featured slider — only show when no search/filter active */}
            {activeCategory === "All" && !query && (
              <FeaturedSlider recipes={filtered} />
            )}

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {filtered.map((dish, i) => (
                <RecipeCard key={dish.id} dish={dish} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Recipes;
