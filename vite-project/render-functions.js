import { fetchAllPokemon, fetchDataPokemon } from "./Fetch-functions";

export const renderPokemon = async (pokemon) => {
  //make sure you clear the pokemon every time
  document.querySelector("#pokemon-list").innerHTML = ``;
  //takes an array of objects = results
  //console.log(typeof pokemon);

  // const pokeData = { id, weight, namePoke, height, stats, type, ability };
  //create an element for each thing
  //append elements to cards
  if (!pokemon) return;
  for (let i = 0; i < pokemon.length; i++) {
    // console.log(i);
    //console.log(pokemon[i]);
    const url = pokemon[i].url
      ? pokemon[i].url
      : `https://pokeapi.co/api/v2/pokemon/${pokemon[i].name}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`No Pokemon exist brother`);
    }
    const parsedPoke = await response.json();
    // console.log('RUAHH', pokemon, parsedPoke)

    const idNum = document.createElement("p");
    const li = document.createElement("li");
    li.textContent = pokemon[i].name;
    li.id = `${pokemon[i].name}`;
    li.classList = `myPokemon`;
    idNum.textContent = parsedPoke.id;
    //console.log(parsedPoke.id);
    if (parsedPoke.id < 100) idNum.textContent = `0${parsedPoke.id}`;
    if (parsedPoke.id < 10) idNum.textContent = `00${parsedPoke.id}`;
    //const section = document.createElement("section");
    document.querySelector("#pokemon-list").append(idNum, li);
  }

  // const pokeData = { id, weight, namePoke, height, stats, type, ability };
  //create an element for each thing
  //append elements to cards
};

// const myPoke = await fetchAllPokemon();
// //console.log("TESTINGDJGBD", myPoke);
// await renderPokemon(myPoke);
// //grabIdNum(myPoke);

export const renderCard = async (e) => {
  if (e.target.matches("li")) {
    const pokemonName = e.target.textContent;
    try {
      // Fetch data for the selected Pokémon
      const pokeData = await fetchDataPokemon(pokemonName);

      console.log(pokeData);

      // Update DOM elements in the left section with fetched data
      const pokemonNameElement = document.getElementById("pokemon-name");
      const pokemonIdElement = document.getElementById("pokemon-id");
      const pokemonHeightElement = document.getElementById("pokemon-height");
      const pokemonWeightElement = document.getElementById("pokemon-weight");
      const pokemonTypeElement = document.getElementById("pokemon-type");
      const pokemonStatsElement = document.getElementById("pokemon-hp");
      const pokemonAttackElement = document.getElementById("pokemon-attack");
      const pokemonImageElement = document.getElementById("pokemon-image");
      const movesList = document.getElementById("pokemon-moves");

      //DOM changes are made
      pokemonNameElement.textContent = pokeData.namePoke;
      pokemonIdElement.textContent = `ID: ${pokeData.id}`;
      pokemonHeightElement.textContent = `Height: ${pokeData.height}`;
      pokemonWeightElement.textContent = `Weight: ${pokeData.weight}`;
      pokemonTypeElement.textContent = `Type: ${pokeData.type.name}`;
      pokemonStatsElement.textContent = `HP: ${pokeData.stats[0].base_stat}`;
      pokemonAttackElement.textContent = `ATK: ${pokeData.stats[1].base_stat}`;
      pokemonImageElement.src = pokeData.image;

      // moves
      movesList.innerHTML = "";
      pokeData.moves.slice(0, 5).forEach((move) => {
        movesList.innerHTML += `<li>${move.name}</li>`;
      });
    } catch (error) {
      console.error("Error rendering Pokémon card:", error);
    }
  }
};
