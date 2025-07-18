import './PlayerCard.css';


export default function PlayerCard({ name, role, team }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p><strong>Rôle :</strong> {role}</p>
      <p><strong>Équipe :</strong> {team}</p>
    </div>
  );
}