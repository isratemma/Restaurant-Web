import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      {/* Header */}
      <div className="bg-white border-b border-[#e8e0d0] py-16 text-center">
        <p className="text-[#c8a96e] text-xs uppercase tracking-[0.3em] mb-3">Our Story</p>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1a1a1a]">About Bouffe</h1>
        <div className="w-12 h-0.5 bg-[#c8a96e] mx-auto mt-5" />
      </div>

      {/* Story section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#c8a96e] text-xs uppercase tracking-[0.3em] mb-4">Who We Are</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1a1a1a] mb-6">
              A Passion for Fine Cuisine
            </h2>
            <p className="text-[#666] leading-relaxed mb-4">
              Bouffe was born from a deep love of food and the belief that great cooking should be accessible to everyone. We curate the finest recipes from around the world, bringing the art of fine dining into your home.
            </p>
            <p className="text-[#666] leading-relaxed">
              Our team of professional chefs and food enthusiasts work tirelessly to create, test, and perfect every recipe we share. From classic French techniques to modern fusion cuisine, Bouffe is your culinary companion.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80"
              alt="About"
              className="w-full h-80 object-cover"
            />
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-t border-b border-[#e8e0d0]">
          {[
            { number: "500+", label: "Recipes" },
            { number: "50+", label: "Expert Chefs" },
            { number: "100K+", label: "Happy Cooks" },
            { number: "15+", label: "Cuisines" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-4xl font-serif font-bold text-[#c8a96e] mb-2">{stat.number}</p>
              <p className="text-sm uppercase tracking-widest text-[#888]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
