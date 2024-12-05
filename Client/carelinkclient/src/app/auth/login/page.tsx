"use client"; // Directive pour activer les hooks React dans le composant

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"; // Remplace next/router par next/navigation
import { useState } from "react";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const router = useRouter(); // Utilisation de useRouter de next/navigation
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (data: LoginFormInputs) => {
    console.log(data);

    // Simuler une redirection après connexion réussie
    if (data.email === "test@example.com" && data.password === "password") {
      router.push("/search"); // Redirige vers un tableau de bord fictif
    } else {
      setErrorMessage("Email ou mot de passe invalide.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Connexion</h2>
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              placeholder="Entrez votre email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Mot de passe
            </label>
            <input
              {...register("password")}
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              placeholder="Entrez votre mot de passe"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
