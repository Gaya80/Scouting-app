import React, { useState, useEffect } from 'react';
import PlayerCard from './components/PlayerCard';
import { supabase } from './supabaseClient';
import './App.css'; // <-- Import du fichier CSS


function App() {
  const [players, setPlayers] = useState([]);
  const [form, setForm] = useState({ name: '', role: '', team: '' });


  useEffect(() => {
    fetchPlayers();
  }, []);


  const fetchPlayers = async () => {
    const { data, error } = await supabase.from('players').select('*');
    if (error) console.error('Erreur fetch:', error);
    else setPlayers(data);
  };


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.role || !form.team) return;


    const { data, error } = await supabase.from('players').insert([form]);
    if (error) console.error("Erreur Supabase:", error);
    else {
      setForm({ name: '', role: '', team: '' });
      fetchPlayers();
    }
  };


  return (
    <div className="app-container">
      <h1>Liste des joueurs</h1>


      <div className="player-list">
        {players.filter(Boolean).map(player => (
          <PlayerCard key={player.id} {...player} />
        ))}
      </div>


      <h2>Ajouter un joueur</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Nom
          <input
            name="name"
            placeholder="Nom"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>


        <label>
          Rôle
          <input
            name="role"
            placeholder="Rôle"
            value={form.role}
            onChange={handleChange}
            required
          />
        </label>


        <label>
          Équipe
          <input
            name="team"
            placeholder="Équipe"
            value={form.team}
            onChange={handleChange}
            required
          />
        </label>


        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}


export default App;