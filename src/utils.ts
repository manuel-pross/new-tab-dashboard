import { Bookmark, BookmarkCategory, BookmarkFolder } from "./types";

export function getCollectedBookmarks(
  bookmarkCategories: BookmarkCategory[],
): Bookmark[] {
  if (!bookmarkCategories.length || !bookmarkCategories[0]?.children?.length)
    return [];

  const bookmarksBar = bookmarkCategories.find(
    (category) => category.title === "Bookmarks bar",
  );

  if (!bookmarksBar?.children?.length) return [];

  const allBookmarks = findBookmarksWithoutChildren(bookmarksBar.children);

  return allBookmarks;
}

export function findBookmarksWithoutChildren(
  BookmarkBarEntries: Array<Bookmark | BookmarkFolder>,
): Bookmark[] {
  const bookmarks: Bookmark[] = [];

  for (const entry of BookmarkBarEntries) {
    if (!("children" in entry)) {
      bookmarks.push(entry);
    } else if (entry.children.length > 0) {
      bookmarks.push(...findBookmarksWithoutChildren(entry.children));
    }
  }

  return bookmarks;
}

export function getIsInputFieldFocused() {
  const activeElement = document.activeElement;

  if (!activeElement) return false;

  return ["INPUT"].includes(activeElement?.tagName);
}

export function focusFirstSearchResult() {
  console.log("focus first result");
  const firstResult: HTMLAnchorElement | null =
    document.querySelector(".search-result");

  console.log("first search result", firstResult);

  firstResult?.focus();
}
