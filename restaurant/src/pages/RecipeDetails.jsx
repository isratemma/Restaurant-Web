import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import { FiClock, FiStar, FiArrowLeft, FiUsers } from "react-icons/fi";

const recipes = [
  {
    id: "1",
    name: "Truffle Pasta",
    category: "Italian",
    time: "30 min",
    rating: 4.9,
    servings: 2,
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80",
    description: "Rich black truffle pasta with parmesan and fresh herbs. A luxurious dish that brings the taste of fine dining to your home kitchen.",
    ingredients: ["200g tagliatelle", "30g black truffle", "100g parmesan", "3 tbsp butter", "2 garlic cloves", "Fresh thyme", "Salt & pepper"],
    steps: [
      "Cook pasta in salted boiling water until al dente.",
      "Melt butter in a pan over medium heat, add minced garlic.",
      "Toss drained pasta in the butter sauce.",
      "Shave truffle generously over the pasta.",
      "Finish with grated parmesan and fresh thyme.",
      "Season with salt and pepper. Serve immediately.",
    ],
  },
  {
    id: "2",
    name: "Beef Wellington",
    category: "British",
    time: "90 min",
    rating: 4.8,
    servings: 4,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
    description: "Classic beef tenderloin wrapped in golden puff pastry with mushroom duxelles. The ultimate showstopper for any dinner party.",
    ingredients: ["800g beef tenderloin", "500g mushrooms", "6 slices prosciutto", "2 sheets puff pastry", "2 egg yolks", "Dijon mustard", "Thyme"],
    steps: [
      "Sear the beef on all sides until browned. Brush with mustard.",
      "Blitz mushrooms and cook until dry (duxelles).",
      "Lay prosciutto on cling film, spread duxelles, place beef and roll tightly.",
      "Chill for 30 minutes, then wrap in puff pastry.",
      "Brush with egg wash and score the top.",
      "Bake at 200°C for 25-30 minutes until golden.",
    ],
  },
];

const RecipeDetails = () => {
  const { id } = useParams();
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf9f6]">
        <h2 className="text-2xl font-serif text-[#1a1a1a] mb-4">Recipe not found</h2>
        <Link to="/recipes" className="text-[#c8a96e] hover:underline text-sm">← Back to Recipes</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      {/* Hero image */}
      <div className="relative h-[50vh] overflow-hidden">
        <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-6 pb-10 w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="text-[#c8a96e] text-xs uppercase tracking-widest mb-2">{recipe.category}</p>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">{recipe.name}</h1>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link to="/recipes" className="flex items-center gap-2 text-[#888] hover:text-[#c8a96e] text-sm mb-8 transition-colors">
          <FiArrowLeft /> Back to Recipes
        </Link>

        {/* Meta */}
        <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-[#e8e0d0]">
          <span className="flex items-center gap-2 text-sm text-[#666]"><FiClock className="text-[#c8a96e]" />{recipe.time}</span>
          <span className="flex items-center gap-2 text-sm text-[#666]"><FiStar className="text-[#c8a96e]" />{recipe.rating} rating</span>
          <span className="flex items-center gap-2 text-sm text-[#666]"><FiUsers className="text-[#c8a96e]" />Serves {recipe.servings}</span>
        </div>

        <p className="text-[#555] leading-relaxed mb-10">{recipe.description}</p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Ingredients */}
          <div>
            <h2 className="text-xl font-serif font-bold text-[#1a1a1a] mb-5">Ingredients</h2>
            <ul className="space-y-3">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-[#555]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8a96e] flex-shrink-0" />
                  {ing}
                </li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div>
            <h2 className="text-xl font-serif font-bold text-[#1a1a1a] mb-5">Instructions</h2>
            <ol className="space-y-4">
              {recipe.steps.map((step, i) => (
                <li key={i} className="flex gap-4 text-sm text-[#555]">
                  <span className="w-6 h-6 rounded-full bg-[#c8a96e] text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
