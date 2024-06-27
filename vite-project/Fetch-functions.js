import { renderPokemon } from "./render-functions.js";

const fetchAllPokemon = async (pokemon = "?limit=1302") => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );
    if (!response.ok) {
      throw new Error("You didn't catch 'em all");
    }
    const jsonData = await response.json();
    if (!jsonData.results) return jsonData;
    return jsonData.results;
  } catch (error) {
    console.warn(error);
    return null;
  }
};

//add event listener, when clicked it will take the name of the pokemon
//fetch the specific one
//grab all the information into an object

const fetchDataPokemon = async (pokemonName) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    if (!response.ok) {
      throw new Error("Pokemon not found");
    }
    const pokeJson = await response.json();

    const id = pokeJson.id;
    const weight = pokeJson.weight;
    const namePoke = pokeJson.name;
    const height = pokeJson.height;
    const stats = pokeJson.stats;
    const type = pokeJson.types[0].type;
    const ability = pokeJson.abilities; // issue
    const image = pokeJson.sprites.front_default;
    const moves = pokeJson.moves.map((move) => move.move);

    const pokeData = {
      id,
      weight,
      namePoke,
      height,
      stats,
      type,
      ability,
      image,
      moves,
    };
    console.log(pokeData);
    return pokeData;
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    return null;
  }
};

// // user can submit the form
const searchPokemon = async (e) => {
  e.preventDefault();
  document.querySelector("#pokemon-list").innerHTML = ``;
  const value = document.querySelector("#pokemon-search").value;

  const pokemonData = await fetchAllPokemon(value);

  const pokeArr = [pokemonData];
  console.log(pokeArr);
  await renderPokemon(pokeArr);
};

document.getElementById("poke-form").addEventListener("submit", searchPokemon);

export { searchPokemon, fetchDataPokemon, fetchAllPokemon };
