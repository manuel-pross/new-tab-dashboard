import { useEffect, useRef, useState } from "react";
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
  const [listIndex, setListIndex] = useState(0);

  const skipFocusRef = useRef(false);

  useEffect(() => {
    if (searchTerm === "") {
      setSearchedBookmarks([]);
      return;
    }

    filterBookmarks(bookmarks, searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (listIndex === 0 && skipFocusRef.current) {
      skipFocusRef.current = false;
      return;
    }

    const bookmarkAnchor: HTMLAnchorElement | null = document.querySelector(
      `a[data-listindex="${listIndex}"]`,
    );

    bookmarkAnchor?.focus();
  }, [listIndex]);

  const filterBookmarks = (bookmarks: Bookmark[], searchTerm: string) => {
    const results = bookmarks.filter((bookmark) => {
      return bookmark.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setSearchedBookmarks(results);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    event.preventDefault();

    const { key } = event;

    if (key === "Escape") {
      const searchBar: HTMLInputElement | null =
        document.querySelector("#searchBar");
      searchBar?.focus();

      setListIndex(0);
      skipFocusRef.current = true;

      return;
    }

    const isDownKey = key === "j" || key === "ArrowDown";
    const isUpKey = key === "k" || key === "ArrowUp";

    if (isDownKey && listIndex < searchedBookmarks.length - 1) {
      skipFocusRef.current = false;
      setListIndex(listIndex + 1);
      return;
    }

    if (isUpKey && listIndex > 0) {
      skipFocusRef.current = false;
      setListIndex(listIndex - 1);
      return;
    }
  };

  return searchedBookmarks.length > 0 ? (
    <ul
      className="absolute flex flex-col max-h-[400px] overflow-y-auto gap-1 w-full bg-tokyo-night text-lg rounded-md"
      onKeyDown={handleKeyDown}
    >
      {searchedBookmarks.map((bookmark, i) => {
        return (
          <li className="list-none" key={bookmark.id}>
            <a
              className="block border-b-2 last:border-b-0 text-tokyo-white border-b-tokyo-black search-result focus:text-tokyo-black focus:bg-tokyo-white"
              href={bookmark.url}
              data-listindex={i}
            >
              <span className="block py-1 px-2">{bookmark.title}</span>
            </a>
          </li>
        );
      })}
    </ul>
  ) : null;
}
