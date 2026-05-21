import { motion } from "framer-motion";

const images = [
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80", span: "col-span-2 row-span-2" },
  { src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80", span: "" },
  { src: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&q=80", span: "" },
  { src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80", span: "" },
  { src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80", span: "" },
  { src: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&q=80", span: "" },
];

const Gallery = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[#c8a96e] text-xs uppercase tracking-[0.3em] font-medium mb-3">
            Visual Feast
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a1a1a]">
            Food Gallery
          </h2>
          <div className="w-12 h-0.5 bg-[#c8a96e] mx-auto mt-5" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              className={`overflow-hidden ${img.span}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <img
                src={img.src}
                alt={`gallery-${i}`}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 cursor-pointer"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
