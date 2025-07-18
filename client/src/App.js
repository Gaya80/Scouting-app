import React, { useState, useEffect } from 'react';
import './App.css';
import { supabase } from './supabaseClient';
import PlayerCard from './PlayerCard';
import PlayerTable from './PlayerTable';

function App() {
  const [form, setForm] = useState({ name: '' });
  const [players, setPlayers] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPlayers();
  }, []);

  async function fetchPlayers() {
    const { data, error } = await supabase.from('players').select('*');
    if (error) {
      console.error('Erreur lors de la récupération des joueurs', error);
    } else {
      setPlayers(data);
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `https://lol.fandom.com/api.php?action=cargoquery&format=json&tables=Players&fields=ID,Name,Nationality,Role,Team,Birthdate&where=ID="${form.name}"&origin=*`
      );
      const json = await response.json();
      const result = json?.cargoquery?.[0]?.title;

      if (!result) {
        alert("Joueur introuvable sur Leaguepedia.");
        setLoading(false);
        return;
      }

      const newPlayer = {
        name: result.ID || form.name,
        nationality: result.Nationality || '',
        role: result.Role || '',
        team: result.Team || '',
        birthdate: result.Birthdate || '',
      };

      const { data: insertedPlayer, error } = await supabase
        .from('players')
        .insert([newPlayer])
        .select();

      if (error) {
        console.error("Erreur lors de l'ajout du joueur :", error.message);
      } else {
        setPlayers([...players, insertedPlayer[0]]);
        setForm({ name: '' });
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des infos Leaguepedia :", err);
    }

    setLoading(false);
  };

  return (
    <div className="App">
      <button className="toggle-btn" onClick={() => setShowTable(!showTable)}>
        {showTable ? 'Revenir au formulaire' : 'Voir tous les joueurs'}
      </button>

      {showTable ? (
        <PlayerTable players={players} />
      ) : (
        <>
          <h1>Ajouter un joueur</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Pseudo Leaguepedia"
              value={form.name}
              onChange={handleChange}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Chargement...' : 'Ajouter le joueur'}
            </button>
          </form>

          <div className="player-list">
            {players.map((player) => (
              <PlayerCard
                key={player.id}
                name={player.name}
                role={player.role}
                nationality={player.nationality}
                team={player.team}
                birthdate={player.birthdate}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
