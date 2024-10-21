import BookmarksSearch from '../BookmarksSearch';
import Clock from '../Clock';
import CustomDate from '../CustomDate';
import RandomPokemon from '../RandomPokemon';

export default function Layout() {
  return (
    <div className="grid grid-cols-2 grid-rows-[auto_1fr] w-screen h-screen bg-tokyo-storm font-fira">
      <Clock />
      <CustomDate />
      <RandomPokemon />
      <BookmarksSearch />
    </div>
  );
}
