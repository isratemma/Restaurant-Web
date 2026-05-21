import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

const testimonials = [
  {
    name: "Emily Johnson",
    role: "Food Blogger",
    avatar: "https://i.pravatar.cc/80?img=1",
    text: "Bouffe has completely transformed how I cook at home. The recipes are elegant, easy to follow, and absolutely delicious. My dinner parties have never been better!",
    rating: 5,
  },
  {
    name: "James Carter",
    role: "Home Cook",
    avatar: "https://i.pravatar.cc/80?img=3",
    text: "I've tried dozens of recipe sites but Bouffe stands out. The presentation is beautiful and the recipes actually work. Highly recommend to anyone who loves food.",
    rating: 5,
  },
  {
    name: "Sophia Martinez",
    role: "Culinary Student",
    avatar: "https://i.pravatar.cc/80?img=5",
    text: "As a culinary student, I appreciate the attention to detail in every recipe. Bouffe feels like having a professional chef guide you through every step.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[#c8a96e] text-xs uppercase tracking-[0.3em] font-medium mb-3">
            What People Say
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
            Testimonials
          </h2>
          <div className="w-12 h-0.5 bg-[#c8a96e] mx-auto mt-5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-[#242424] p-8 border border-[#2e2e2e] hover:border-[#c8a96e] transition-colors duration-300"
            >
              <div className="flex gap-1 mb-5">
                {Array(t.rating).fill(0).map((_, j) => (
                  <FiStar key={j} className="text-[#c8a96e] fill-[#c8a96e]" size={14} />
                ))}
              </div>
              <p className="text-[#aaa] text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-[#666] text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
