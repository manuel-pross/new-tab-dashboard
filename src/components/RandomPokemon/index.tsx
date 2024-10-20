import { useQuery } from 'react-query';
import { Pokemon } from '../../types';
import { getRandomNumber } from '../../utils';

export default function RandomPokemon() {
  const {
    data: pokemon,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['pokemon'],
    queryFn: async () => {
      const randomNumber = getRandomNumber(1, 1000);
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${randomNumber}`
      );
      const pokemon = (await res.json()) as Pokemon;
      return pokemon;
    },
  });

  if (isLoading) {
    return <p>is loading</p>;
  }

  if (error) {
    return <p>error while fetching</p>;
  }

  if (!pokemon) {
    return <p>no pokemon</p>;
  }

  return (
    <div className="card">
      <div className="card-content">
        <div className="card-front">
          <img
            width="120px"
            src={pokemon.sprites.front_default}
            alt={`the sprite of ${pokemon.name}`}
          ></img>
        </div>
        <div className="card-back">
          <p>{pokemon.name}</p>
          {pokemon.types.map((type) => {
            return <p>{type.type.name}</p>;
          })}
        </div>
      </div>
    </div>
  );
}
