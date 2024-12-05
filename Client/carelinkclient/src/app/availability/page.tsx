"use client";

import React, { useState } from "react";

interface AvailabilitySlot {
  id: number;
  date: string; // Format : YYYY-MM-DD
  time: string; // Ex : "9h - 12h"
}

export default function AvailabilityPage() {
  const [slots, setSlots] = useState<AvailabilitySlot[]>([
    { id: 1, date: "2024-12-06", time: "9h - 12h" },
    { id: 2, date: "2024-12-07", time: "14h - 16h" },
  ]);

  const [newSlot, setNewSlot] = useState({ date: "", time: "" });

  const handleAddSlot = () => {
    if (!newSlot.date || !newSlot.time) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    const newSlotEntry: AvailabilitySlot = {
      id: slots.length + 1,
      date: newSlot.date,
      time: newSlot.time,
    };
    setSlots([...slots, newSlotEntry]);
    setNewSlot({ date: "", time: "" });
  };

  const handleDeleteSlot = (id: number) => {
    setSlots(slots.filter((slot) => slot.id !== id));
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 flex justify-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
        {/* Titre */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Gestion des disponibilités
        </h1>

        {/* Liste des créneaux existants */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Mes créneaux disponibles :
          </h2>
          {slots.length > 0 ? (
            <ul className="space-y-4">
              {slots.map((slot) => (
                <li
                  key={slot.id}
                  className="flex justify-between items-center bg-blue-100 p-4 rounded-lg shadow"
                >
                  <div>
                    <p className="text-gray-800 font-medium">{slot.date}</p>
                    <p className="text-gray-600">{slot.time}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteSlot(slot.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Aucun créneau disponible pour le moment.</p>
          )}
        </div>

        {/* Formulaire d'ajout */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Ajouter un créneau :
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="date"
              value={newSlot.date}
              onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
              className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="text"
              placeholder="Ex : 9h - 12h"
              value={newSlot.time}
              onChange={(e) => setNewSlot({ ...newSlot, time: e.target.value })}
              className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              onClick={handleAddSlot}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700"
            >
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
