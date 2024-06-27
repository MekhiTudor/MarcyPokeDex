(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function e(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=e(o);fetch(o.href,n)}})();const u=async(r="?limit=25")=>{try{const t=await fetch(`https://pokeapi.co/api/v2/pokemon/${r}`);if(!t.ok)throw new Error("You didn't catch 'em all");const e=await t.json();return e.results?e.results:e}catch(t){return console.warn(t),null}},k=async r=>{try{const t=await fetch(`https://pokeapi.co/api/v2/pokemon/${r}`);if(!t.ok)throw new Error("Pokemon not found");const e=await t.json(),s=e.id,o=e.weight,n=e.name,c=e.height,m=e.stats,l=e.types[0].type,d=e.abilities,p=e.sprites.front_default,i=e.moves.map(g=>g.move),a={id:s,weight:o,namePoke:n,height:c,stats:m,type:l,ability:d,image:p,moves:i};return console.log(a),a}catch(t){return console.error("Error fetching Pokémon data:",t),null}},f=async r=>{r.preventDefault(),document.querySelector("#pokemon-list").innerHTML="";const t=document.querySelector("#pokemon-search").value,s=[await u(t)];console.log(s),await h(s)};document.getElementById("poke-form").addEventListener("submit",f);const h=async r=>{if(document.querySelector("#pokemon-list").innerHTML="",!!r)for(let t=0;t<r.length;t++){const e=r[t].url?r[t].url:`https://pokeapi.co/api/v2/pokemon/${r[t].name}`,s=await fetch(e);if(!s.ok)throw new Error("No Pokemon exist brother");const o=await s.json(),n=document.createElement("p"),c=document.createElement("li");c.textContent=r[t].name,c.id=`${r[t].name}`,c.classList="myPokemon",n.textContent=o.id,o.id<100&&(n.textContent=`0${o.id}`),o.id<10&&(n.textContent=`00${o.id}`),document.querySelector("#pokemon-list").append(n,c)}},y=async r=>{if(r.target.matches("li")){const t=r.target.textContent;try{const e=await k(t);console.log(e);const s=document.getElementById("pokemon-name"),o=document.getElementById("pokemon-id"),n=document.getElementById("pokemon-height"),c=document.getElementById("pokemon-weight"),m=document.getElementById("pokemon-type"),l=document.getElementById("pokemon-hp"),d=document.getElementById("pokemon-attack"),p=document.getElementById("pokemon-image"),i=document.getElementById("pokemon-moves");s.textContent=e.namePoke,o.textContent=`ID: ${e.id}`,n.textContent=`Height: ${e.height}`,c.textContent=`Weight: ${e.weight}`,m.textContent=`Type: ${e.type.name}`,l.textContent=`HP: ${e.stats[0].base_stat}`,d.textContent=`ATK: ${e.stats[1].base_stat}`,p.src=e.image,i.innerHTML="",e.moves.slice(0,5).forEach(a=>{i.innerHTML+=`<li>${a.name}</li>`})}catch(e){console.error("Error rendering Pokémon card:",e)}}},E=async()=>{u(),f();const r=await u();await h(r);const t=document.getElementById("pokemon-list");console.log(t),t.addEventListener("click",y),document.getElementById("poke-form").addEventListener("submit",f)};E();