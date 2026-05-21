import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { motion } from "framer-motion";
import { FiSearch, FiClock, FiStar } from "react-icons/fi";

const allRecipes = [
  { id: 1, name: "Truffle Pasta", category: "Italian", time: "30 min", rating: 4.9, image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80", description: "Rich black truffle pasta with parmesan." },
  { id: 2, name: "Beef Wellington", category: "British", time: "90 min", rating: 4.8, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80", description: "Classic beef tenderloin in puff pastry." },
  { id: 3, name: "Crème Brûlée", category: "French", time: "45 min", rating: 4.9, image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400&q=80", description: "Silky vanilla custard with caramelized sugar." },
  { id: 4, name: "Lobster Bisque", category: "Seafood", time: "60 min", rating: 4.7, image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80", description: "Velvety bisque with fresh lobster." },
  { id: 5, name: "Avocado Toast", category: "Breakfast", time: "10 min", rating: 4.5, image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=400&q=80", description: "Creamy avocado on sourdough toast." },
  { id: 6, name: "Sushi Platter", category: "Japanese", time: "50 min", rating: 4.8, image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&q=80", description: "Fresh sushi rolls and nigiri selection." },
  { id: 7, name: "Tiramisu", category: "Italian", time: "40 min", rating: 4.9, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80", description: "Classic Italian coffee dessert." },
  { id: 8, name: "Grilled Salmon", category: "Seafood", time: "25 min", rating: 4.6, image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80", description: "Herb-crusted grilled salmon fillet." },
];

const categories = ["All", "Italian", "French", "British", "Seafood", "Japanese", "Breakfast"];

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
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="group bg-white"
              >
                <Link to={`/recipes/${dish.id}`}>
                  <div className="overflow-hidden">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-[#c8a96e] text-xs uppercase tracking-widest mb-1">{dish.category}</p>
                    <h3 className="text-base font-serif font-bold text-[#1a1a1a] mb-2 group-hover:text-[#c8a96e] transition-colors">
                      {dish.name}
                    </h3>
                    <p className="text-xs text-[#888] mb-3">{dish.description}</p>
                    <div className="flex items-center gap-4 text-xs text-[#888]">
                      <span className="flex items-center gap-1"><FiClock className="text-[#c8a96e]" />{dish.time}</span>
                      <span className="flex items-center gap-1"><FiStar className="text-[#c8a96e]" />{dish.rating}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;
