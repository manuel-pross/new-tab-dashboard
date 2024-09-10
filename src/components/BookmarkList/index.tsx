import { useEffect, useState } from "react";
import { Bookmark } from "../../types";

type BookmarkListProps = {
  bookmarks: Bookmark[];
  searchTerm: string;
  focusIndex: number;
};

export default function BookmarkList({
  bookmarks,
  searchTerm,
  focusIndex,
}: BookmarkListProps) {
  const [searchedBookmarks, setSearchedBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    if (searchTerm === "") {
      setSearchedBookmarks([]);
      return;
    }

    filterBookmarks(bookmarks, searchTerm);
  }, [searchTerm]);

  const filterBookmarks = (
    bookmarks: Bookmark[],
    searchTerm: string,
  ): Bookmark[] => {
    const results = bookmarks.filter((bookmark) => {
      return bookmark.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setSearchedBookmarks(results);
    return [];
  };

  const handleKeyDown = () => {
    console.log("keypressed");
  };

  return searchedBookmarks.length > 0 ? (
    <ul
      className="absolute flex flex-col max-h-[400px] overflow-y-auto gap-1 w-full bg-tokyo-night text-lg rounded-md"
      onKeyDown={handleKeyDown}
    >
      {searchedBookmarks.map((bookmark) => {
        return (
          <a
            className="block border-b-2 last:border-b-0 text-tokyo-white border-b-tokyo-black search-result focus:text-tokyo-black focus:bg-tokyo-white"
            key={bookmark.id}
            href={bookmark.url}
          >
            <span className="block py-1 pl-2">{bookmark.title}</span>
          </a>
        );
      })}
    </ul>
  ) : null;
}
