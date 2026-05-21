import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

import MainLayout from "./pages/MainLayout";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "recipes", Component: Recipes },
      { path: "recipes/:id", Component: RecipeDetails },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: "sans-serif",
            fontSize: "13px",
          },
          success: { iconTheme: { primary: "#c8a96e", secondary: "#fff" } },
        }}
      />
    </AuthProvider>
  </StrictMode>
);
