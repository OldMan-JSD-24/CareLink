// pages/auth/register.tsx
"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface RegisterFormInputs {
  email: string;
  password: string;
  role: "infirmière" | "famille";
}

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Simulation de l'appel API
  const mockApiRegister = async (data: RegisterFormInputs): Promise<{ token: string }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.email === "test@exemple.com") {
          reject(new Error("L'email est déjà utilisé."));
        } else {
          resolve({ token: "fake-jwt-token" });
        }
      }, 1000);
    });
  };

  const onSubmit = async (data: RegisterFormInputs) => {
    setLoading(true);

    try {
      const response = await mockApiRegister(data);
      localStorage.setItem("token", response.token);

      // Redirige selon le rôle de l'utilisateur
      if (data.role === "infirmière") {
        router.push("/profile");
      } else {
        router.push("/nurses/search");
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-white p-8 shadow-md rounded-md w-full max-w-md text-black"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-black">Inscription</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-medium">Email</label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-2 border rounded-md"
            {...register("email", { required: "L'email est requis" })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 font-medium">Mot de passe</label>
          <input
            id="password"
            type="password"
            className="w-full px-4 py-2 border rounded-md"
            {...register("password", { required: "Le mot de passe est requis", minLength: 6 })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="role" className="block mb-2 font-medium">Rôle</label>
          <select
            id="role"
            className="w-full px-4 py-2 border rounded-md"
            {...register("role", { required: "Le rôle est requis" })}
          >
            <option value="infirmière">Infirmière</option>
            <option value="famille">Famille</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {loading ? "Chargement..." : "S'inscrire"}
        </button>
      </form>
    </div>
  );
}
