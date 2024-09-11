import React, { useEffect, useRef, useState } from 'react';
import { Bookmark, ChromeBookmarkResponse } from '../../types';
import {
  getIsInputFieldFocused,
  getCollectedBookmarks,
  focusFirstSearchResult,
} from '../../utils';
import BookmarkList from '../BookmarkList';

export default function BookmarksSearch() {
  const searchRef = useRef<HTMLInputElement>(null);

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isSearchOpened, setIsSearchOpened] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    chrome.bookmarks.getTree((bookmarkTreeNodes) => {
      const chromeBookmarkResponse =
        bookmarkTreeNodes as unknown as ChromeBookmarkResponse[];

      if (!chromeBookmarkResponse[0].children) return;

      const allBookmarks = getCollectedBookmarks(
        chromeBookmarkResponse[0].children
      );

      setBookmarks(allBookmarks);

      document.addEventListener('keydown', handleGlobalKeyDown);

      return () => {
        document.removeEventListener('keydown', handleGlobalKeyDown);
      };
    });
  }, []);

  useEffect(() => {
    searchRef?.current?.focus();
  }, [isSearchOpened]);

  const handleGlobalKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'b' && !getIsInputFieldFocused()) {
      event.preventDefault();
      handleB();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') setIsSearchOpened(false);
    if (event.key === 'j' && event.altKey && getIsInputFieldFocused())
      focusFirstSearchResult();
    else if (event.key === 'ArrowDown' && getIsInputFieldFocused()) {
      event.preventDefault();
      focusFirstSearchResult();
    }
  };

  const handleB = () => {
    if (isSearchOpened) {
      searchRef?.current?.focus();
    }

    setIsSearchOpened(true);
    setSearchTerm('');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return isSearchOpened ? (
    <div className="fixed top-[40%] right-[50%] translate-x-[50%] w-[75vw] max-w-[700px]">
      <input
        id="searchBar"
        className="block w-full text-lg p-3 mb-2 text-tokyo-white bg-tokyo-night border border-tokyo-cyan rounded-lg"
        ref={searchRef}
        value={searchTerm}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        type="text"
      ></input>
      <BookmarkList bookmarks={bookmarks} searchTerm={searchTerm} />
    </div>
  ) : (
    <></>
  );
}
