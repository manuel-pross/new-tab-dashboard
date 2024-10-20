import { useQuery } from 'react-query';
import { Pokemon } from '../../types';
import {
  getFirstCharUpperCase,
  getRandomNumber,
  typeColorMap,
} from '../../utils';

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
    <div className="col-start-2 row-start-2 justify-self-center card">
      <div className="card-content">
        <div className="card-front">
          <img
            width="140px"
            src={pokemon.sprites.front_default}
            alt={`the sprite of ${pokemon.name}`}
          ></img>
        </div>
        <div className="card-back">
          <h2 className="mb-16 text-2xl text-tokyo-night text-center font-bold">
            {getFirstCharUpperCase(pokemon.name)}
          </h2>
          <div className="flex justify-center gap-2">
            {pokemon.types.map((type) => {
              return (
                <span
                  key={type.type.name}
                  className="block rounded-lg px-2 text-lg font-bold"
                  style={{ backgroundColor: typeColorMap.get(type.type.name) }}
                >
                  {getFirstCharUpperCase(type.type.name)}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
