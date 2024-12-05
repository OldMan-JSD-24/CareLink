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

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const { message } = await response.json();
        setErrorMessage(message || 'Une erreur est survenue.');
        return;
      }
  
      const { token, user } = await response.json();
      console.log('Utilisateur connecté:', user);
  
      localStorage.setItem('token', token);
      localStorage.setItem('user', user.id); // Stocker le token pour l'authentification
  
      // Redirection en fonction du rôle
      if (user.role === 'nurse') {
        router.push('/profile'); // Page profil infirmière
      } else if (user.role === 'family') {
        router.push('/search'); // Page famille
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Erreur lors de la connexion.');
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
