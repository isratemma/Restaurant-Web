import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { FiBookmark, FiHeart, FiClock, FiUser } from "react-icons/fi";

const savedRecipes = [
  { id: 1, name: "Truffle Pasta", category: "Italian", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300&q=80" },
  { id: 2, name: "Crème Brûlée", category: "French", image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=300&q=80" },
  { id: 3, name: "Beef Wellington", category: "British", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&q=80" },
];

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      {/* Header */}
      <div className="bg-white border-b border-[#e8e0d0] py-16 text-center">
        <p className="text-[#c8a96e] text-xs uppercase tracking-[0.3em] mb-3">My Account</p>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1a1a1a]">Dashboard</h1>
        <div className="w-12 h-0.5 bg-[#c8a96e] mx-auto mt-5" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-[#e8e0d0] p-8 flex flex-col sm:flex-row items-center gap-6 mb-12"
        >
          <img
            src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || "User"}&background=c8a96e&color=fff&size=128`}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-[#e8d5b0]"
          />
          <div>
            <h2 className="text-2xl font-serif font-bold text-[#1a1a1a]">{user?.displayName || "Welcome!"}</h2>
            <p className="text-[#888] text-sm mt-1">{user?.email}</p>
            <p className="text-[#c8a96e] text-xs uppercase tracking-widest mt-2">Member since {new Date(user?.metadata?.creationTime).getFullYear()}</p>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: FiBookmark, label: "Saved Recipes", value: "12" },
            { icon: FiHeart, label: "Favorites", value: "8" },
            { icon: FiClock, label: "Cooked", value: "24" },
            { icon: FiUser, label: "Following", value: "5" },
          ].map(({ icon: Icon, label, value }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-[#e8e0d0] p-6 text-center"
            >
              <Icon className="text-[#c8a96e] mx-auto mb-3" size={24} />
              <p className="text-2xl font-serif font-bold text-[#1a1a1a]">{value}</p>
              <p className="text-xs uppercase tracking-widest text-[#888] mt-1">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Saved recipes */}
        <div>
          <h2 className="text-xl font-serif font-bold text-[#1a1a1a] mb-6">Saved Recipes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {savedRecipes.map((recipe, i) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-[#e8e0d0] overflow-hidden group"
              >
                <div className="overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <p className="text-[#c8a96e] text-xs uppercase tracking-widest mb-1">{recipe.category}</p>
                  <h3 className="font-serif font-bold text-[#1a1a1a]">{recipe.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
