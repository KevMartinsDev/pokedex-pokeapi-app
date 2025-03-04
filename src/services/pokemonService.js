export async function fetchPokemonList(limit, offset) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  if (!response.ok) throw new Error("Error loading Pokémon");

  const data = await response.json();
  return data.results.map((pokemon) => {
    const pokemonId = pokemon.url.split('/').filter(Boolean).pop();
    return {
      ...pokemon,
      id: parseInt(pokemonId),
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`,
    };
  });
}

export async function fetchPokemonByName(name) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
  if (!response.ok) throw new Error("Pokémon not found!");

  const data = await response.json();
  return {
    name: data.name,
    id: data.id,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
    types: data.types.map((typeInfo) => typeInfo.type.name), 
  };
}

export const fetchPokemonData = async (id) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!response.ok) throw new Error(`Error loading Pokémon details: ${response.status}`);
  const data = await response.json();
  return {
    name: data.name,
    abilities: data.abilities.map((ability) => ({
      name: ability.ability.name,
      url: ability.ability.url,
    })),
    moves: data.moves.slice(0, 10).map((move) => ({
      name: move.move.name,
      url: move.move.url,
    })),
    types: data.types.map((type) => type.type.name),
    stats: data.stats.map((stat) => ({
      name: stat.stat.name,
      value: stat.base_stat,
    })),
  };
};

export const fetchPokemonDescriptionData = async (id) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  if (!response.ok) throw new Error(`Error loading Pokémon description: ${response.status}`);
  const data = await response.json();
  const flavorText = data.flavor_text_entries.find((entry) => entry.language.name === 'en');
  return flavorText ? flavorText.flavor_text.replace(/[\f\n\r\t\v]/g, ' ') : 'No description available.';
};

export const fetchAbilityDescriptionData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error loading ability description: ${response.status}`);
    const data = await response.json();
    const effectEntry = data.effect_entries?.find((entry) => entry.language.name === 'en');
    if (effectEntry) return effectEntry.effect.replace(/[\f\n\r\t\v]/g, ' ');
    const flavorTextEntry = data.flavor_text_entries?.find((entry) => entry.language.name === 'en');
    return flavorTextEntry ? flavorTextEntry.flavor_text.replace(/[\f\n\r\t\v]/g, ' ') : 'No description available.';
  } catch (error) {
    console.error(`Failed to fetch ability description from ${url}:`, error.message);
    throw error;
  }
};

export const fetchMoveDescriptionData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Error loading move description');
  const data = await response.json();
  const effectEntry = data.effect_entries.find((entry) => entry.language.name === 'en');
  return effectEntry ? effectEntry.effect.replace(/[\f\n\r\t\v]/g, ' ') : 'No description available.';
};

export const fetchTypeMatchupsData = async (types) => {
  const typeData = await Promise.all(
    types.map(async (type) => {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      if (!response.ok) throw new Error('Error loading type data');
      return await response.json();
    })
  );

  const weaknesses = new Set();
  const resistances = new Set();

  typeData.forEach((type) => {
    type.damage_relations.double_damage_from.forEach((t) => weaknesses.add(t.name));
    type.damage_relations.half_damage_from.forEach((t) => resistances.add(t.name));
    type.damage_relations.no_damage_from.forEach((t) => resistances.add(t.name));
  });

  resistances.forEach((type) => {
    if (weaknesses.has(type)) {
      weaknesses.delete(type);
      resistances.delete(type);
    }
  });

  return {
    weaknesses: Array.from(weaknesses),
    resistances: Array.from(resistances),
  };
};