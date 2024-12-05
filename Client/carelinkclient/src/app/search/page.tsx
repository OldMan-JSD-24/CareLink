"use client";

import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface Nurse {
    id: number;
    name: string;
    location: string;
    bio: string;
    availability: string[]; // Disponibilités obtenues via le deuxième endpoint
    image: string;
}

export default function SearchPage() {
    const router = useRouter(); // Hook pour gérer la navigation
    const [nurses, setNurses] = useState<Nurse[]>([]); // Tous les infirmiers
    const [filteredResults, setFilteredResults] = useState<Nurse[]>([]); // Résultats filtrés
    const [searchQuery, setSearchQuery] = useState({
        location: "",
        keyword: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Charger les infirmiers depuis la base de données
    useEffect(() => {
        const fetchNurses = async () => {
            setLoading(true);
            setError(null);

            try {
                // Charger la liste initiale des infirmières
                const response = await fetch("http://localhost:3000/users/nurses");
                if (!response.ok) {
                    throw new Error("Erreur lors du chargement des infirmiers.");
                }

                const nursesData = await response.json();
                console.log(nursesData)
                // Charger les disponibilités de chaque infirmière
                const nursesWithAvailability = await Promise.all(
                    nursesData.map(async (nurse: Nurse) => {
                        try {
                            const scheduleResponse = await fetch(
                                `http://localhost:3000/schedule/${nurse.id}`
                            );
                            if (!scheduleResponse.ok) {
                                throw new Error(`Erreur lors du chargement du planning pour ${nurse.name}`);
                            }

                            const availabilityData = await scheduleResponse.json();
                            console.log(availabilityData)
                            return { ...nurse, availability: availabilityData }; // Ajouter les disponibilités
                        } catch (err) {
                            console.error("Erreur de chargement des disponibilités :", err);
                            return { ...nurse, availability: [] }; // Par défaut, une liste vide
                        }
                    })
                );

                setNurses(nursesWithAvailability); // Charger infirmières avec disponibilités
                setFilteredResults(nursesWithAvailability); // Afficher tous par défaut
            } catch (err: any) {
                setError(err.message || "Une erreur est survenue.");
            } finally {
                setLoading(false);
            }
        };

        fetchNurses();
    }, []);

    // Fonction de recherche
    const handleSearch = () => {
        const filtered = nurses.filter((nurse) => {
            const matchesLocation = nurse.location
                .toLowerCase()
                .includes(searchQuery.location.toLowerCase());
            const matchesKeyword = nurse.bio
                .toLowerCase()
                .includes(searchQuery.keyword.toLowerCase());
            return matchesLocation && matchesKeyword;
        });

        setFilteredResults(filtered);
    };

    const handleBookSchedule = (nurseId: number) => {
        // Rediriger vers la page de réservation en passant l'ID de l'infirmière
        router.push(`/booking?nurseId=${nurseId}`);
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
                            placeholder="Recherchez par ville..."
                            className="flex-grow px-4 py-3 text-gray-700 focus:outline-none"
                            value={searchQuery.location}
                            onChange={(e) =>
                                setSearchQuery({ ...searchQuery, location: e.target.value })
                            }
                        />
                        <input
                            type="text"
                            placeholder="Mot-clé (ex: pédiatrie)"
                            className="flex-grow px-4 py-3 text-gray-700 focus:outline-none"
                            value={searchQuery.keyword}
                            onChange={(e) =>
                                setSearchQuery({ ...searchQuery, keyword: e.target.value })
                            }
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-blue-500 text-white px-5 py-3 flex items-center hover:bg-blue-700"
                            disabled={loading}
                        >
                            {loading ? "Chargement..." : <FiSearch size={20} className="mr-2" />}
                            Rechercher
                        </button>
                    </div>
                </div>
            </div>

            {/* Section des résultats */}
            <div className="max-w-6xl mx-auto py-10 px-4">
                {error && (
                    <p className="text-center text-red-600">
                        Une erreur est survenue : {error}
                    </p>
                )}
                {loading ? (
                    <p className="text-center text-gray-600 mt-10">
                        Chargement des infirmiers...
                    </p>
                ) : filteredResults.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredResults.map((nurse) => (
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
                                                <li key={index}>
                                                    {`Date : ${slot.date}, Heure : ${slot.startTime} - ${slot.endTime}, Capacité : ${slot.capacity}, Réservations actuelles : ${slot.currentBookings}`}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <button 
                                    onClick={() => handleBookSchedule(nurse.id)}
                                    className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
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
