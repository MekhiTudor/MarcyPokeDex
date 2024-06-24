const fetchAllPokemon = async () => {
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
    null;
  }
};

//add event listener, when clicked it will take the name of the pokemon
//fetch the specific one
//grab all the information into an object

const fetchDataPokemon = async (e) => {
  // const pokeName = e.target;
  //const response = fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/pikachu`);
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
console.log(fetchDataPokemon());
