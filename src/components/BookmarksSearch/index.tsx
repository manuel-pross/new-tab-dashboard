import React, { useEffect, useRef, useState } from "react";
import { Bookmark, ChromeBookmarkResponse } from "../../types";
import {
  checkForActiveSelectionField,
  getCollectedBookmarks,
} from "../../utils";
import BookmarkList from "../BookmarkList";

export default function BookmarksSearch() {
  const searchRef = useRef<HTMLInputElement>(null);

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isSearchOpened, setIsSearchOpened] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    chrome.bookmarks.getTree((bookmarkTreeNodes) => {
      const chromeBookmarkResponse =
        bookmarkTreeNodes as unknown as ChromeBookmarkResponse[];

      if (!chromeBookmarkResponse[0].children) return;

      const allBookmarks = getCollectedBookmarks(
        chromeBookmarkResponse[0].children,
      );

      setBookmarks(allBookmarks);

      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleMouseDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("mousedown", handleMouseDown);
      };
    });
  }, []);

  useEffect(() => {
    searchRef?.current?.focus();
  }, [isSearchOpened]);

  const handleKeyDown = (event: KeyboardEvent) => {
    const isBKey = event.key === "b";

    if (!isBKey || isSearchOpened || checkForActiveSelectionField()) return;

    event.preventDefault();
    setIsSearchOpened(true);
    setSearchTerm("");
  };

  const handleMouseDown = (event: MouseEvent) => {
    if (!searchRef.current || searchRef.current.contains(event.target as Node))
      return;

    setIsSearchOpened(false);
  };

  const handleEscape = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Escape") return;

    setIsSearchOpened(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    isSearchOpened && (
      <div className="fixed top-[40%] right-[50%] translate-x-[50%] w-[75vw] max-w-[700px]">
        <input
          className="block w-full text-lg p-3 mb-2 text-tokyo-white bg-tokyo-night border border-tokyo-cyan rounded-lg"
          ref={searchRef}
          value={searchTerm}
          onKeyDown={handleEscape}
          onChange={handleChange}
          type="text"
        ></input>
        <BookmarkList bookmarks={bookmarks} searchTerm={searchTerm} />
      </div>
    )
  );
}
