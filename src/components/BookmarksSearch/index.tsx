import React from "react";
import { useEffect, useState } from "react";
import { Bookmark, ChromeBookmarkResponse } from "../../types";
import { getCollectedBookmarks } from "../../utils";

export default function BookmarksSearch() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    chrome.bookmarks.getTree((bookmarkTreeNodes) => {
      const chromeBookmarkResponse =
        bookmarkTreeNodes as unknown as ChromeBookmarkResponse[];

      if (!chromeBookmarkResponse[0].children) return;

      const allBookmarks = getCollectedBookmarks(
        chromeBookmarkResponse[0].children,
      );

      console.log(allBookmarks);

      setBookmarks(allBookmarks);
    });
  }, []);

  return (
    <div>
      hello from bookmarks <pre>{JSON.stringify(bookmarks)}</pre>
    </div>
  );
}
