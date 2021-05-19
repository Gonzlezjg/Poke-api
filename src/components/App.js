import React, {useState} from 'react';
import '../App.css';
import axios from 'axios';

function App() {
  const [pokemon, setPokemon] = useState("pikachu");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("");

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase());
  }; 
  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
  };
  const getPokemon = async () => {
    const arr = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await axios.get(url);
      arr.push(res.data);
      setPokemonType(res.data.types[0].type.name);
      setPokemonData(arr);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(pokemonData);
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" onChange={handleChange}
            placeholder="Buscar un pokemon y presiona enter"
          />
        </label>
      </form>

      {
        pokemonData.map( data => {

          return (
              
            <div className="container">
              <ul className="list">
                <li>Nombre: {data.name}</li>
                <li>Tipo: {pokemonType}</li>
                <li>Altura: {data.height}</li>
                <li>Peso: {data.weight}</li>
                <li>Batallas: {data.game_indices.length}</li>
              </ul>
            </div>
            
          )
        })
      }

    </div>
  );
}

export default App;
