"use client";

import { useEffect, useState } from "react";

export default function UserDashboard() {
;
  const [userid, setUserid] = useState("")
  const [user, setUser] = useState()
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Récupère les données de l'utilisateur depuis localStorage
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    console.log(userData);
    console.log(token);
    if (userData && token) {
        setUserid(userData); // Récupérer l'utilisateur à partir de localStorage
    } else {
      setError('Utilisateur non authentifié.');
      setLoading(false);
      return;
    }

    // Récupérer les réservations de l'utilisateur
    const fetchReservations = async () => {
      try {
        const response = await fetch(`http://localhost:3000/schedule/family/${userData}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Utilisation du token pour authentification
          },
        });
        
        if (!response.ok) throw new Error("Erreur lors du chargement des réservations.");
        
        const data = await response.json();
        console.log(data);
        setReservations(data);
      } catch (err) {
        setError(err.message || "Une erreur est survenue.");
      } finally {
        setLoading(false);
      }
      const Users = await fetch(`http://localhost:3000/users/${userData}`);
      const User = await Users.json();
      setUser(User);
    };

    fetchReservations();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Chargement...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-600">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-4xl text-black mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Section Informations utilisateur */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold mb-4">Bienvenue, {user?.name} !</h1>
          <div className="border-t border-gray-200 pt-4">
            <p>
              <span className="font-medium">Email : </span>
              {user?.email}
            </p>
            <p>
              <span className="font-medium">Téléphone : </span>
              {user?.phone}
            </p>
          </div>
        </div>

        {/* Section Réservations */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Vos créneaux réservés</h2>
          {reservations.length === 0 ? (
            <p className="text-gray-500">Vous n'avez réservé aucun créneau.</p>
          ) : (
            <table className="w-full table-auto border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-2 text-left">Date</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Heure</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Infirmière</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation) => (
                  <tr key={reservation.id} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2">{reservation.date}</td>
                    <td className="border border-gray-200 px-4 py-2">
                      {reservation.startTime} - {reservation.endTime}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {reservation.userId} (#{reservation.nurseId})
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                        Annuler
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
