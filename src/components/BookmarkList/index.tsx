import { useEffect, useState } from "react";
import { Bookmark } from "../../types";

type BookmarkListProps = {
  bookmarks: Bookmark[];
  searchTerm: string;
};

export default function BookmarkList({
  bookmarks,
  searchTerm,
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

    console.log(results);

    return [];
  };

  return searchedBookmarks.length > 0 ? (
    <ul className="absolute flex flex-col max-h-[400px] overflow-y-auto gap-1 w-full py-1 bg-tokyo-white text-lg rounded-md">
      {searchedBookmarks.map((bookmark) => {
        return (
          <a
            className="block border-b-2 last:border-b-0 border-b-tokyo-black"
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
