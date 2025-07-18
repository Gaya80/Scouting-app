import React from 'react';
import './PlayerTable.css';

export default function PlayerTable({ players }) {
  return (
    <div className="table-container">
      <h2>Liste des joueurs</h2>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Nationalité</th>
            <th>Rôle</th>
            <th>Équipe</th>
            <th>Date de naissance</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td>{player.name}</td>
              <td>{player.nationality}</td>
              <td>{player.role}</td>
              <td>{player.team}</td>
              <td>{player.birthdate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
