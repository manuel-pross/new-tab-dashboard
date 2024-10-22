import { useEffect, useRef, useState } from 'react';
import { Bookmark } from '../../types';

export type BookmarkListProps = {
  bookmarks: Bookmark[];
  searchTerm: string;
  onFirstSearchResult: (firstSearchResult: Bookmark | null) => void;
};

export default function BookmarkList({
  bookmarks,
  searchTerm,
  onFirstSearchResult,
}: BookmarkListProps) {
  const [searchedBookmarks, setSearchedBookmarks] = useState<Bookmark[]>([]);
  const [listIndex, setListIndex] = useState(0);

  const skipFocusRef = useRef(false);

  useEffect(() => {
    if (searchTerm === '') {
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
      `a[data-listindex="${listIndex}"]`
    );

    bookmarkAnchor?.focus();
  }, [listIndex]);

  const filterBookmarks = (bookmarks: Bookmark[], searchTerm: string) => {
    const results = bookmarks.filter((bookmark) => {
      const prefixedTitle =
        (bookmark?.parentPrefix || '').toLowerCase() +
        bookmark.title.toLowerCase();
      return prefixedTitle.includes(searchTerm.toLowerCase());
    });

    const firstSearchResult = results[0];
    onFirstSearchResult(firstSearchResult);
    setSearchedBookmarks(results);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    const { key } = event;

    if (key === 'Escape') {
      event.preventDefault();
      const searchBar: HTMLInputElement | null =
        document.querySelector('#searchBar');
      searchBar?.focus();

      setListIndex(0);
      skipFocusRef.current = true;

      return;
    }

    const isDownKey = key === 'j' || key === 'ArrowDown';
    const isUpKey = key === 'k' || key === 'ArrowUp';

    if (isDownKey && listIndex < searchedBookmarks.length - 1) {
      event.preventDefault();
      skipFocusRef.current = false;
      setListIndex(listIndex + 1);
      return;
    }

    if (isUpKey && listIndex > 0) {
      event.preventDefault();
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
              className={`block border-b-2 last:border-b-0 text-tokyo-white border-b-tokyo-black search-result focus:text-tokyo-black focus:bg-tokyo-white focus-visible:text-tokyo-black focus-visible:bg-tokyo-white focus-visible:outline-none hover:bg-tokyo-white hover:text-tokyo-black ${i === 0 && listIndex === 0 ? 'first-search-result' : ''}`}
              href={bookmark.url}
              data-listindex={i}
              target="_self"
            >
              <span className="block py-1 px-2">{`${bookmark?.parentPrefix}${bookmark.title}`}</span>
            </a>
          </li>
        );
      })}
    </ul>
  ) : null;
}
