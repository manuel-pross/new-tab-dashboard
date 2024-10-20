import { useQuery } from 'react-query';
import { Pokemon } from '../types';

export const usePokemon = (dexNumber: number) => ({
  //const { data: pokemon } = useQuery({
  //  queryKey: ['pokemon'],
  //  queryFn: async () => {
  //    const res = await fetch('https://pokeapi.co/api/v2/pokemon/1');
  //    const pokemon = await res.json();
  //    return pokemon as Pokemon | undefined;
  //  },
  //})
});
