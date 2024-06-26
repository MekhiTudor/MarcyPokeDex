import { fetchAllPokemon } from "./Fetch-functions";

const renderPokemon = async (pokemon) => {
  //make sure you clear the pokemon every time
  //document.querySelector("#pokemon-list").innerHTML = ``;
  //takes an array of objects = results
  for (let i = 0; i < pokemon.length; i++) {
    //console.log(pokemon[i]);
    const url = pokemon[i].url;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`No Pokemon exist brother`);
    }
    const parsedPoke = await response.json();

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

const myPoke = await fetchAllPokemon();

renderPokemon(myPoke);
//grabIdNum(myPoke);

const renderCard = (e) => {
  if (e.target.matches("li")) console.log(e.target);
};

const list = document.getElementById("pokemon-list");
console.log(list);

list.addEventListener("click", renderCard);
