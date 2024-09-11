import BookmarksSearch from '../BookmarksSearch';
import Clock from '../Clock';
import CustomDate from '../CustomDate';

export default function Layout() {
  return (
    <div className="flex justify-center w-screen h-screen bg-tokyo-storm font-fira">
      <div className="flex justify-between pt-6 px-8 w-full max-w-[1400px]">
        <Clock />
        <CustomDate />
      </div>
      <BookmarksSearch />
    </div>
  );
}
