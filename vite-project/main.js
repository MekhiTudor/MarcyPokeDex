import { renderPokemon, renderCard, renderFirstCard } from "./render-functions";
import {
  fetchAllPokemon,
  fetchDataPokemon,
  searchPokemon,
} from "./Fetch-functions";

const main = async () => {
  renderFirstCard("mewtwo");
  fetchAllPokemon();
  //fetchDataPokemon();
  searchPokemon();

  const myPoke = await fetchAllPokemon();
  await renderPokemon(myPoke);

  const list = document.getElementById("pokemon-list");
  console.log(list);
  list.addEventListener("click", renderCard);
  document
    .getElementById("poke-form")
    .addEventListener("submit", searchPokemon);
};
main();
