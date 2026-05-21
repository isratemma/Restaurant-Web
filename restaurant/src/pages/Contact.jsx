import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="bg-white border-b border-[#e8e0d0] py-16 text-center">
        <p className="text-[#c8a96e] text-xs uppercase tracking-[0.3em] mb-3">Get In Touch</p>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1a1a1a]">Contact Us</h1>
        <div className="w-12 h-0.5 bg-[#c8a96e] mx-auto mt-5" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16">
        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-serif font-bold text-[#1a1a1a] mb-8">We'd love to hear from you</h2>
          <div className="space-y-6">
            {[
              { icon: FiMapPin, label: "Address", value: "123 Culinary Street, Food City, FC 10001" },
              { icon: FiPhone, label: "Phone", value: "+1 (555) 123-4567" },
              { icon: FiMail, label: "Email", value: "hello@bouffe.com" },
              { icon: FiClock, label: "Hours", value: "Mon–Sat: 10am – 10pm" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#f5ede0] flex items-center justify-center flex-shrink-0">
                  <Icon className="text-[#c8a96e]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#888] mb-1">{label}</p>
                  <p className="text-sm text-[#444]">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-5"
        >
          <div>
            <label className="text-xs uppercase tracking-widest text-[#888] block mb-2">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-[#e0d5c0] bg-white px-4 py-3 text-sm text-[#333] outline-none focus:border-[#c8a96e] transition-colors"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-[#888] block mb-2">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-[#e0d5c0] bg-white px-4 py-3 text-sm text-[#333] outline-none focus:border-[#c8a96e] transition-colors"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-[#888] block mb-2">Message</label>
            <textarea
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full border border-[#e0d5c0] bg-white px-4 py-3 text-sm text-[#333] outline-none focus:border-[#c8a96e] transition-colors resize-none"
              placeholder="Your message..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#c8a96e] hover:bg-[#b8955a] text-white py-3 text-xs uppercase tracking-widest transition-colors duration-300"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default Contact;
