import { motion } from "framer-motion";

const chefs = [
  {
    name: "Chef Antoine Dubois",
    role: "Executive Chef",
    specialty: "French Cuisine",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=300&q=80",
    quote: "Cooking is the art of adjustment.",
  },
  {
    name: "Chef Sofia Rossi",
    role: "Pastry Chef",
    specialty: "Italian Desserts",
    image: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=300&q=80",
    quote: "Every dessert tells a sweet story.",
  },
  {
    name: "Chef Marcus Lee",
    role: "Sous Chef",
    specialty: "Asian Fusion",
    image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=300&q=80",
    quote: "Flavors are the language of the soul.",
  },
];

const ChefSection = () => {
  return (
    <section className="py-20 bg-[#faf9f6]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[#c8a96e] text-xs uppercase tracking-[0.3em] font-medium mb-3">
            Meet The Team
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a1a1a]">
            Chef Recommendations
          </h2>
          <div className="w-12 h-0.5 bg-[#c8a96e] mx-auto mt-5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {chefs.map((chef, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="text-center group"
            >
              <div className="relative inline-block mb-6">
                <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-[#e8d5b0] group-hover:border-[#c8a96e] transition-colors duration-300">
                  <img
                    src={chef.image}
                    alt={chef.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <p className="text-[#c8a96e] text-xs uppercase tracking-widest mb-1">{chef.specialty}</p>
              <h3 className="text-xl font-serif font-bold text-[#1a1a1a] mb-1">{chef.name}</h3>
              <p className="text-sm text-[#888] mb-4">{chef.role}</p>
              <p className="text-sm text-[#666] italic">"{chef.quote}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChefSection;
