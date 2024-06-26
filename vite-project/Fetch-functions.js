
export const fetchAllPokemon = async () => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=1302`
    );
    if (!response.ok) {
      throw new Error("You didn't catch 'em all");
    }
    const jsonData = await response.json();

    return jsonData.results;
  } catch (error) {
    console.warn(error);
      return null;
  }
};

//add event listener, when clicked it will take the name of the pokemon
//fetch the specific one
//grab all the information into an object

export const fetchDataPokemon = async (pokemonName) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
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
    const moves = pokeJson.moves.map(move => move.move);

    const pokeData = { id, weight, namePoke, height, stats, type, ability, image, moves};
    console.log(pokeData);
    return pokeData;
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    return null; 
  }
};


/*
export const fetchDataPokemon = async (e) => {
  const pokeName = e.target;
  const response =  fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
  //const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${e}`);
  if (!response.ok) {
    throw new Error("can't find pokemon - try again later");
  }
  const pokeJson = await response.json();

  const id = await pokeJson.id;
  const weight = await pokeJson.weight;
  const namePoke = await pokeJson.name;
  const height = await pokeJson.height;
  const stats = await pokeJson.stats[0];
  const type = await pokeJson.types[0].type;
  const ability = await pokeJson.abilities;

  const pokeData = { id, weight, namePoke, height, stats, type, ability };
  console.log(pokeData);
  return pokeData;
};
*/


// // user can submit the form
// const searchPokemon = (event) => {
//   event.preventDefault();
//   const pokemonName = document.getElementById('pokemon-search').value.trim();
//   if (pokemonName) {
//       updatePokemonDetails(pokemonName);
//   }
// };

// // Make getting pokemon user accessible
// const fetchOnePokemon = async (pokemon) => {
//   try {
//       const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
//       if (!response.ok) {
//           throw new Error('Pokemon not found');
//       }
//       const data = await response.json();
//       return data;
//   } catch (error) {
//       console.error('Are you sure that\'s what you\'re looking for?:', error);
//       return null;
//   }
// };

// take info from api and give to user
// const updatePokemonDetails = async (pokemonName) => {
//   const data = await fetchOnePokemon(pokemonName);
//   if (data) {
//       // pokemon name, hp, id, height, weight, attack
//       document.getElementById('pokemon-name').textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
//       document.getElementById('pokemon-hp').textContent = `HP: ${data.stats[0].base_stat}`;
//       document.getElementById('pokemon-id').textContent = `ID: ${data.id}`;
//       document.getElementById('pokemon-height').textContent = `Height: ${data.height}`;
//       document.getElementById('pokemon-weight').textContent = `Weight: ${data.weight}`;
//       document.getElementById('pokemon-attack').textContent = `Attack: ${data.stats[1].base_stat}`;

//       // pokemon type
//       const types = data.types.map(type => type.type.name).join(', ');
//       document.getElementById('pokemon-type').textContent = `Type: ${types}`;

//       // pokemon image
//       document.getElementById('pokemon-image').src = data.sprites.front_default;
//       document.getElementById('pokemon-image').alt = data.name;

//       // pokemon moves
//       const movesList = document.getElementById('pokemon-moves');
//       movesList.innerHTML = '';
//       data.moves.slice(0, 5).forEach(move => {
//           movesList.innerHTML += `<li>${move.move.name}</li>`;
//         });
//       }
//   };

// console.log(fetchDataPokemon());

