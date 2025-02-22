export async function fetchPokemonList(limit, offset) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    if (!response.ok) throw new Error("Erro ao carregar os Pokémons");
  
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
    if (!response.ok) throw new Error("Pokémon não encontrado!");
  
    const data = await response.json();
    return {
      name: data.name,
      id: data.id,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
    };
  }
  