import { motion } from "framer-motion";
import { Link } from "react-router";
import { FiClock, FiStar } from "react-icons/fi";

const dishes = [
  {
    id: 1,
    name: "Truffle Pasta",
    category: "Italian",
    time: "30 min",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80",
    description: "Rich black truffle pasta with parmesan and fresh herbs.",
  },
  {
    id: 2,
    name: "Beef Wellington",
    category: "British",
    time: "90 min",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80",
    description: "Classic beef tenderloin wrapped in golden puff pastry.",
  },
  {
    id: 3,
    name: "Crème Brûlée",
    category: "French",
    time: "45 min",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400&q=80",
    description: "Silky vanilla custard with a perfectly caramelized sugar crust.",
  },
  {
    id: 4,
    name: "Lobster Bisque",
    category: "Seafood",
    time: "60 min",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80",
    description: "Velvety smooth bisque with fresh lobster and cream.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const PopularDishes = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#c8a96e] text-xs uppercase tracking-[0.3em] font-medium mb-3">
            Our Specialties
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a1a1a]">
            Popular Dishes
          </h2>
          <div className="w-12 h-0.5 bg-[#c8a96e] mx-auto mt-5" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {dishes.map((dish, i) => (
            <motion.div
              key={dish.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="group cursor-pointer"
            >
              <Link to={`/recipes/${dish.id}`}>
                <div className="overflow-hidden mb-4">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-[#c8a96e] text-xs uppercase tracking-widest mb-1">
                  {dish.category}
                </p>
                <h3 className="text-lg font-serif font-bold text-[#1a1a1a] mb-2 group-hover:text-[#c8a96e] transition-colors">
                  {dish.name}
                </h3>
                <p className="text-sm text-[#888] mb-3 leading-relaxed">{dish.description}</p>
                <div className="flex items-center gap-4 text-xs text-[#888]">
                  <span className="flex items-center gap-1">
                    <FiClock className="text-[#c8a96e]" /> {dish.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiStar className="text-[#c8a96e]" /> {dish.rating}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/recipes"
            className="inline-block border border-[#c8a96e] text-[#c8a96e] hover:bg-[#c8a96e] hover:text-white px-10 py-3 text-xs uppercase tracking-widest transition-all duration-300"
          >
            View All Recipes
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularDishes;
