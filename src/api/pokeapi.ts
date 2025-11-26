import axios from 'axios';

export interface PokemonListResult {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  results: PokemonListResult[];
  next?: string | null;
  count: number;
}

export interface PokemonTypeEntry {
  slot: number;
  type: { name: string; url: string };
}

export interface PokemonSprites {
  other?: {
    'official-artwork'?: { front_default?: string | null };
  };
  front_default?: string | null;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: { name: string; url?: string };
}

export interface PokemonDetail {
  id: number;
  name: string;
  types: PokemonTypeEntry[];
  sprites: PokemonSprites;
  height: number;
  weight: number;
  stats: PokemonStat[];
  abilities: { ability: { name: string } }[];
}

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 15000,
});

export const getPokemonList = async (limit = 20, offset = 0): Promise<PokemonListResponse> => {
  const r = await api.get<PokemonListResponse>(`/pokemon?limit=${limit}&offset=${offset}`);
  return r.data;
};

export const getPokemonDetail = async (nameOrId: string | number): Promise<PokemonDetail> => {
  const r = await api.get<PokemonDetail>(`/pokemon/${nameOrId}`);
  return r.data;
};

export const getTypes = async (): Promise<{ name: string; url: string }[]> => {
  const r = await api.get<{ results: { name: string; url: string }[] }>('/type');
  return r.data.results;
};

export const getPokemonsByType = async (typeName: string) => {
  const r = await api.get<{ pokemon: { pokemon: { name: string; url: string } }[] }>(`/type/${typeName}`);
  return r.data.pokemon.map((p) => p.pokemon);
};
