import BookmarksSearch from "../BookmarksSearch";
import Clock from "../Clock";

export default function Layout() {
  return (
    <div className="w-screen h-screen bg-tokyo-storm">
      <div className="flex justify-start px-8">
        <Clock />
      </div>
      <BookmarksSearch />
    </div>
  );
}
