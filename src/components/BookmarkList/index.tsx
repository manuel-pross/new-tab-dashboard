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
    //console.log("filter");
    const results = bookmarks.filter((bookmark) => {
      return bookmark.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setSearchedBookmarks(results);

    //console.log(results);

    return [];
  };

  return (
    <ul className="flex flex-col gap-1 w-full">
      {searchedBookmarks.map((bookmark) => {
        return <p>{bookmark.title}</p>;
      })}
    </ul>
  );
}
