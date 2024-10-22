import { useQuery } from 'react-query';
import { Pokemon } from '../../types';
import {
  getFirstCharUpperCase,
  getRandomNumber,
  typeColorMap,
} from '../../utils';
import LoadingSpinner from '../LoadingSpinner';

export default function RandomPokemon() {
  const {
    data: pokemon,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['pokemon'],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const randomNumber = getRandomNumber(1, 1000);
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${randomNumber}`
      );
      const pokemon = (await res.json()) as Pokemon;
      return pokemon;
    },
  });

  const getFrontCard = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    } else if (!pokemon) {
      return <p>No pokemon </p>;
    } else if (error) {
      return <p>error</p>;
    } else {
      return (
        <img
          width="140px"
          src={pokemon.sprites.front_default}
          alt={`the sprite of ${pokemon.name}`}
        ></img>
      );
    }
  };

  const getBackCard = () => {
    if (!pokemon) return <p>No pokemon </p>;

    return (
      <>
        <h2 className="mb-16 text-2xl text-tokyo-night text-center font-bold">
          {getFirstCharUpperCase(pokemon?.name)}
        </h2>
        <div className="flex justify-center gap-2">
          {pokemon?.types.map((type) => {
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
      </>
    );
  };

  return (
    <div className="col-start-2 row-start-2 justify-self-center card">
      <div className="card-content">
        <div className="card-front">{getFrontCard()}</div>
        <div className="card-back">{getBackCard()}</div>
      </div>
    </div>
  );
}
