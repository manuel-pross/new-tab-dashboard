export { };

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed.");

  // Fetch all bookmarks
  chrome.bookmarks.getTree((bookmarkTreeNodes) => {
    console.log("Bookmarks:", bookmarkTreeNodes);
  });
});
