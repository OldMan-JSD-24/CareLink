"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Schedule {
  id: number;
  familyid: number;
  date: string;
  startTime: string;
  endTime: string;
  currentBookings: number;
  capacity: number;
  status: string;
}

export default function ReservationPage() {
  const searchParams = useSearchParams();
  const nurseId = searchParams.get("nurseId");
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!nurseId) return;

    const fetchSchedules = async () => {
      try {
        const response = await fetch(`http://localhost:3000/schedule/${nurseId}`);
        if (!response.ok) throw new Error("Erreur lors du chargement des créneaux.");
        const data = await response.json();
        console.log("dispo", data);
        setSchedules(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchSchedules();
  }, [nurseId]);

  const handleBook = async () => {
    if (!selectedScheduleId) {
      setError("Veuillez sélectionner un créneau.");
      return;
    }
  
    setLoading(true);
    setError(null);
    setMessage(null);
  
    // Retrieve familyID from localStorage
    const familyID = localStorage.getItem('user');
    console.log(familyID);
    if (!familyID) {
      setError("Aucune information de famille disponible.");
      setLoading(false);
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3000/schedule/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scheduleId: selectedScheduleId,
          familyid: familyID, // Add familyID to the request
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la réservation.");
      }
  
      const data = await response.json();
      setMessage(data.message || "Créneau réservé avec succès !");
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg text-black p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Réserver un créneau pour l'infirmière #{nurseId}
        </h1>

        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        {message && <p className="text-green-600 mb-4 text-center">{message}</p>}

        {schedules.length === 0 ? (
          <p className="text-center text-gray-500">Aucun créneau disponible.</p>
        ) : (
          <div>
            <ul className="space-y-4">
              {schedules.map((schedule) => (
                <li
                  key={schedule.id}
                  className={`flex items-center justify-between border p-4 rounded-lg ${
                    selectedScheduleId === schedule.id
                      ? "bg-blue-100 border-blue-400"
                      : "border-gray-200"
                  }`}
                >
                  <label className="flex items-center space-x-4 cursor-pointer">
                    <input
                      type="radio"
                      name="schedule"
                      value={schedule.id}
                      onChange={() => setSelectedScheduleId(schedule.id)}
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <span>
                      {schedule.date} {schedule.startTime} - {schedule.endTime}{" "}
                      <span className="text-sm text-gray-500">
                        ({schedule.currentBookings}/{schedule.capacity})
                      </span>
                    </span>
                  </label>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleBook}
                disabled={loading}
                className={`px-6 py-3 rounded-lg font-medium text-white transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Réservation en cours..." : "Réserver"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
