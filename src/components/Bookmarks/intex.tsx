import React, { useEffect } from "react";

export default function Bookmarks() {
  //const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    // Fetch all bookmarks
    chrome.bookmarks.getTree((bookmarkTreeNodes) => {
      console.log("Bookmarks:", bookmarkTreeNodes);
      //setBookmarks(bookmarkTreeNodes);
    });
  });
  return <p>hello from bookmarks</p>;
}
