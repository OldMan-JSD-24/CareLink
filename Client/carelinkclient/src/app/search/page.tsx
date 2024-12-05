"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi"; // Icône pour la barre de recherche

interface Nurse {
  id: number;
  name: string;
  location: string;
  bio: string;
  availability: string[];
  image: string; // Nouveau champ pour l'image
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState({
    location: "",
    availability: "",
    keyword: "",
  });

  const [results, setResults] = useState<Nurse[]>([
    // Données simulées avec images
    {
      id: 1,
      name: "Marie Dupont",
      location: "Paris",
      bio: "Infirmière spécialisée en pédiatrie.",
      availability: ["Lundi 9h-12h", "Mercredi 14h-16h"],
      image: "/images/nurse1.jpg",
    },
    {
      id: 2,
      name: "Lucie Martin",
      location: "Lyon",
      bio: "Infirmière à domicile, disponible le soir.",
      availability: ["Mardi 18h-20h", "Vendredi 17h-19h"],
      image: "/images/nurse2.jpg",
    },
  ]);

  const handleSearch = () => {
    // Recherche simulée
    console.log("Recherche avec :", searchQuery);
    const filteredResults = results.filter((nurse) =>
      nurse.location.toLowerCase().includes(searchQuery.location.toLowerCase())
    );
    setResults(filteredResults);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Section de recherche */}
      <div className="bg-blue-600 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl text-center text-white font-bold mb-6">
            Trouvez une infirmière près de chez vous
          </h1>
          <div className="flex items-center bg-white shadow-md rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Recherchez par ville, disponibilité ou mot-clé..."
              className="flex-grow px-4 py-3 text-gray-700 focus:outline-none"
              value={searchQuery.location}
              onChange={(e) =>
                setSearchQuery({ ...searchQuery, location: e.target.value })
              }
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-5 py-3 flex items-center hover:bg-blue-700"
            >
              <FiSearch size={20} className="mr-2" />
              Rechercher
            </button>
          </div>
        </div>
      </div>

      {/* Section des résultats */}
      <div className="max-w-6xl mx-auto py-10 px-4">
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((nurse) => (
              <div
                key={nurse.id}
                className="bg-white shadow rounded-lg overflow-hidden"
              >
                <img
                  src={nurse.image}
                  alt={nurse.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {nurse.name}
                  </h3>
                  <p className="text-sm text-gray-500">{nurse.location}</p>
                  <p className="text-sm text-gray-700 mt-2">{nurse.bio}</p>
                  <div className="mt-4">
                    <strong className="block text-gray-800">
                      Disponibilités :
                    </strong>
                    <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                      {nurse.availability.map((slot, index) => (
                        <li key={index}>{slot}</li>
                      ))}
                    </ul>
                  </div>
                  <button className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                    Réserver un créneau
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-10">
            Aucun résultat trouvé. Essayez une autre recherche.
          </p>
        )}
      </div>
    </div>
  );
}
