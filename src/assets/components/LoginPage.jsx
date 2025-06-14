import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/user", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data;
      login(token, user);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "La connexion a échoué. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-gray-100 text-center"></h2>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-2 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Votre Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-gray-700 text-gray-200 placeholder-gray-400 border-0 rounded-md px-4 py-2 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <input
            type="password"
            placeholder="Entrez votre mot de passe "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-gray-700 text-gray-200 placeholder-gray-400 border-0 rounded-md px-4 py-2 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <div className="flex items-center justify-between text-sm text-gray-300">
            <label htmlFor="remember-me" className="flex items-center cursor-pointer">
              <input type="checkbox" id="remember-me" className="mr-2" />
              Se souvenir de moi
            </label>
            <a href="#" className="text-blue-400 hover:underline">
             Mot de passe oublié ?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold py-2 rounded-md hover:from-indigo-600 hover:to-blue-600 transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Se connecter"}
          </button>
        </form>

        <p className="text-center text-gray-300 text-sm">
          Pas de compte?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-400 hover:underline cursor-pointer"
          >
            Inscrivez-vous
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
