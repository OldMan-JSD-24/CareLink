"use client";

import { useState } from "react";

interface NurseProfile {
  id: number;
  name: string;
  location: string;
  bio: string;
  availability: string[];
  image: string;
}

export default function NurseProfilePage() {
  // Simulons un profil infirmière (pour le moment)
  const [profile, setProfile] = useState<NurseProfile>({
    id: 1,
    name: "Marie Dupont",
    location: "Paris",
    bio: "Infirmière spécialisée en pédiatrie et soins à domicile.",
    availability: ["Lundi 9h-12h", "Mardi 14h-16h", "Vendredi 10h-13h"],
    image: "/images/photo.jpg",
  });

  // État simulant si l'utilisateur connecté est une infirmière
  const [isNurse, setIsNurse] = useState(true); // Simule un utilisateur infirmière

  // Gestion de la mise à jour des informations
  const [editMode, setEditMode] = useState(false);
  const [updatedBio, setUpdatedBio] = useState(profile.bio);
  const [updatedAvailability, setUpdatedAvailability] = useState(
    profile.availability.join(", ")
  );

  const handleSave = () => {
    setProfile({
      ...profile,
      bio: updatedBio,
      availability: updatedAvailability.split(",").map((slot) => slot.trim()),
    });
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Section Profil */}
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Image */}
          <img
            src={profile.image}
            alt={profile.name}
            className="w-full h-60 object-cover"
          />
          {/* Détails */}
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800">{profile.name}</h1>
            <p className="text-sm text-gray-500">{profile.location}</p>
            <p className="text-gray-700 mt-4">{profile.bio}</p>
            <div className="mt-4">
              <strong className="block text-gray-800">
                Disponibilités :
              </strong>
              <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                {profile.availability.map((slot, index) => (
                  <li key={index}>{slot}</li>
                ))}
              </ul>
            </div>

            {/* Bouton pour réserver un créneau */}
            {!isNurse && (
              <button className="mt-6 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                Réserver un créneau
              </button>
            )}
          </div>
        </div>

        {/* Section édition pour les infirmières */}
        {isNurse && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Gestion de votre profil
            </h2>
            {editMode ? (
              <div className="bg-white shadow-md rounded-lg p-6">
                <div className="mb-4">
                  <label
                    htmlFor="bio"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Bio :
                  </label>
                  <textarea
                    id="bio"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                    value={updatedBio}
                    onChange={(e) => setUpdatedBio(e.target.value)}
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="availability"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Disponibilités (séparées par des virgules) :
                  </label>
                  <input
                    type="text"
                    id="availability"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                    value={updatedAvailability}
                    onChange={(e) =>
                      setUpdatedAvailability(e.target.value)
                    }
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    Sauvegarder
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Modifier mon profil
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
