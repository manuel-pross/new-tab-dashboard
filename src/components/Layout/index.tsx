import BookmarksSearch from "../BookmarksSearch";
import Clock from "../Clock";
import CustomDate from "../CustomDate";

export default function Layout() {
  return (
    <div className="w-screen h-screen bg-tokyo-storm">
      <div className="flex justify-between px-8">
        <Clock />
        <CustomDate />
      </div>
      <BookmarksSearch />
    </div>
  );
}
