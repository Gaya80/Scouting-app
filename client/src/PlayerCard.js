import React from 'react';
import './PlayerCard.css';

export default function PlayerCard({ name, nationality, role, team, birthdate }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      {nationality && <p><strong>Nationalité :</strong> {nationality}</p>}
      {role && <p><strong>Rôle :</strong> {role}</p>}
      {team && <p><strong>Équipe :</strong> {team}</p>}
      {birthdate && <p><strong>Date de naissance :</strong> {birthdate}</p>}
    </div>
  );
}

